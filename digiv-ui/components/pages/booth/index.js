import React, { useState } from "react";
import DefaultLayout from "@components/layout/defaultLayout";
import "@styles/pages/booth.scss";
import imageBooth from "@assets/images/background/bg-booth-toyota.png";
import carAvanxa from "@assets/images/car/car-avanza.png";
import {ModalDetailCar} from "@components/element/modal";
import {ModalLiveChat} from "@components/element/modal";
import {ModalTestDrive} from "@components/element/modal";
import {ModalBooking} from "@components/element/modal";
import { useRouter } from "next/router";

export default function MainHall() {
    const router = useRouter();
	const [shoModalCar,setShowModalCar] = useState(false)
	const [shoModalLiveChat,setShowModalChat] = useState(false)
	const [showModalBooking,setShowModalBooking] = useState(false);
	const [showModalTestDrive,setShowModalTestDrive] = useState(false);

	const onClickBoot = (value) => {
        setShowModalCar(true)
		router.push("/booth");
	};

	const onClickChat = (value) => {
		//setShowModalChat(true)
		setShowModalBooking(true);
		router.push("/booth");
	};

	const prosesModal = (e, from) => {
		console.log(e.target.id);
		if(e.target.id == "outer-div" || e.target.id == "btn-close"){
			if(from == "test-drive"){
				setShowModalTestDrive(false);
			}else if(from == "booking"){
				setShowModalBooking(false);
			}
			else if(from == "live-chat"){
				setShowModalChat(false)
			}
		}
	}

	const userInfo = { fullname:"Doni Wijaya", phone:"0822121112", email:"doni.wijaya@gmail.com", booth:"Honda", domainId:"1" }

	return (
		<DefaultLayout>
			<main>
				<div className='main-booth'>
					<img src={imageBooth} />
					{/* <div onClick={()=>onClickBoot('avanza')} className='item-layer item-layer__1'> */}
					<div onClick={()=>onClickChat()} className='item-layer item-layer__1'>
						<img src={carAvanxa}></img>
					</div>
				</div>
				<ModalDetailCar isShow={shoModalCar} onClose={()=>setShowModalCar(false)} />
				<ModalLiveChat userInfo={userInfo} isShow={shoModalLiveChat} /*onClose={(e)=>prosesModal(e, "live-chat")}*/ />
				<ModalBooking userInfo={userInfo} isShow={showModalBooking} onClose={(e)=>prosesModal(e, "booking")} />
				<ModalTestDrive userInfo={userInfo} isShow={showModalTestDrive} onClose={(e)=>prosesModal(e, "test-drive")} />
			</main>
		</DefaultLayout>
	);
}
 