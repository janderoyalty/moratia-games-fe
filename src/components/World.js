import React from "react";
import "./World.css";
import WorldText from "./WorldText";

const World = () => {
  return (
    <div className="content" id="world">
      <div id="world--map">
        <img
          id="world--map-image"
          src="https://res.cloudinary.com/dvbdefnwx/image/upload/v1666678438/Moratia%20Images/IMG_4098_w65sgn.png"
          alt="map of the world of Moratia"
        ></img>
        <div id="world--map--text">
          <WorldText></WorldText>
        </div>
      </div>
    </div>
  );
};

// background-color: rgba(138, 218, 233,1);

// background-color: rgba(255, 255, 255, 0.3);

export default World;

// import React from "react";
// import "./World.css";
// import WorldText from "./WorldText";

// import OverlayTrigger from "react-bootstrap/OverlayTrigger";
// import Popover from "react-bootstrap/Popover";

// const popover = (
//   <Popover id="popover-basic">
//     <Popover.Header as="h3">Popover right</Popover.Header>
//     <Popover.Body>
//       <WorldText></WorldText>
//     </Popover.Body>
//   </Popover>
// );

// const World = () => {
//   return (
//     <div className="content" id="world">
//       <div id="map">
//         <OverlayTrigger trigger="click" placement="top-end" overlay={popover}>
//           <img
//             src="https://res.cloudinary.com/dvbdefnwx/image/upload/v1666678438/Moratia%20Images/IMG_4098_w65sgn.png"
//             alt="map of world"
//           ></img>
//         </OverlayTrigger>
//       </div>
//     </div>
//   );
// };

// export default World;
