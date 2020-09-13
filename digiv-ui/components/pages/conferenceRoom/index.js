import React, { useState, useEffect } from "react";
import DefaultLayout from "@components/layout/defaultLayout";
import "@styles/pages/conference.scss";
import "@styles/pages/boothVideo.scss";
import imageBooth from "@assets/images/background/bg-conf-room.jpeg";
import {ModalDetailCar} from "@components/element/modal";
import {ModalTestDrive} from "@components/element/modal";
import {ModalBooking} from "@components/element/modal";
import { useRouter } from "next/router";
import ReactPlayer from "react-player";
import  ScreenView from './view/screenView'
//import { firebase } from "@utils/firebase";

export default function ConferenceRoom() {
    const router = useRouter();
	const [shoModalCar,setShowModalCar] = useState(false);
	const [showModalBooking,setShowModalBooking] = useState(false);
	const [showModalTestDrive,setShowModalTestDrive] = useState(false);
    const [styleVideo, setStyleVideo] = useState({
		display: "block",
	});

	const onClickBoot = (value) => {
		if(value == "zoom"){
			setShowModalBooking(true);
		}else{
			setShowModalTestDrive(true);
		}
        //setShowModalCar(true)
		//router.push("/conference");
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

	const prosesModal = (e, from) => {
		console.log(e.target.id);
		if(e.target.id == "outer-div" || e.target.id == "btn-close"){
			if(from == "test-drive"){
				setShowModalTestDrive(false);
			}else if(from == "booking"){
				setShowModalBooking(false);
			}
			// else(from == "live-chat"){
			// }
		}
	}
    
    useEffect(() => {
		window.addEventListener("resize", resizeVideo);
		resizeVideo();

		return () => {
			window.removeEventListener("resize", resizeVideo);
		};
	}, []);

	return (
		<DefaultLayout>
			{/* <main>
                <div className='main-booth' style={{flex: 1,
                    width: '100%',
                    height: '100vh',
                    resizeMode: 'contain'
                    }}>
					<img class="bg-image" src={imageBooth} />
					<div onClick={()=>onClickBoot('zoom')} class="click-zoom" />
					<div onClick={()=>onClickBoot('rundown')} class="click-rundown" />
                    <div id='video-booth' className='' style={styleVideo}> */}
                    {/* <div class="videoplayer">
                        <ReactPlayer
                            playing={true}
                            width="100%"
                            height="100%"
                            url="https://youtu.be/F3fkV8o6mjw"
                        />
                    </div> */}
					{/* width={'41.5vw'} {'56vh'}
					<video
							playsInline='playsInline'
							autoPlay='autoplay'
							muted='muted'
							loop='loop'>
							<source
								src='https://www.youtube.com/watch?v=CmS5rlX9cDA'
								type='video/mp4'
							/>
					</video> */}
                    {/* </div>
				</div> */}
				{/* <ModalDetailCar isShow={shoModalCar} onClose={()=>setShowModalCar(false)} />
				<ModalBooking isShow={showModalBooking} onClose={(e)=>prosesModal(e, "booking")} />
				<ModalTestDrive isShow={showModalTestDrive} onClose={(e)=>prosesModal(e, "test-drive")} /> */}
			{/* </main> */}

			<main id='virutal-main' className='booth-video-main'>
					<div id='video-booth' className='' style={styleVideo}>
					<img src={imageBooth} />
					<ScreenView />
					<div className='zoom-link zoom-link__1' onClick={()=>onClickBoot('zoom')} class="click-zoom" />
					<div className='rundown-link rundown-link__1' onClick={()=>onClickBoot('rundown')} class="click-rundown" />

						{/* <video
							playsInline='playsInline'
							autoPlay='autoplay'
							muted='muted'
							loop='loop'>
							<source
								src='http://34.107.209.44/booth/video/MAZDA_booth.mp4'
								type='video/mp4'
							/>
						</video>
						<div
							className='car-link mazda2-link'
							onClick={onClickBoot}
							data-target='#mazdaCarModel'></div> */}
					</div>
					<ModalDetailCar
						isShow={shoModalCar}
						onClose={() => setShowModalCar(false)}
					/>
					<ModalBooking isShow={showModalBooking} onClose={(e)=>prosesModal(e, "booking")} />
					<ModalTestDrive isShow={showModalTestDrive} onClose={(e)=>prosesModal(e, "test-drive")} />
			</main>
		</DefaultLayout>
	);
}
 