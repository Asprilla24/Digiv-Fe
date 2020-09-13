import React, { useState, useEffect } from "react";
import { FormField } from "@components/element/form";
import Alert from "@components/element/alert";
import SelectAutoComplete from "@components/element/selectAutoComplete";
import digivApiServices from "@utils/httpRequest";
import { Formik } from "formik";
import { validationReservationSchema } from "../scheme/validation";
import debounce from "@utils/debounce";
import logoDanamon from "@assets/images/logo/logo-danamon.png";

export default function formReservation(props) {
	const { onSubmitReservation, errorReservation, dataUser } = props;
	const [userDataReservation, setUserDatareservation] = useState({
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

	useEffect(() => {
		if (dataUser) {
			setUserDatareservation({
				...userDataReservation,
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
	}, 500);

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
			<div className=' bg-grey-lightest w-10/12 md:w-8/12 lg:w-8/12 xl:w-6/12'>
				<div className='mx-auto w-full '>
					<div className=' mx-auto rounded shadow  w-full'>
						<div className='px-8 text-black'>
							{errorReservation?.status && (
								<Alert message={errorReservation?.message} />
							)}
						</div>
						<div className='py-4 px-8'>
							<Formik
								initialValues={userDataReservation}
								validationSchema={validationReservationSchema}
								enableReinitialize={true}
								onSubmit={onSubmitReservation}>
								{({ values, resetForm, handleSubmit }) => (
									<form onSubmit={handleSubmit}>
										<FormField
											name='name'
											label='Nama'
											placeholder='Nama'
											className='mb-4'
											withLabel={false}
										/>

										<FormField
											name='nomer_telp'
											label='Nomer Telepon'
											type='numberphone'
											placeholder='Nomer Telepon'
											className='mb-4'
											withLabel={false}
										/>
										<FormField
											name='province'
											label='Provinsi'
											placeholder='Provinsi'
											inputType='selectAutoComplete'
											className='mb-4'
											withLabel={false}
											objectValue={provinceList}
											onSelectedOption={(e) => {
												// console.log(e);
											}}
											onChange={(e) => {
												handleChangeProvince(e);
											}}
										/>

										<FormField
											name='city'
											label='Asal Kota'
											placeholder='Asal kota'
											inputType='selectAutoComplete'
											className='mb-4'
											withLabel={false}
											disabled={
												values.province === null || values.province === ""
											}
											objectValue={cityList}
											onSelectedOption={(e) => {}}
											onChange={(e) => {
												handelChangeCity(values.province, e);
											}}
										/>
										<FormField
											name='email'
											label='Email Address'
											placeholder='input Email'
											className='mb-4'
											withLabel={false}
										/>

										<FormField
											name='password'
											type='password'
											label='Password'
											placeholder='input Password'
											className='mb-4'
											withLabel={false}
										/>

										<div className='w-full mt-8'>
											<button
												className=' w-full bg-yellow-500 text-white font-bold py-2 px-4 rounded'
												type='submit'>
												Reservasi
											</button>
										</div>
									</form>
								)}
							</Formik>
						</div>
						<div className='block lg:hidden xl:hidden md:hidden sm:block logo-sponsor-bottom'>
							<p className='text-xl text-white my-2'> di sponsori oleh : </p>
							<img className='w-12/12' src={logoDanamon}></img>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
