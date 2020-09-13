import React, { useState } from "react";
import { Formik } from "formik";
import { FormField } from "@components/element/form";
import { validationReservationSchema } from "../scheme/validation";
import digivApiServices from "@utils/httpRequest";
import debounce from "@utils/debounce";
import Alert from "@components/element/alert";

export default function formRegisration(props) {
	const { onSubmitRegistration, errorRegistration, dataUser } = props;
	const [userDataReservation, setUserDatareservation] = useState({
		email: "",
		password: "",
		province: "",
		city: "",
		nomer_telp: "",
		name: "",
		confirm_password: "",
	});
	const { digivApi } = digivApiServices();
	const [provinceList, setProvinceList] = useState([]);
	const [cityList, setCityList] = useState([]);

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
	}, 500);

	return (
		<>
			<div className=' mx-auto rounded  w-full'>
				<div className='py-4 px-4 text-black text-4xl font-bold text-white'>
					<h1>Daftar</h1>
				</div>
				<div className='px-4 px-4 text-black'>
					{errorRegistration?.status && (
						<Alert message={errorRegistration?.message} />
					)}
				</div>
				<div className='py-4 px-4 '>
					<Formik
						initialValues={userDataReservation}
						validationSchema={validationReservationSchema}
						enableReinitialize={true}
						onSubmit={onSubmitRegistration}>
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
									placeholder='Nomer Telepon contoh : 0817627362'
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
									disabled={values.province === null || values.province === ""}
									objectValue={cityList}
									onSelectedOption={(e) => {}}
									onChange={(e) => {
										handelChangeCity(values.province, e);
									}}
								/>
								<FormField
									name='email'
									label='Email Address'
									placeholder='Email contoh : nama.kamu@email.co.id'
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
								<FormField
									name='confirm_password'
									type='password'
									label='Password'
									placeholder='input confirm Password'
									className='mb-4'
									withLabel={false}
								/>

								<div className='w-full mt-8'>
									<button
										className=' w-full bg-yellow-500 text-black font-bold py-2 px-4 rounded'
										type='submit'>
										Register
									</button>
								</div>
							</form>
						)}
					</Formik>
				</div>
			</div>
		</>
	);
}
