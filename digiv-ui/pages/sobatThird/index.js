import Head from "next/head";
import { useEffect } from "react";
import SobatThirdPage from "@components/pages/sobatThrid";
import { ModalProvider } from "@components/element/modal";
import withAuth from "@hoc/withAuth";

const SobatThird = function () {
	const versionVideo = '1599859531608';

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
					href={`${ENV.ASSETS_URL}sobat-3/locale/en.txt?v=${versionVideo}`}
					as='fetch'
					crossOrigin='anonymous'
				/>
				<meta name='description' content='Virtual Tour' />
				<meta name='theme-color' content='#33FF66' />
                <link rel="preload" href={`${ENV.ASSETS_URL}sobat-3/script.js?v=${versionVideo}`} as="script"/>

				<script src={`${ENV.ASSETS_URL}sobat-3/lib/tdvplayer.js?v=${versionVideo}`}></script>
				<script src={`${ENV.ASSETS_URL}sobat-3/script.js?v=${versionVideo}`}></script>
				<script src={`${ENV.ASSETS_URL}sobat-3/initialVideo.js`}></script>
			</Head>
			<ModalProvider>
				<SobatThirdPage />
			</ModalProvider>
		</div>
	);
};
SobatThird.getInitialProps = async props => {
	console.info('##### Congratulations! You are authorized! ######', props);
	return {};
  };
  
export default withAuth(SobatThird);
