import React, { useState, useEffect } from "react";
import { FormField, Select } from "@components/element/form";
import Alert from "@components/element/alert";
import SelectAutoComplete from "@components/element/selectAutoComplete";
import digivApiServices from "@utils/httpRequest";
import { Formik } from "formik";
//import { validationReservationSchema } from "../scheme/validation";
import debounce from "@utils/debounce";

export default function modalTestDrive(props) {
	const { dataUser, isShow, onClose, onSubmitTestDrive, errorTestDrive } = props;
	const models = [
		{ value: "pilihmodel", label: "--Pilih Model--" }
	  ];
	const types = [
		{ value: "pilihtipe", label: "--Pilih Tipe--" }
	  ];
    const [userDataTestDrive, setUserDataTestDrive] = useState({
		email: "",
		password: "",
		province: "",
		city: "",
		nomer_telp: "",
		name: "",
    });
    
	const { digivApi } = digivApiServices();
	const [provinceList, setProvinceList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [modelList, setModelList] = useState([]);
    const [typeList, setTypeList] = useState([]);

    useEffect(() => {
		if (dataUser) {
			setUserDataTestDrive({
				...userDataTestDrive,
				...dataUser,
			});
		}
	}, [dataUser]);

	const handleChangeProvince = debounce(async (keyword) => {
		const searchKeyword = keyword;
		try {
			const getProvinceData = await digivApi.get(
				`api/province?keyword=${searchKeyword}`,
			);
			const provinceData = getProvinceData.data.data;
			if (provinceData) {
				setProvinceList(provinceData);
			}
		} catch (err) {
			throw err;
		}
	}, 1500);

	const handelChangeCity = debounce(async (provinceId, keyword) => {
		const searchKeyword = keyword;
		try {
			const getCityByProvince = await digivApi.get(
				`api/city?province_id=${provinceId}&keyword=${searchKeyword}`,
			);
			const cityData = getCityByProvince.data.data;
			if (cityData) {
				setCityList(cityData);
			}
		} catch (err) {
			throw err;
		}
	}, 1500);

	return (
		<>
			{isShow ? (
				<>
					<div
                        id="outer-div"
						className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'
						onClick={e => onClose(e)}>
						<div className='  relative max-h-screen w-auto my-6 max-w-sm md:mx-auto lg:max-w-3xl xl:max-w-3xl' onClick="">
							{/*content*/}
							<div className='modal-car-container border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
								{/*header*/}
								<div className='modal-car-header flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t'>
									<h3 className='text-3xl font-semibold'>Test Drive</h3>
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
												Request Test Drive
											</button>
										</div>
									</form>
								)}
							</Formik>
                                </div>
								{/*footer*/}
							</div>
						</div>
					</div>
					<div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
				</>
			) : null}
		</>
	);
}
