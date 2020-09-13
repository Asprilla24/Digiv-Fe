import React from "react";
import Alert from "@components/element/alert";
import logoDanamon from "@assets/images/logo/logo-danamon.png";

export default function FormRegistration(props) {
	const { onClcikSubmitVideo, errorRegistration } = props;

	return (
		<>
			<div className=' w-10/12 md:w-8/12 lg:w-8/12 xl:w-6/2 content-reservation'>
				<div className='mx-auto w-full '>
					<div className=' mx-auto w-full'>
						<div className='px-8 text-black text-2xl font-bold text-white'>
							<h1>SELAMAT DATANG di ADIRA VIRTUAL EXPO 2020</h1>
						</div>
						<div className='px-8 text-black'>
							{errorRegistration?.status && (
								<Alert message={errorRegistration?.message} />
							)}
						</div>
						<div className='py-4 px-8 text-white  text-sm'>
							{/* <h1>Selamat Datang Sahabat</h1> */}
							<p>
								Nikmati pertualangan yang berbeda dalam memenuhi semua kebutuhan
								Sahabat, mulai dari Mobil, Motor, Bike, sampai dengan Fasilitas
								Dana Multiguna.
							</p>

							<p className="my-4">
								ADIRA VIRTUAL EXPO 2020 merupakan pameran multiproduk online
								terbesar saat ini yang memamerkan semua merek-merek ternama dari
								partner ADIRA FINANCE, serta nikmati Promo Special yang bisa
								Sahabat dapatkan
							</p>
							<p>
								Rasakan pengalaman virtual dan Dapatkan Cashback Rp 5OOrb untuk
								Sahabat yang mendaftar pada saat pre-registration
							</p>
							<button
								className=' w-full bg-yellow-500 text-black font-bold py-2 px-4 rounded my-4'
								onClick={onClcikSubmitVideo}
								type='submit'>
								Yuk Masuk !
							</button>
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
