import React from "react";
import { auth } from "../firebase-config";

const SignOutButton = () => {
	return <button onClick={() => auth.signOut()}>Sign Out</button>;
};

export default SignOutButton;
