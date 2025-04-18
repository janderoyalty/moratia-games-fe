import React from "react";
import LogoPage from "../components/layout/LogoPage";
import Updates from "../components/updates/Updates";
import Release from "../components/updates/Release";
import Testimonials from "../components/marketing/Testimonials";
import Footer from "../components/layout/Footer";

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
