import Head from "next/head";
import { useEffect } from "react";
import SobatFirstPage from "@components/pages/sobatFirst";
import { ModalProvider } from "@components/element/modal";
import withAuth from "@hoc/withAuth";

const SobatFirst = function () {
	const versionVideo = '1599855891915';
	
	return (
		<div className='min-w-screen min-h-screen'>
			<Head>
				<meta
					name='viewport'
					id='metaViewport'
					content='user-scalable=no, initial-scale=1, width=device-width, viewport-fit=cover'
					data-tdv-general-scale='0.5'
				/>

				<title>Adira VirtualTour</title>
				<link
					rel='preload'
					href={`${ENV.ASSETS_URL}sobat-1/locale/en.txt?v=${versionVideo}`}
					as='fetch'
					crossOrigin='anonymous'
				/>
				<meta name='description' content='Virtual Tour' />
				<meta name='theme-color' content='#33FF66' />
				<link
					rel='preload'
					href={`${ENV.ASSETS_URL}sobat-1/script.js?v=${versionVideo}`}
					as='script'
				/>
				<script src={`${ENV.ASSETS_URL}sobat-1/lib/tdvplayer.js?v=${versionVideo}`}></script>
				<script src={`${ENV.ASSETS_URL}sobat-1/script.js?v=${versionVideo}`}></script>
				<script src={`${ENV.ASSETS_URL}sobat-1/initialVideo.js`}></script>
			</Head>
			<ModalProvider>
				<SobatFirstPage />
			</ModalProvider>
		</div>
	);
};
SobatFirst.getInitialProps = async props => {
	console.info('##### Congratulations! You are authorized! ######', props);
	return {};
  };
  
export default withAuth(SobatFirst);
