import React, { useState } from "react";
import "./App.css";
import NaviBar from "./components/NaviBar";
import LogoPage from "./components/LogoPage";
import Updates from "./components/Updates";

// import Events from "./components/Events";
import Gallery from "./components/Gallery";
import World from "./components/World";
import Races from "./components/Races";
import Classes from "./components/Classes";
import Kickstarter from "./components/Kickstarter";
import Products from "./components/Products";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import AboutUs from "./components/AboutUs";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  // const [showModal, setShowModal] = useState(false);

  // const handleCloseModal = () => setShowModal(false);
  // const handleShowModal = () => setShowModal(true);

  return (
    <div className="App">
      <NaviBar></NaviBar>
      <LogoPage></LogoPage>
      <Kickstarter></Kickstarter>
      <Updates></Updates>
      <Gallery></Gallery>
      <World></World>
      <Races></Races>
      <Classes></Classes>
      <Products></Products>
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
