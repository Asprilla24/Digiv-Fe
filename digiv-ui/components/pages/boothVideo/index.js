import React, { useState, useEffect } from "react";
import DefaultLayout from "@components/layout/defaultLayout";
import "@styles/pages/boothVideo.scss";
import imageBooth from "@assets/images/background/bg-booth-toyota.png";
import carAvanxa from "@assets/images/car/car-avanza.png";
import {ModalDetailCar} from "@components/element/modal";
import { useRouter } from "next/router";

export default function MainHall() {
	const router = useRouter();
	const [shoModalCar, setShowModalCar] = useState(false);
	const [styleVideo, setStyleVideo] = useState({
		display: "block",
	});

	const onClickBoot = (value) => {
		setShowModalCar(true);
	};
	const resizeVideo = () => {
		if (window.innerHeight > window.innerWidth) {
			const wh = window.innerHeight;
			const ew = wh * 1.78;
			setStyleVideo({ ...styleVideo, width: `${ew}px`, height: `100%` });
		} else {
			const ww = window.innerWidth;
			const eh = ww / 1.78;
			setStyleVideo({ ...styleVideo, width: `100%`, height: `${eh}"px"` });
		}
	};

	useEffect(() => {
		window.addEventListener("resize", resizeVideo);
		resizeVideo();

		return () => {
			window.removeEventListener("resize", resizeVideo);
		};
	}, []);
	return (
		<DefaultLayout>
			<>
				<main id='virutal-main' className='booth-video-main'>
					<div id='video-booth' className='' style={styleVideo}>
						<video
							playsInline='playsInline'
							autoPlay='autoplay'
							muted='muted'
							loop='loop'>
							<source
								src={`${ENV.ASSETS_URL}booth/video/MAZDA_booth.mp4`}
								type='video/mp4'
							/>
						</video>
						<div
							className='car-link mazda2-link'
							onClick={onClickBoot}
							data-target='#mazdaCarModel'></div>
					</div>
					<ModalDetailCar
						isShow={shoModalCar}
						onClose={() => setShowModalCar(false)}
					/>
				</main>
			</>
		</DefaultLayout>
	);
}
