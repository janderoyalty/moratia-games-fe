import React from "react";
import "./World.css";
import WorldText from "../game-info/WorldText";

const World = () => {
  return (
    <div className="content" id="world">
      <div id="world--map">
        <img
          id="world--map-image"
          src="https://firebasestorage.googleapis.com/v0/b/moratia-games.appspot.com/o/moratia_world_map.png?alt=media&token=c15e87bc-b13b-464b-b350-33673b21fd69"
          alt="map of the world of Moratia"
        ></img>
        <div id="world--map--text">
          <WorldText></WorldText>
        </div>
      </div>
    </div>
  );
};

export default World;
