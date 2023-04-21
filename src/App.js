import React from "react";
import "./App.css";
import NaviBar from "./components/NaviBar";
import LogoPage from "./components/LogoPage";
import Updates from "./components/Updates";
// import Events from "./components/Events";
import Gallery from "./components/Gallery";
import World from "./components/World";
import Races from "./components/Races";
import Classes from "./components/Classes";
import Products from "./components/Products";
import Reviews from "./components/Testimonials"
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <NaviBar></NaviBar>
      <LogoPage></LogoPage>
      <Updates></Updates>
      {/* <Events></Events> */} 
      <Gallery></Gallery>
      <World></World>
      <Races></Races>
      <Classes></Classes>
      <Products></Products>
      
      <Footer></Footer>
    </div>
  );
}

export default App;
