import React, { useState } from "react";
import { auth } from "../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
const SignIn = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/update";

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			console.log("Attempting to sign in with:", email);
			await signInWithEmailAndPassword(auth, email, password);
			navigate(from, { replace: true });
		} catch (err) {
			console.error("Sign in error:", err);
			setError("Invalid email or password");
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="email"
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
			/>
			<Button type="submit">Sign In</Button>
			{error && <p>{error}</p>}
		</form>
	);
};

export default SignIn;
