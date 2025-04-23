import React, { useEffect, useState } from "react";
import { db } from "../../firebase-config"; // Adjust path if needed
import { collection, getDocs } from "firebase/firestore";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "./RacesSlider.css";

import { EffectCoverflow, Pagination } from "swiper/modules";

const RacesSlider = () => {
	const [races, setRaces] = useState([]);

	useEffect(() => {
		const fetchRaces = async () => {
			const racesRef = collection(db, "races_images");
			const snapshot = await getDocs(racesRef);
			const sorted = snapshot.docs
				.map((doc) => doc.data())
				.sort((a, b) => a.order - b.order);
			setRaces(sorted);
		};

		fetchRaces();
	}, []);

	return (
		<Swiper
			effect={"coverflow"}
			grabCursor={true}
			centeredSlides={true}
			slidesPerView={"auto"}
			autoplay={true}
			coverflowEffect={{
				rotate: 50,
				stretch: 0,
				depth: 100,
				modifier: 1,
				slideShadows: true,
			}}
			pagination={true}
			modules={[EffectCoverflow, Pagination]}
			className="mySwiper"
		>
			{races.map((race, index) => (
				<SwiperSlide key={index}>
					<img src={race.url} alt={race.name || `Race ${index + 1}`} />
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default RacesSlider;
