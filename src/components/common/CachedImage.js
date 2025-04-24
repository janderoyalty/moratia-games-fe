// src/components/common/CachedImage.js
import React, { useEffect, useState } from "react";

const CachedImage = ({ src, alt, ...props }) => {
	const [imageSrc, setImageSrc] = useState(null);

	useEffect(() => {
		const cachedImage = localStorage.getItem(src);

		if (cachedImage) {
			setImageSrc(cachedImage);
		} else {
			fetch(src)
				.then((response) => response.blob())
				.then((blob) => {
					const url = URL.createObjectURL(blob);
					localStorage.setItem(src, url);
					setImageSrc(url);
				})
				.catch((error) => console.error("Error fetching image:", error));
		}
	}, [src]);

	return <img src={imageSrc || src} alt={alt} {...props} />;
};

export default CachedImage;
