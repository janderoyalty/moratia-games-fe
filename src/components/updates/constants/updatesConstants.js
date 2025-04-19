// Error Messages
export const ERROR_MESSAGES = {
	REQUIRED_FIELD: "This field is required.",
	INVALID_EMAIL: "Please enter a valid email address.",
	FIREBASE_ERROR: "Failed to save your information. Please try again.",
	MAILCHIMP_ERROR: "Failed to subscribe to our mailing list. Please try again.",
	NETWORK_ERROR: "Network error. Please check your connection and try again.",
	UNKNOWN_ERROR: "An unexpected error occurred. Please try again later.",
};

// Form Constants
export const FORM_FIELDS = {
	FIRST_NAME: "first",
	LAST_NAME: "last",
	EMAIL: "email",
};

// API Constants
export const API = {
	MAX_RETRIES: 3,
	RETRY_DELAY: 1000, // milliseconds
};

// Validation Constants
export const VALIDATION = {
	EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};
