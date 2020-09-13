import React, { useState, useEffect } from "react";
import DefaultLayout from "@components/layout/defaultLayout";
import "@styles/pages/countdown.scss";
import { useRouter } from "next/router";
import logoEve from "@assets/images/logo/logo-ave.png";
import logoAdira from "@assets/images/logo/logo-adira.png";
import logoAdirathreety from "@assets/images/logo/logo-adira-anniv.png";

export default function countDown() {
	const [date, setDate] = useState("2020/09/25 06:00:00");
	const [timeLeft, setTimeLeft] = useState([]);
	const [interval, setStateInterval] = useState();
	const router = useRouter();

	const timeCounter = () => {
		const currentDate = new Date(),
			time = new Date(date),
			diff = Math.round((time - currentDate) / 1000),
			days = Math.floor(diff / (24 * 60 * 60)),
			surplus = diff - days * (24 * 60 * 60),
			hrs = Math.floor(surplus / (60 * 60)),
			surplushrs = surplus - hrs * (60 * 60),
			min = Math.floor(surplushrs / 60),
			sec = surplushrs - min * 60;

		setTimeLeft([days, hrs, min, sec]);
	};

	const TimeCountdown = ({ time }) => {
		return time.map((val, index) => (
			<div key={index} className='countdown__item countdown__item_time'>
				{val < 1 ? "00" : val < 10 ? "0" + val : val}
			</div>
		));
	};

	const goToReservation = (e) => {
		router.push("/pre-registration");
	};
	useEffect(() => {
		setStateInterval(setInterval(timeCounter, 1000));
		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<main className='countdown-content min-w-full min-h-full '>
			<div className='min-h-screen flex  flex-col justify-center items-center'>
				<div className='flex justify-center flex-col items-center'>
					<div>
						<img
							className='absolute hidden xl:block lg:block md:block sm:block adira-30 w-1/12'
							src={logoAdirathreety}></img>
					</div>
					<div>
						<img
							className='absolute top-0 right-0 w-4/12'
							src={logoAdira}></img>
					</div>
					<img
						className='countdonw-logo w-24 sm:w-20 md:w-42 lg:w-48'
						src={logoEve}></img>
					<h1 className='contdown-title color-blue-digiv '>COUNTDOWN</h1>
				</div>

				<div className='countdown-holder mb-16'>
					<div className='countdown-row text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl'>
						<TimeCountdown time={timeLeft} />
					</div>
					<div className='countdown-row text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl'>
						<div className='countdown__item countdown__item_title'>Hari</div>
						<div className='countdown__item countdown__item_title'>Jam</div>
						<div className='countdown__item countdown__item_title'>Menit</div>
						<div className='countdown__item countdown__item_title'>Detik</div>
					</div>
				</div>
				<button
					onClick={goToReservation}
					className='bg-yellow-500 text-black  font-semibold py-2 px-4 border border-bg-white  rounded text-xl'>
					Pre Registration
				</button>
			</div>
		</main>
	);
}
