import React from "react";
import LogoPage from "../components/LogoPage";
import Updates from "../components/Updates";
import Release from "../components/Release";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

const LandingPage = () => {
	return (
		<>
			<LogoPage />
			<Updates />
			<Release />
			<Testimonials />
			<Footer />
		</>
	);
};

export default LandingPage;
