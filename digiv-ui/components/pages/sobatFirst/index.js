import React, { useEffect, useState } from "react";
import DefaultLayout from "@components/layout/defaultLayout";
import "@styles/pages/sobatFirst.scss";
import { useRouter } from "next/router";
import ModalLoading from "@components/element/modalLoading";
import translaterVista from "@helper/translaterVista";

export default function MainHall() {
	const router = useRouter();
	const [showModalLoading, setShowModalLoading] = useState(true);

	const onEventVista = (type, msg) => {
		setShowModalLoading(true);
		const pathUrl = translaterVista(type, msg);
				if (pathUrl) {
			router.push(pathUrl)
		} else {
			setShowModalLoading(false);
		}
	};

	useEffect(() => {
		window.initialVideoSobatFirst();
		window.callReactApps = (type, msg) => {
			onEventVista(type, msg);
			//handle message;
		};
		window.callAppsReact = (msg) => {
			console.log(msg);
		};
		setShowModalLoading(false);
	}, []);
	const onClickBoot = (path) => {
		router.push(path);
	};
	return (
		<DefaultLayout  breadcumb={[{name: 'Main Hall',url:'/main-hall'},{name: 'Sobat 1',url:'#'}]}>
			<main className='main'>
				<div id='preloadContainer' className='preloacContainer1'>
					<div className='preloacContainer1'></div>
					<div className='preloacContainer2'></div>
					<div className='preloacContainer3'></div>
				</div>
				<div id='sobatFirst-viewer' className='view'></div>
			</main>
			{/* <main className='main-hall'>
				<div>
					<img src={imageHall} />
					<div className='main-hall__layer item-layer'>
						<div
							onClick={()=> onClickBoot('/booth')}
							className='item-layer item-layer__1'></div>
						<div
							onClick={()=> onClickBoot('/booth-video')}
							className='item-layer item-layer__2'></div>
					</div>
				</div>
			</main> */}
			<ModalLoading isShowLoading={showModalLoading} />
		</DefaultLayout>
	);
}
