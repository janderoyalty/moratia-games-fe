import React from "react";
import "./App.css";
import NaviBar from "./components/NaviBar";
import LogoPage from "./components/LogoPage";
import Updates from "./components/Updates";

import EmbeddedVideo from "./components/EmbeddedVideo";
import Gallery from "./components/Gallery";
import World from "./components/World";
import Races from "./components/Races";
import Classes from "./components/Classes";
import Kickstarter from "./components/Kickstarter";
import PreOrder from "./components/PreOrder";
import Products from "./components/Products";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import AboutUs from "./components/AboutUs";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	return (
		<div className="App">
			<NaviBar></NaviBar>
			<LogoPage></LogoPage>
			<PreOrder></PreOrder>
			<Updates></Updates>
			<Kickstarter></Kickstarter>
			<Gallery></Gallery>
			<World></World>
			<Races></Races>
			<Classes></Classes>
			<Products></Products>
			<EmbeddedVideo></EmbeddedVideo>
			<AboutUs></AboutUs>
			<Testimonials></Testimonials>
			<Footer
			// showModal={showModal}
			// handleCloseModal={handleCloseModal}
			// handleShowModal={handleShowModal}
			></Footer>
		</div>
	);
}

export default App;
