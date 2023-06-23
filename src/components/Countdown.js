import React, { useState, useEffect } from "react";
import "./Countdown.css";

import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase-config";



const Countdown = () => {
//     const [moratiaCountdownDate, setMoratiaCountdownDate] = useState([]);
// const countdownDateCollectionRef = collection(db, "countdown-date");

// const fetchCountdownDate = async () => {
//     const countdownDate = await getDocs(countdownDateCollectionRef);
//     const countdownDateData = countdownDate.docs.map((doc) => ({ ...doc.data() }));
//     setMoratiaCountdownDate(countdownDateData);
// };

// fetchCountdownDate();
// console.log(moratiaCountdownDate[0].date)

const COUNTDOWN_TARGET = new Date("2023-08-03T00:00:01");

const getTimeLeft = () => {
	const totalTimeLeft = COUNTDOWN_TARGET - new Date();
	const days = Math.floor(totalTimeLeft / (1000 * 60 * 60 * 24));
	const hours = Math.floor((totalTimeLeft / (1000 * 60 * 60)) % 24);
	const minutes = Math.floor((totalTimeLeft / (1000 * 60)) % 60);
	const seconds = Math.floor((totalTimeLeft / 1000) % 60);
	return { days, hours, minutes, seconds };
};


	const [timeLeft, setTimeLeft] = useState(() => getTimeLeft());

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft(getTimeLeft());
		}, 1000);

		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<div className='countdown'>
			{/* <h2>Countdown</h2> */}
			<div className='content'>
				{Object.entries(timeLeft).map((el) => {
					const label = el[0];
					const value = el[1];
					return (
						<div className='box' key={label}>
							<div className='value'>
								<span>{value}</span>
							</div>
							<span className='label'> {label} </span>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Countdown;