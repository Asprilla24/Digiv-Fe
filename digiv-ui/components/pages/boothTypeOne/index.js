import React, { useState, useEffect } from "react";
import DefaultLayout from "@components/layout/defaultLayout";
import "@styles/pages/boothTypeOne.scss";
import { ModalDetailCar, ModalDetailProgram } from "@components/element/modal";
import { useVideoStyle } from "@helper/hooks";
import { useRouter } from "next/router";
import  CarView from './view/carView'
import  TvcView from './view/tvcView'
import {ModalLiveChat} from "@components/element/modal";

export default function MainHall() {
	const router = useRouter();
	const styleVideo = useVideoStyle();
	const [shoModalCar, setShowModalCar] = useState(false);
	const [showModalProgram, setShowModalProgram] = useState(false);
	const [shoModalLiveChat,setShowModalChat] = useState(false)
	const userInfo = { fullname:"Doni Wijaya", phone:"0822121112", email:"doni.wijaya@gmail.com", booth:"Honda", domainId:"1" }

	const onClickBoot = (value) => {
		setShowModalCar(true);
	};

	const onClickProgram = (value) => {
		setShowModalProgram(true);
	};

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
								src={`${ENV.ASSETS_URL}booth/video/booth-toyota.mp4`}
								type='video/mp4'
							/>
						</video>
                        <CarView onClickBoot={onClickBoot}/>
                        <TvcView onClickProgram={onClickProgram}/>
					</div>
					<ModalDetailCar
						isShow={shoModalCar}
						onClose={() => setShowModalCar(false)}
					/>
					<ModalDetailProgram isShow={showModalProgram} onClose={() => setShowModalProgram(false)} />
					<ModalLiveChat userInfo={userInfo} isShow={shoModalLiveChat} />
				</main>
			</>
		</DefaultLayout>
	);
}
