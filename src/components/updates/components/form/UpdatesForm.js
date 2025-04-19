import React from "react";
import PropTypes from "prop-types";
import "./UpdatesForm.css";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

import { useUpdates } from "../../hooks/useUpdates";
import { FormValuesType, FormErrorsType } from "../../types/updatesTypes";

function UpdatesForm() {
	const {
		formValues,
		formErrors,
		thankYouMessage,
		isSubmitting,
		submitError,
		errorType,
		handleInputChange,
		handleSubmit,
		retrySubmission,
		setSubmitError,
		setErrorType,
	} = useUpdates();

	return (
		<Form
			onSubmit={handleSubmit}
			role="form"
			className="updates-forms"
			noValidate
		>
			<Form.Group>
				<Row>
					<Col lg={6} md={6} sm={12} xs={12} className="mb-3 mb-lg-0">
						<Form.Label>First</Form.Label>
						<Form.Control
							placeholder="John"
							autoComplete="given-name"
							name="first"
							value={formValues.first}
							type="text"
							onChange={handleInputChange}
							disabled={isSubmitting}
							isInvalid={!!formErrors.first}
							className={formErrors.first ? "error-input" : ""}
						/>
						<Form.Control.Feedback type="invalid">
							{formErrors.first}
						</Form.Control.Feedback>
					</Col>
					<Col lg={6} md={6} sm={12} xs={12}>
						<Form.Label>Last</Form.Label>
						<Form.Control
							placeholder="Doe"
							autoComplete="family-name"
							name="last"
							value={formValues.last}
							type="text"
							onChange={handleInputChange}
							disabled={isSubmitting}
							isInvalid={!!formErrors.last}
							className={formErrors.last ? "error-input" : ""}
						/>
						<Form.Control.Feedback type="invalid">
							{formErrors.last}
						</Form.Control.Feedback>
					</Col>
				</Row>
			</Form.Group>
			<Form.Group className="mb-3" controlId="formBasicEmail">
				<Form.Label>Email address</Form.Label>
				<Form.Control
					placeholder="john.doe@email.com"
					autoComplete="email"
					name="email"
					value={formValues.email}
					type="email"
					onChange={handleInputChange}
					disabled={isSubmitting}
					isInvalid={!!formErrors.email}
					className={formErrors.email ? "error-input" : ""}
				/>
				<Form.Control.Feedback type="invalid">
					{formErrors.email}
				</Form.Control.Feedback>
			</Form.Group>
			<Row className="mb-2">
				{thankYouMessage && !submitError && (
					<Alert variant="success" className="py-2 px-3 mt-1 mb-0">
						{thankYouMessage}
					</Alert>
				)}
				{submitError && (
					<Alert
						variant="danger"
						className="py-2 px-3 mt-1 mb-0"
						onClose={() => {
							setSubmitError(null);
							setErrorType(null);
						}}
						dismissible
					>
						<div className="d-flex align-items-center">
							<div className="flex-grow-1">{submitError}</div>
							{errorType !== "unknown" && (
								<Button
									variant="outline-light"
									size="sm"
									className="ms-2"
									onClick={retrySubmission}
									disabled={isSubmitting}
								>
									Retry
								</Button>
							)}
						</div>
					</Alert>
				)}
			</Row>
			<Button
				variant="light"
				type="submit"
				disabled={isSubmitting}
				className="submit-button"
			>
				{isSubmitting ? (
					<Spinner
						as="span"
						animation="border"
						size="sm"
						role="status"
						aria-hidden="true"
					/>
				) : (
					"Submit"
				)}
			</Button>
		</Form>
	);
}

// Add PropTypes for development
if (process.env.NODE_ENV === "development") {
	UpdatesForm.propTypes = {
		formValues: FormValuesType,
		formErrors: FormErrorsType,
		thankYouMessage: PropTypes.string,
		isSubmitting: PropTypes.bool,
		submitError: PropTypes.string,
		errorType: PropTypes.string,
		handleInputChange: PropTypes.func.isRequired,
		handleSubmit: PropTypes.func.isRequired,
		retrySubmission: PropTypes.func.isRequired,
		setSubmitError: PropTypes.func.isRequired,
		setErrorType: PropTypes.func.isRequired,
	};
}

export default UpdatesForm;
