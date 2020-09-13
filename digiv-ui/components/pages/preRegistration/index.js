import React, { useState, useContext, useEffect } from "react";
import "@styles/pages/preRegistration.scss";
import loadFirebase from "@utils/firebase";
import { useRouter } from "next/router";
import FormRegister from "./view/formRegister";
import FormReservation from "./view/formReservation";
import digivApiServices from "@utils/httpRequest";
import ModalLoading from "@components/element/modalLoading";
import { ModalAlert, ModalContext } from "@components/element/modal";
import logoDanamon from "@assets/images/logo/logo-danamon.png";
import logoAdira from "@assets/images/logo/logo-adira.png";
import logoAdiraAnniv from "@assets/images/logo/logo-adira-anniv.png";
// import  ChatBox  from "@components/element/chatBox";

export default function PreRegistration() {
	const { digivApi } = digivApiServices();
	const router = useRouter();
	const [showModalLoading, setShowModalLoading] = useState(false);
	const [dataUser, setDataUser] = useState(null);
	const [errorRegistration, setErrorRegistration] = useState({});
	const [errorReservation, setErrorReservation] = useState({});
	const openModalContext = useContext(ModalContext);
	const [firebaseApp, setFirebaseApp] = useState(null);

	const onClickSignInGoogle = async () => {
		// const firebaseInstance = await loadFireBase ()

		setShowModalLoading(true);

		const provider = new fire.auth.GoogleAuthProvider();
		auth
			.signInWithPopup(provider)
			.then((result) => {
				const { user } = result;
				fetchCheckUser({
					name: user.displayName,
					email: user.email,
					nomer_telp: user.phoneNumber,
				});
				setShowModalLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setShowModalLoading(false);
				openModal("error", "Gagal Mendapatkan Data Dari Google");
			});
	};

	const openModal = async (type, message) => {
		try {
			await openModalContext({
				type: type,
				message: message,
			});
		} catch (error) {}
	};

	const onClickFacebook = () => {
		const auth = fire.auth();
		const provider = new fire.auth.FacebookAuthProvider();
		auth
			.signInWithPopup(provider)
			.then(function (result) {
				const user = result.user;
				fetchCheckUser({
					name: user.displayName,
					email: user.email,
					nomer_telp: user.phoneNumber,
				});
			})
			.catch(function (error) {
				console.log(error);
				openModal("error", "Gagal Mendapatkan Data Dari Facebook");
			});
	};

	const fetchCheckUser = async (values) => {
		setShowModalLoading(true);
		try {
			const checkUser = await digivApi.get(`api/user/check/${values.email}`);
			const {
				data: { data, status_code },
			} = checkUser;
			if (!data.is_exist) {
				setDataUser({
					name: values.name,
					email: values.email,
					password: values.password,
				});
			} else {
				setErrorRegistration({
					status: true,
					message: "Username atau email sudah pernah digunakan ",
				});
			}
		} catch (error) {
			setErrorRegistration({
				status: true,
				message: "Error Occured please try again later",
			});
		} finally {
			setShowModalLoading(false);
		}
	};

	const onSubmitRegistration = async (values) => {
		fetchCheckUser(values);
	};

	const onSubmitReservation = async (values) => {
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
				router.push("/");
			}
		} catch (error) {
			const data = error.response?.data;
			let message = "error occured,please try again later";

			if (data) {
				const { status_code } = data;
				switch (status_code) {
					case 400:
						message = "Data Tidak Valid,check data anda";
						break;
					case 500:
						message = "Email anda sudah pernah terdaftar";
						break;
				}
			}
			setErrorReservation({
				status: true,
				message,
			});
		} finally {
			setErrorRegistration({
				status: true,
				message: "Error Occured please try again later",
			});
			setShowModalLoading(false);
		}
	};

	// useEffect(() => {
	// 	if (window !== undefined) {
	// 		setFirebaseApp(loadFirebase())
	// 	}
	// }, []);

	// useEffect(() => {
	// 	if(firebaseApp){
	// 		const  db = firebaseApp.firestore
	// 		db.collection("user").add({
	// 			first: "Ada",
	// 			last: "Lovelace",
	// 			born: 1815
	// 		})
	// 		.then(function(docRef) {
	// 			console.log("Document written with ID: ", docRef.id);
	// 		})
	// 		.catch(function(error) {
	// 			console.error("Error adding document: ", error);
	// 		});
	// 	}
	// }, [firebaseApp]);

	return (
		<>
			<div className='font-sans antialiased bg-grey-lightest w-full h-full'>
				<ModalAlert
					type='error'
					message='wah anda sukses'
					onClickAlert={() => {
						console.log("dfsdfsfs");
					}}
				/>
				<div>
					<img
						className='logo-30 hidden xl:block lg:block absolute '
						src={logoAdiraAnniv}></img>
				</div>
				<div>
					<img
						className='absolute top-0 right-0 w-6/12 xl:w-2/12 lg:w-2/12 md:w-2/12 sm:w-4/12'
						src={logoAdira}></img>
				</div>
				<div className='w-full  grid grid-cols-1  sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2'>
					<div className='w-12/12 p-16 xl:w-4/12 flex justify-center  lg:justify-start xl:justify-start'>
						{/* <div>
						<img className='w-32 sm:w-32 md:w-48 lg:w-64 ' src={logoEve}></img>
					</div> */}
					</div>
					<div className='h-full lg:min-h-screen xl:min-h-screen w-12/12 flex justify-center pre-registration__container-form lg:items-end lg:align-end  xl:items-end xl:align-end'>
						{/* {dataUser ? ( */}
						<FormReservation
							errorReservation={errorReservation}
							onSubmitReservation={onSubmitReservation}
							dataUser={dataUser}
						/>
						{/* ) : (
							<FormRegister
								onClickSignInGoogle={onClickSignInGoogle}
								onClickFacebook={onClickFacebook}
								onSubmitRegistration={onSubmitRegistration}
								errorRegistration={errorRegistration}
							/>
						)} */}
					</div>
				</div>
				{/* <ChatBox messages={messages} /> */}
				<ModalLoading isShowLoading={showModalLoading} />
			</div>
			<div className='logo-sponsor hidden lg:block xl:block md:hidden sm:hidden absolute bottom-0 left-0'>
				<p className='text-xl text-white my-2'> disponsori oleh : </p>
				<img className='w-6/12' src={logoDanamon}></img>
			</div>
		</>
	);
}
