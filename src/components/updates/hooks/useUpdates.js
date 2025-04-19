import { useEffect, useState } from "react";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase-config";
import { ERROR_MESSAGES, VALIDATION, API } from "../constants/updatesConstants";

// Basic email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const useUpdates = () => {
	// State for fetching updates list
	const [updates, setUpdates] = useState([]);
	const [urls, setUrls] = useState([]);
	const [isLoadingUpdates, setIsLoadingUpdates] = useState(true);
	const [fetchError, setFetchError] = useState(null);
	const [retryCount, setRetryCount] = useState(0);

	// State for the subscription form
	const [formValues, setFormValues] = useState({
		first: "",
		last: "",
		email: "",
	});
	const [formErrors, setFormErrors] = useState({});
	const [thankYouMessage, setThankYouMessage] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState(null);
	const [errorType, setErrorType] = useState(null);

	const mailingListCollectionRef = collection(db, "mailing-list");

	// Fetch updates data with retry logic
	useEffect(() => {
		const fetchData = async () => {
			setIsLoadingUpdates(true);
			setFetchError(null);
			try {
				// Fetch updates
				const updatesSnapshot = await getDocs(collection(db, "updates"));
				const updatesData = updatesSnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
					body: doc.data().body.replace(/\\n/g, "\n").replace(/\\"/g, '"'),
				}));
				const sortedUpdates = updatesData.sort((a, b) => b.time - a.time);
				setUpdates(sortedUpdates);

				// Fetch URLs
				const urlsSnapshot = await getDocs(collection(db, "urls"));
				const urlsData = urlsSnapshot.docs.map((doc) => ({ ...doc.data() }));
				setUrls(urlsData);
				setRetryCount(0); // Reset retry count on success
			} catch (err) {
				console.error("Error fetching updates:", err);
				setFetchError(err.message);
				if (retryCount < 3) {
					setRetryCount((prev) => prev + 1);
				}
			} finally {
				setIsLoadingUpdates(false);
			}
		};
		fetchData();
	}, [retryCount]);

	// Validation function
	const validateForm = () => {
		const errors = {};
		if (!formValues.first.trim()) errors.first = ERROR_MESSAGES.REQUIRED_FIELD;
		if (!formValues.last.trim()) errors.last = ERROR_MESSAGES.REQUIRED_FIELD;
		if (!formValues.email.trim()) {
			errors.email = ERROR_MESSAGES.REQUIRED_FIELD;
		} else if (!VALIDATION.EMAIL_REGEX.test(formValues.email)) {
			errors.email = ERROR_MESSAGES.INVALID_EMAIL;
		}
		setFormErrors(errors);
		return Object.keys(errors).length === 0;
	};

	// Handle form input changes
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormValues((prevValues) => ({
			...prevValues,
			[name]: value,
		}));
		// Clear validation error for the field being changed
		if (formErrors[name]) {
			setFormErrors((prevErrors) => ({
				...prevErrors,
				[name]: null,
			}));
		}
		// Clear any submit errors when user starts typing
		if (submitError) {
			setSubmitError(null);
			setErrorType(null);
		}
	};

	// Handle form submission
	const handleSubmit = async (event) => {
		event.preventDefault();
		setSubmitError(null);
		setErrorType(null);
		setThankYouMessage("");

		// Validate before submitting
		if (!validateForm()) {
			return;
		}

		setIsSubmitting(true);

		try {
			// 1. Add to Firebase
			await addDoc(mailingListCollectionRef, {
				...formValues,
				timestamp: new Date().toISOString(),
			});

			// 2. Submit to Mailchimp
			const mailchimpUrl = process.env.REACT_APP_MAILCHIMP_URL;
			const mailchimpData = new URLSearchParams();
			mailchimpData.append("EMAIL", formValues.email);
			mailchimpData.append("FNAME", formValues.first);
			mailchimpData.append("LNAME", formValues.last);
			mailchimpData.append("tags", process.env.REACT_APP_MAILCHIMP_TAG);

			const mailchimpResponse = await fetch(mailchimpUrl, {
				method: "POST",
				body: mailchimpData,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				mode: "no-cors",
			});

			if (!mailchimpResponse.ok) {
				throw new Error(ERROR_MESSAGES.MAILCHIMP_ERROR);
			}

			// 3. Reset form and show success message
			setFormValues({
				first: "",
				last: "",
				email: "",
			});
			setFormErrors({});
			setThankYouMessage(
				"You have been added to our email list. Thank you for your support."
			);
		} catch (error) {
			console.error("Form submission error:", error);
			let errorMessage = ERROR_MESSAGES.UNKNOWN_ERROR;
			let errorType = "unknown";

			if (error.message.includes("Firebase")) {
				errorMessage = ERROR_MESSAGES.FIREBASE_ERROR;
				errorType = "firebase";
			} else if (error.message.includes("Mailchimp")) {
				errorMessage = ERROR_MESSAGES.MAILCHIMP_ERROR;
				errorType = "mailchimp";
			} else if (error.message.includes("Network")) {
				errorMessage = ERROR_MESSAGES.NETWORK_ERROR;
				errorType = "network";
			}

			setSubmitError(errorMessage);
			setErrorType(errorType);
		} finally {
			setIsSubmitting(false);
		}
	};

	// Retry submission function
	const retrySubmission = () => {
		setSubmitError(null);
		setErrorType(null);
		handleSubmit(new Event("submit"));
	};

	return {
		// Updates data
		updates,
		urls,
		isLoadingUpdates,
		fetchError,
		retryCount,
		// Form state and handlers
		formValues,
		formErrors,
		thankYouMessage,
		isSubmitting,
		submitError,
		errorType,
		handleInputChange,
		handleSubmit,
		retrySubmission,
		// Error handling setters
		setSubmitError,
		setErrorType,
	};
};
