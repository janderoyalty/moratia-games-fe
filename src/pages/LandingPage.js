import React from "react";
import LogoPage from "../components/layout/LogoPage";
import Updates from "../components/updates/Updates";
import FeaturedProduct from "../components/featured-product/FeaturedProduct";
import Testimonials from "../components/marketing/Testimonials";
import Footer from "../components/layout/Footer";

const LandingPage = () => {
	return (
		<>
			<LogoPage />
			<Updates />
			<FeaturedProduct />
			<Testimonials />
			<Footer />
		</>
	);
};

export default LandingPage;
