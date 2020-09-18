import React, { useState, useEffect, useContext } from "react";
import { FormField, Select } from "@components/element/form";
import digivApiServices from "@utils/httpRequest";
import { Formik } from "formik";
import { validationBookingandTDSchema } from "./schema/validation";
import debounce from "@utils/debounce";
import ModalLoading from "@components/element/modalLoading";
import { ModalAlert, ModalContext } from "@components/element/modal";

export default function modalBookingForm(props) {
    const { userInfo, isShow, onClose, errorTestDrive } = props;
    const models = [
		{ value: "pilihmodel", label: "--Pilih Model--" }
	  ];
	const types = [
		{ value: "pilihtipe", label: "--Pilih Tipe--" }
	  ];
    const [userDataTestDrive, setUserDataTestDrive] = useState({
		email: "",
		phone: "",
        fullname: "",
        booth:"", 
        domainId:""
    });
    const [showModalLoading, setShowModalLoading] = useState(false);
    const openModalContext = useContext(ModalContext);
    
	const { digivApi } = digivApiServices();
    const [modelList, setModelList] = useState([]);
    const [typeList, setTypeList] = useState([]);

    useEffect(() => {
        console.log(userInfo);
		if (userInfo) {
			setUserDataTestDrive({
				...userDataTestDrive,
				...userInfo,
			});
		}
	}, [userInfo]);

	const handleChangeCarModel = debounce(async (keyword) => {
		const searchKeyword = keyword;
		try {
			const getCarModelData = await digivApi.get(
				`api/province?keyword=${searchKeyword}`,
			);
			const carModelData = getCarModelData.data.data;
			if (carModelData) {
				setModelList(carModelData);
			}
		} catch (err) {
			throw err;
		}
    }, 1500);
    
    const onSubmitBooking = async (values) => {
        console.log("kepanggil");
		setShowModalLoading(true);
		try {
			const insertBooking = await digivApi.post(`api/form/booking`, {
				email: values.email,
				full_name: values.fullname,
                phone_no: values.phone,
                brand: userDataTestDrive.booth,
                model: values.model,
                type: values.type
			});
			const {
				data: { data, status_code },
			} = insertBooking;
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
			// setErrorReservation({
			// 	status: true,
			// 	message,
			// });
		} finally {
			// setErrorRegistration({
			// 	status: true,
			// 	message: "Error Occured please try again later",
			// });
			setShowModalLoading(false);
		}
	};

    
	return (
		<>
			{isShow ? (
				<>
					<div
                        id="outer-div"
						className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'
						onClick={e => onClose(e)}>
						<div className='  relative max-h-screen w-auto my-6 max-w-sm md:mx-auto lg:max-w-3xl xl:max-w-3xl'>
							{/*content*/}
							<div className='modal-car-container border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
								{/*header*/}
								<div className='modal-car-header flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t'>
									<h3 className='text-3xl font-semibold'>Booking Form</h3>
									<button
										className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
										>
										<span id="btn-close" onClick={e => onClose(e)} className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'>
											×
										</span>
									</button>
								</div>
								{/*body*/}
								<div className='  modal-car-content overflow-x-hidden overflow-y-auto p-6 flex-auto grid gap-4 grid-cols-1'>
                                <Formik
                                    initialValues={userDataTestDrive}
                                    validationSchema={validationBookingandTDSchema}
                                    onSubmit={onSubmitBooking}
								>
								{({ values, resetForm, handleSubmit }) => (
                                <form onSubmit={handleSubmit}>
										<div class="flex flex-wrap -mx-3 mb-6">
											<div class="w-full md:w-2/2 px-3 mb-6 md:mb-0">
											<FormField
												name='fullname'
												label='Fullname'
                                                placeholder='Fullname'
												class="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
												withLabel={false}
											/> 
											</div>
										</div>
										<div class="flex flex-wrap -mx-3 mb-6">
											<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
											<FormField
												name='email'
												label='Email Address'
                                                placeholder='your@email.com'
												class="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
												withLabel={false}
											/>
											</div>
											<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
											<FormField
												name='phone'
												label='Phone'
                                                placeholder='08123456789'
												class="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
												withLabel={false}
											/> 
											</div>
										</div>

										<div class="flex flex-wrap -mx-3 mb-6">
											<div class="w-full md:w-2/2 px-3 mb-6 md:mb-0">
											<Select
												name="model"
												label="Model"
												placeholder="Pilih Model"
												options={models}
												withLabel={false}
											/>
											</div>
										</div>

										<div class="flex flex-wrap -mx-3 mb-6">
											<div class="w-full md:w-2/2 px-3 mb-6 md:mb-0">
											<Select
												name="type"
												label="Tipe"
												placeholder="Pilih Tipe"
												options={types}
												withLabel={false}
											/>
											</div>
										</div>
										

										<div className='grid grid-flow-col grid-cols-1 grid-rows-1 gap-1 modal-car-footer p-6 border-t border-solid border-gray-300 rounded-b'>
                                            <button
										        className='bg-green-500 text-white active:bg-green-600 uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
												type='submit'>
												Submit Booking
											</button>
										</div>
									</form>
                                    )}
                                    </Formik>
                                    <ModalLoading isShowLoading={showModalLoading} />
                                </div>
							</div>
						</div>
					</div>
					<div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
				</>
			) : null}
		</>
	);
}
