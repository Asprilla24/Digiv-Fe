import Head from "next/head";
import { useEffect } from "react";
import BoothTypeOne from "@components/pages/boothTypeOne";
import { ModalProvider } from "@components/element/modal";
export default function Booth() {
	useEffect(() => {}, []);
	return (
		<div className='min-w-screen min-h-screen'>
			<Head>
				<title>Adira VirtualTour</title>
			</Head>
			<ModalProvider>
				<BoothTypeOne />
			</ModalProvider>
		</div>
	);
}
