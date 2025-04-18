import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../firebase-config";

export const useUpdates = () => {
	const [updates, setUpdates] = useState([]);
	const [urls, setUrls] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Fetch updates
				const updatesSnapshot = await getDocs(collection(db, "updates"));
				const updatesData = updatesSnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
					body: doc.data().body.replace(/\\n/g, "\n").replace(/\\"/g, '"'),
				}));

				// Sort updates by time
				const sortedUpdates = updatesData.sort((a, b) => b.time - a.time);
				setUpdates(sortedUpdates);

				// Fetch URLs
				const urlsSnapshot = await getDocs(collection(db, "urls"));
				const urlsData = urlsSnapshot.docs.map((doc) => ({ ...doc.data() }));
				setUrls(urlsData);
			} catch (err) {
				setError(err.message);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	return { updates, urls, isLoading, error };
};
