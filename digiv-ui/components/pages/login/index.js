import React, { useState, useEffect, useContext } from "react";
import "@styles/pages/login.scss";
import Tabs from "./view/tabs";
import ModalLoading from "@components/element/modalLoading";
import logoAve from "@assets/images/logo/logo-ave.png";
import { useRouter } from "next/router";
import digivApiServices from "@utils/httpRequest";
import VideoLift from "./view/videoLift";
import { ModalAlert, ModalContext } from "@components/element/modal";
import Cookies from "js-cookie";

export default function login() {
	const [showModalLoading, setShowModalLoading] = useState(true);
	const [errorRegistration, setErrorRegistration] = useState({});
	const [videoAnimation, setVideoAnimation] = useState(false);

	const [errorLogin, setErrorLogin] = useState({});
	const router = useRouter();
	const openModalContext = useContext(ModalContext);
	const { digivApi } = digivApiServices();

	const onLoginSubmit = async (values) => {
		setShowModalLoading(true);
		try {
			const checkUser = await digivApi.post(`api/auth/login`, {
				password: values.password,
				email: values.email,
			});
			const {
				data: { data, status_code },
			} = checkUser;
			setShowModalLoading(false);

			if (status_code == 200) {
				// await openModalContext({
				// 	type: "success",
				// 	message: "Sukses login",
				// });
				setVideoAnimation(true)
				Cookies.set("ATT", data.access_token);
				Cookies.set("ART", data.refresh_token);
				Cookies.set("AEU", data.email);
				Cookies.set("AID", data.user_id);
			}
		} catch (error) {
			const { data } = error.response;
			let message = "error occured,pliss try again later";
			setShowModalLoading(false);
			if (data) {
				const { status_code } = data;
				switch (status_code) {
					case 401:
						message = "Password atau email anda salah";
						break;
					case 400:
						message = "Data Tidak Valid,check data anda";
						break;
					case 500:
						message = "Error Ocured ,please try again";
						break;
				}
			}

			setErrorLogin({
				status: true,
				message,
			});
		} finally {
			setShowModalLoading(false);
		}
	};
	const onSubmitRegistration = async (values) => {
		setShowModalLoading(true);
		try {
			const checkUser = await digivApi.post(`api/auth/register`, {
				city_id: values.city,
				full_name: values.name,
				password: values.password,
				phone_no: "+62" + values.nomer_telp,
				email: values.email,
			});
			const {
				data: { data, status_code },
			} = checkUser;
			setShowModalLoading(false);

			if (status_code == 201) {
				await openModalContext({
					type: "success",
					message:
						"Sukses untuk reservarsi,silahkan chek email anda untuk konfirmasi",
				});
			}
		} catch (error) {
			const data = error.response?.data;
			let message = "error occured,pliss try again later";
			setShowModalLoading(false);
			if (data) {
				const { status_code } = data;
				switch (status_code) {
					case 409:
						message = "Email Anda Sudah Pernah Terdaftar";
						break;
					case 400:
						message = "Data Tidak Valid,check data anda";
						break;
					case 500:
						message = "Error Ocured ,please try again";
						break;
				}
			}

			setErrorRegistration({
				status: true,
				message,
			});
		} finally {
			setShowModalLoading(false);
		}
	};

	useEffect(() => {
		setTimeout(function () {
			setShowModalLoading(false);
		}, 1500);
	}, []);

	const onEndedVideo = () => {
		setShowModalLoading(true)
		router.push("/main-hall");
	}

	return (
		<>
			<div className='fullscreen-bg'>
				<video loop muted autoPlay className='fullscreen-bg__video'>
					<source
						src={`${ENV.ASSETS_URL}video/bg-registration.mp4`}
						type='video/mp4'
					/>
				</video>
			</div>
			<div className='relative font-sans antialiased bg-grey-lightest w-full h-full'>
				<div className='w-full  grid grid-cols-1  sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2'>
					<div className='w-12/12 p-16 xl:w-4/12 flex justify-center  lg:justify-start xl:justify-start'>
						<div>
							<img
								className='w-32 xl:hidden lg:hidden sm:w-32 md:w-48 lg:w-64 '
								src={logoAve}></img>
						</div>
					</div>
					<div className='h-full  xl:min-h-screen lg:min-h-screen  w-12/12 flex justify-center login__container-form lg:items-end lg:align-end  xl:items-end xl:align-end'>
						<Tabs
							onSubmitRegistration={onSubmitRegistration}
							errorRegistration={errorRegistration}
							onLoginSubmit={onLoginSubmit}
							errorLogin={errorLogin}
						/>
					</div>
				</div>
				<VideoLift onEndedVideo={onEndedVideo} showVideo={videoAnimation} />
				<ModalLoading isShowLoading={showModalLoading} />
			</div>
		</>
	);
}
