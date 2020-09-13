import React, { useState, useEffect } from "react";
import { FormField } from "@components/element/form";
import Alert from "@components/element/alert";
import SelectAutoComplete from "@components/element/selectAutoComplete";
import digivApiServices from "@utils/httpRequest";
import { Formik } from "formik";
//import { validationReservationSchema } from "../scheme/validation";
import debounce from "@utils/debounce";

export default function modalTestDrive(props) {
    const { dataUser, isShow, onClose, onSubmitTestDrive, errorTestDrive } = props;
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
                                    <div class="flex flex-wrap -mx-3 mb-6">
                                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                            First Name
                                        </label>
                                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane" />
                                        </div>
                                        <div class="w-full md:w-1/2 px-3">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                            Last Name
                                        </label>
                                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe" />
                                        </div>
                                    </div>
                                    <div class="flex flex-wrap -mx-3 mb-6">
                                        <div class="w-full px-3">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                            Email
                                        </label>
                                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="email" placeholder="john.doe@mail.com" />
                                        </div>
                                    </div>
                                    <div class="flex flex-wrap -mx-3 mb-6">
                                        <div class="w-full px-3">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                            Phone
                                        </label>
                                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="phone" placeholder="081234567890" />
                                        </div>
                                    </div>
                                    <div class="flex flex-wrap -mx-3 mb-2">
                                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                                                Merk
                                            </label>
                                            <div class="relative">
                                                <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                                    <option>Honda</option>
                                                    <option>Suzuki</option>
                                                    <option>Toyota</option>
                                                </select>
                                                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                                                Tipe
                                            </label>
                                            <div class="relative">
                                                <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                                    <option>Jazz</option>
                                                    <option>H-RV</option>
                                                    <option>C-RV</option>
                                                </select>
                                                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                                </div>
                                            </div>
                                        </div>
								    </div>
                                </div>
								{/*footer*/}
								<div className='grid grid-flow-col grid-cols-1 grid-rows-1 gap-1 modal-car-footer p-6 border-t border-solid border-gray-300 rounded-b'>
							

									<button
										className='bg-green-500 text-white active:bg-green-600 uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
										type='button'
										style={{ transition: "all .15s ease" }}
										onClick={onClose}>
										Submit
									</button>
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
