import React from "react";
import World from "../components/features/World";
import Races from "../components/game-info/Races";
import Footer from "../components/layout/Footer";

const WorldPage = () => {
	return (
		<>
			<World />
			<Races />
			<Footer />
		</>
	);
};

export default WorldPage;
