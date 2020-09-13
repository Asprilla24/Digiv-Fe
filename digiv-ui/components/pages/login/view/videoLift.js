import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function formReservation(props) {
	const { onEndedVideo, showVideo } = props;

	const variants = {
		visible: {
			display: "block",

			opacity: 1,
			transition: { duration: 1 },
		},
		hidden: {
			opacity: 0,
			transitionEnd: {
				display: "none",
			},
			transition: { duration: 1 },
		},
	};
	return (
		<>
			{showVideo && (
				<motion.div
					initial='hidden'
					animate={showVideo ? "visible" : "hidden"}
					variants={variants}>
					<div className='fullscreen-bg-information'>
						<video
							muted
							autoPlay
							className='fullscreen-bg-information__video'
							onEnded={onEndedVideo}>
							<source src={`${ENV.ASSETS_URL}video/animation-lift-login.mp4`} type='video/mp4' />
						</video>
					</div>
				</motion.div>
			)}
		</>
	);
}
