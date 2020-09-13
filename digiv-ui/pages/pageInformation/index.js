import Head from "next/head";
import { useEffect } from "react";
import PageInformation from "@components/pages/pageInformation";
import { ModalProvider } from "@components/element/modal";
export default function preRegistration() {
	useEffect(() => {}, []);
	return (
		<div className='min-w-full min-h-full  page-information-content'>
			<Head>
				<title>Adira VirtualTour</title>
				<meta name="viewport" content="width=device-width, initial-scale=1"/>
			</Head>
			<ModalProvider>
				<PageInformation />
			</ModalProvider>
		</div>
	);
}
