import React, { useEffect, useState } from "react";
import DefaultLayout from "@components/layout/defaultLayout";
import "@styles/pages/mainHall.scss";
import imageHall from "@assets/images/background/hall.jpg";
import { useRouter } from "next/router";
import ModalLoading from "@components/element/modalLoading";
import digivApiServices from "@utils/httpRequest";
import { useVideoStyle } from "@helper/hooks";
import translaterVista from "@helper/translaterVista";
import { parseCookies, setCookie, destroyCookie } from "nookies";

export default function MainHall(props) {
	console.log(props);
	const router = useRouter();
	const [showModalLoading, setShowModalLoading] = useState(false);
	const { digivApi } = digivApiServices();

	const fetchGetDataUserAuth = async () => {
		const cookies = parseCookies();

		try {
			const getDataUser = await digivApi.get(`api/user/${cookies["AEU"]}`, {
				headers: {
					authorization: `Bearer ${cookies["ATT"]}`,
				},
			});
		} catch (e) {}
	};
	const onEventVista = (type, msg) => {
		console.log(type, msg)
		setShowModalLoading(true);
		const pathUrl = translaterVista(type, msg);
		console.log(pathUrl)
		if (pathUrl) {
			router.push(pathUrl)
		} else {
			setShowModalLoading(false);
		}
	};
	useEffect(() => {
		window.initialVideoFoyer();
		window.callReactApps = (type, msg) => {
			onEventVista(type, msg);
		};
		window.callAppsReact = (msg) => {
			console.log(msg);
		};
	}, []);
	const onClickBoot = (path) => {
		router.push(path);
	};
	return (
		<DefaultLayout breadcumb={[{ name: "Main Hall", url: "#" }]}>
			<main className='main'>
				<div id='preloadContainer' className='preloacContainer1'>
					<div className='preloacContainer1'></div>
					<div className='preloacContainer2'></div>
					<div className='preloacContainer3'></div>
				</div>
				<div id='foyer-viewer' className='view'></div>
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
