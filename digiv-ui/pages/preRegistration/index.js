import Head from "next/head";
import { useEffect } from "react";
import PreRegistration from "@components/pages/preRegistration";
import { ModalProvider } from "@components/element/modal";
export default function preRegistration() {
	useEffect(() => {}, []);
	return (
		<div className='min-w-full min-h-full  pre-registration-content'>
			<Head>
				<title>Adira VirtualTour</title>
				<script src='https://www.gstatic.com/firebasejs/7.20.0/firebase-app.js'></script>
				<script src='https://www.gstatic.com/firebasejs/7.20.0/firebase-firestore.js'></script>
			</Head>
			<ModalProvider>
				<PreRegistration />
			</ModalProvider>
		</div>
	);
}
