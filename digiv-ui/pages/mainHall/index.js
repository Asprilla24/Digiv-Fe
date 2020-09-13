import Head from "next/head";
import { useEffect } from "react";
import MainHallPage from "@components/pages/mainHall";
import { ModalProvider } from "@components/element/modal";
import withAuth from "@hoc/withAuth"

const MainHall = function (props) {
	console.log(props)
	const versionVideo = '1599592523952';

	return (
		<div className='min-w-screen min-h-screen'>
			<Head>
				<title>Adira VirtualTour</title>
				<link
					rel='preload'
					href={`${ENV.ASSETS_URL}foyer/locale/en.txt?v=${versionVideo}`}
					as='fetch'
					crossOrigin='anonymous'
				/>
				<meta name='description' content='Virtual Tour' />
				<meta name='theme-color' content='#33FF66' />
				<link
					rel='preload'
					href={`${ENV.ASSETS_URL}foyer/script.js?v=${versionVideo}`}
					as='script'
				/>
				<script src={`${ENV.ASSETS_URL}foyer/lib/tdvplayer.js?v=${versionVideo}`}></script>
				<script src={`${ENV.ASSETS_URL}foyer/script.js?v=${versionVideo}`}></script>
				<script src={`${ENV.ASSETS_URL}foyer/initialVideo.js`}></script>
			</Head>
			<ModalProvider>
				<MainHallPage />
			</ModalProvider>
		</div>
	);
}
MainHall.getInitialProps = async (context) => {
	return {}
}
export default withAuth(MainHall)