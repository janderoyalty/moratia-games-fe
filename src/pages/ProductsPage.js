import React, { useState } from "react";
import Products from "../components/features/Products";
import VideoModal from "../components/common/VideoModal";

const ProductsPage = () => {
	const [showVideo, setShowVideo] = useState(false);
	const handleCloseVideo = () => setShowVideo(false);
	const handleShowVideo = () => setShowVideo(true);
	return (
		<>
			<Products />
			<button onClick={handleShowVideo} style={{ margin: "1rem" }}>
				Watch Product Video
			</button>
			<VideoModal showVideo={showVideo} handleCloseVideo={handleCloseVideo} />
		</>
	);
};

export default ProductsPage;
