import React, { useState } from "react";
import DefaultLayout from "@components/layout/defaultLayout";
import "@styles/pages/booth.scss";
import imageBooth from "@assets/images/background/bg-booth-toyota.png";
import carAvanxa from "@assets/images/car/car-avanza.png";
import {ModalDetailCar} from "@components/element/modal";
import {ModalLiveChat} from "@components/element/modal";
import { useRouter } from "next/router";

export default function MainHall() {
    const router = useRouter();
	const [shoModalCar,setShowModalCar] = useState(false)
	const [shoModalLiveChat,setShowModalChat] = useState(false)

	const onClickBoot = (value) => {
        setShowModalCar(true)
		router.push("/booth");
	};

	const onClickChat = (value) => {
        setShowModalChat(true)
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
				<ModalLiveChat isShow={shoModalLiveChat} onClose={(e)=>prosesModal(e, "live-chat")} />
			</main>
		</DefaultLayout>
	);
}
 