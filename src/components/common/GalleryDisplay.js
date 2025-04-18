import React, { useState, useCallback } from "react";
import Gallery from "react-photo-gallery";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "./GalleryDisplay.css";
import { photos } from "./Photos";

const GalleryDisplay = () => {
	const [currentImage, setCurrentImage] = useState(0);
	const [viewerIsOpen, setViewerIsOpen] = useState(false);

	const openLightbox = useCallback((event, { photo, index }) => {
		setCurrentImage(index);
		setViewerIsOpen(true);
	}, []);

	const closeLightbox = () => {
		setCurrentImage(0);
		setViewerIsOpen(false);
	};

	return (
		<div className="gallery-container">
			<Gallery photos={photos} onClick={openLightbox} direction="row" />
			<Lightbox
				open={viewerIsOpen}
				close={closeLightbox}
				index={currentImage}
				slides={photos.map((x) => ({
					...x,
					src: x.src,
					width: 3840,
					height: 2160,
					srcSet: [
						{ src: x.src, width: 3840, height: 2160 },
						{ src: x.src, width: 1920, height: 1080 },
						{ src: x.src, width: 1280, height: 720 },
					],
				}))}
				styles={{ container: { backgroundColor: "rgba(0, 0, 0, 0.9)" } }}
				animation={{ fade: 300 }}
				carousel={{ finite: false }}
			/>
		</div>
	);
};

export default GalleryDisplay;
