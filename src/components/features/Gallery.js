import React from "react";
import "./Gallery.css";
import GalleryDisplay from "../common/GalleryDisplay";

const Gallery = () => {
	return (
		<div className="content" id="gallery">
			<div id="gallery-container">
				<div className="headers-text" id="gallery--top">
					Events Gallery
				</div>
				<div className="headers-text" id="gallery--bottom">
					<GalleryDisplay></GalleryDisplay>
				</div>
			</div>
		</div>
	);
};

export default Gallery;
