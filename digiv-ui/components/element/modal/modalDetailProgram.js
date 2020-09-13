import React, { useState } from "react";

export default function modalDetailCar(props) {
	const { message, isShow, onClose } = props;
	return (
		<>
			{isShow ? (
				<>
					<div
						className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'
						onClick={onClose}>
						<div className='  relative max-h-screen w-auto my-6 max-w-sm md:mx-auto lg:max-w-3xl xl:max-w-3xl'>
							{/*content*/}
							<div className='modal-car-container border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
								{/*header*/}
								<div className='modal-car-header flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t'>
									<h3 className='text-3xl font-semibold'>Detail Program</h3>
									<button
										className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
										onClick={onClose}>
										<span className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'>
											×
										</span>
									</button>
								</div>
								{/*body*/}
								<div className='  modal-car-content overflow-x-hidden overflow-y-auto p-6 flex-auto grid gap-4 grid-cols-1'>
									<div className='modal-content-img'>
										<img src="https://www.adira.co.id/wp-content/uploads/2020/08/Ngantor-Tanpa-Galau-Cara-Pengajuan-Motor.jpg"></img>
									</div>
								</div>
								{/*footer*/}
								<div className='grid grid-flow-col grid-cols-3 gap-1 modal-car-footer p-6 border-t border-solid border-gray-300 rounded-b'>
							

									<button
										className='bg-green-500 text-white active:bg-green-600 uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
										type='button'
										style={{ transition: "all .15s ease" }}
										onClick={onClose}>
										Ajukan 
									</button>
									<button
										className='bg-green-500 text-white active:bg-green-600  uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
										type='button'
										style={{ transition: "all .15s ease" }}
										onClick={onClose}>
										Live Chat
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
