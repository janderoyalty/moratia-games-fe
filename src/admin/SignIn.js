import React, { useState } from "react";
import { auth } from "../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import "./SignIn.css";

const SignIn = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/admin/updates";

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);
		try {
			await signInWithEmailAndPassword(auth, email, password);
			navigate(from, { replace: true });
		} catch (err) {
			setError("Invalid email or password. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Container className="signin-container">
			<Card className="signin-card">
				<Card.Body>
					<div className="signin-logo-wrapper">
						<img
							src="https://firebasestorage.googleapis.com/v0/b/moratia-games.appspot.com/o/logos%2FMoratia_Games_logo_black.png?alt=media&token=359efc0c-c776-4ae7-868a-fde70b4581d1"
							alt="Moratia Games"
							className="signin-logo"
						/>
					</div>

					<h5 className="signin-heading">Admin Login</h5>

					{error && <Alert variant="danger" className="signin-error">{error}</Alert>}

					<Form onSubmit={handleSubmit}>
						<Form.Group className="mb-3" controlId="signinEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type="email"
								placeholder="you@example.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								autoComplete="email"
							/>
						</Form.Group>

						<Form.Group className="mb-4" controlId="signinPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								autoComplete="current-password"
							/>
						</Form.Group>

						<Button
							type="submit"
							variant="dark"
							className="w-100 signin-button"
							disabled={loading}
						>
							{loading ? "Signing in…" : "Sign In"}
						</Button>
					</Form>
				</Card.Body>
			</Card>
		</Container>
	);
};

export default SignIn;
