// import '../styles/tailwind.css'
import "@styles/index.scss";
import { useEffect } from "react";
import { Workbox } from "workbox-window";
import Router from "next/router";
import { GTMPageView } from "@utils/gtm";
import { config } from "@fortawesome/fontawesome-svg-core"; // 👈
import "@fortawesome/fontawesome-svg-core/styles.css";
import 'react-chatbox-component/dist/style.css';
 // 👈
config.autoAddCss = false; // 👈// Import the CSS

function MyApp({ Component, pageProps }) {
	useEffect(() => {
		const handleRouteChange = (url) => GTMPageView(url);
		Router.events.on("routeChangeComplete", handleRouteChange);
		return () => {
			Router.events.off("routeChangeComplete", handleRouteChange);
		};
	}, []);
	// useEffect(() => {
	// 	if (
	// 		!("serviceWorker" in navigator) ||
	// 		process.env.NODE_ENV !== "production"
	// 	) {
	// 		console.warn("Progressive Web App support is disabled");
	// 		return;
	// 	}
	// 	const wb = new Workbox("sw.js", { scope: "/" });
	// 	wb.register();
	// }, []);
	return <Component {...pageProps} />;
}

export default MyApp;
