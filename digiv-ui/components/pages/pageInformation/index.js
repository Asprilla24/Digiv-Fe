import React, { useState, useContext } from "react";
import "@styles/pages/pageInformation.scss";
import { auth, firebase } from "@utils/firebase";
import { useRouter } from "next/router";
import Information from "./view/information";
import VideoAnimation from "./view/videoAnimation";
import digivApiServices from "@utils/httpRequest";
import ModalLoading from "@components/element/modalLoading";
import { ModalAlert, ModalContext } from "@components/element/modal";
import logoDanamon from "@assets/images/logo/logo-danamon.png";
import logoAdira from "@assets/images/logo/logo-adira.png";
import logoAdiraAnniv from "@assets/images/logo/logo-adira-anniv.png";

export default function PreRegistration() {
	const { digivApi } = digivApiServices();
	const router = useRouter();
	const [showModalLoading, setShowModalLoading] = useState(false);
	const [showVideo, setShowVideo] = useState(false);


	const onClcikSubmitVideo = () => {
		setShowVideo(true)
	}

	const onEndedVideo = () => {
		setShowModalLoading(true)
		router.push('/login')
	}

	return (
		<>
			<div className='font-sans antialiased bg-grey-lightest w-full h-full'>
				<div>
					<img
						className='logo-30 hidden xl:block lg:block absolute '
						src={logoAdiraAnniv}></img>
				</div>
				<div>
					<img
						className='absolute top-0 right-0 w-6/12 xl:w-2/12 lg:w-2/12 md:w-2/12 sm:w-4/12 '
						src={logoAdira}></img>
				</div>
				<div className='w-full  grid grid-cols-1  sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2'>
					<div className='w-12/12 p-16 xl:w-4/12 flex justify-center  lg:justify-start xl:justify-start'>
						{/* <div>
						<img className='w-32 sm:w-32 md:w-48 lg:w-64 ' src={logoEve}></img>
					</div> */}
					</div>
					<div className='h-full lg:min-h-screen xl:min-h-screen w-12/12 flex justify-center pre-registration__container-form lg:items-end lg:align-end  xl:items-end xl:align-end'>
						<Information onClcikSubmitVideo={onClcikSubmitVideo} />
						<VideoAnimation showVideo={showVideo} onEndedVideo={onEndedVideo}/>
					</div>
				</div>

				<ModalLoading isShowLoading={showModalLoading}  />
			</div>
			{/* <div className='logo-sponsor hidden lg:block xl:block md:hidden sm:hidden absolute bottom-0 left-0'>
				<p className='text-xl text-white my-2'> di sponsori oleh : </p>
				<img className='w-6/12' src={logoDanamon}></img>
			</div> */}
		</>
	);
}
