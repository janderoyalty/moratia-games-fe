import PropTypes from "prop-types";

// Update Type
export const UpdateType = PropTypes.shape({
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
	body: PropTypes.string.isRequired,
});

// URL Type
export const UrlType = PropTypes.shape({
	id: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
});

// Form Values Type
export const FormValuesType = PropTypes.shape({
	first: PropTypes.string.isRequired,
	last: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired,
});

// Form Errors Type
export const FormErrorsType = PropTypes.shape({
	first: PropTypes.string,
	last: PropTypes.string,
	email: PropTypes.string,
});
