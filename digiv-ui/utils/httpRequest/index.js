import axios from "axios";
import nookies, { parseCookies, setCookie, destroyCookie } from "nookies";
import Router from "next/router";

let axiosApiRequest = "";

const digivApiServices = (ctx) => {
	// const { openSnackbar } = useContext(SnackbarContext);

	const API_BASE_CONFIG = {
		baseURL: ENV.API_URL,
		timeout: 60000,
	};
	// console.log(API_BASE_CONFIG)

	const cancelToken = axios.CancelToken.source();

	const digivApi = axios.create(API_BASE_CONFIG);

	// add cancelation feature to axios request config
	const withAxiosCancelation = (config) => {
		config.cancelToken = cancelToken.token;
		return config;
	};

	// handleGlobalConfig
	const handleGlobalConfig = (config) => {
		const globalConfig = withAxiosCancelation(config);
		return globalConfig;
	};

	const axiosInterceptorsRequest = (config) => {
		config.headers["Content-Type"] = "application/json";
		// config.headers.post['Content-Type'] = 'application/json';
		// config.headers.put['Content-Type'] = 'application/json';
		// config.headers.delete['Content-Type'] = 'application/json';
		return config;
	};

	const axiosInterceptorsRequestError = (error) => {
		return Promise.reject(error);
	};

	const axiosInterceptorsResponseSuccess = (response) => {
		return response;
	};

	const axiosInterceptorsResponseError = async (error) => {
		const { config, data, status } = error.response || {};

		if (data && status === 401 && !config._retry) {
			const getRefreshToken = await refreshAccessToken(ctx);
			console.log(getRefreshToken);
			if (getRefreshToken) {
				if (ctx) {
					nookies.set(ctx, "ATT", getRefreshToken.access_token, {
						maxAge: 30 * 24 * 60 * 60,
						path: "/",
					});
					nookies.set(ctx, "ART", getRefreshToken.refresh_token, {
						maxAge: 30 * 24 * 60 * 60,
						path: "/",
					});
				} else {
					setCookie(null, "ATT", getRefreshToken.access_token, {
						maxAge: 30 * 24 * 60 * 60,
						path: "/",
					});
					setCookie(null, "ART", getRefreshToken.refresh_token, {
						maxAge: 30 * 24 * 60 * 60,
						path: "/",
					});
				}
				config.headers.authorization = `Bearer ${getRefreshToken.access_token}`;

				return axios(config);
			} else {
				console.log(config)
				if(config.url !== 'api/auth/login'){
					if (ctx) {
						ctx.res?.writeHead(302, {
							Location: "/login",
						});
						ctx.res?.end();
					}
					Router.replace("/login");

				}
			
			}
			// window.location.href="/";
		}
		// console.log('asdasdasd',error.response)

		return Promise.reject(error);
	};

	// digivApi.interceptors.response.use(
	//     axiosInterceptorsResponseSuccess,
	//     axiosInterceptorsResponseError
	// );

	digivApi.interceptors.response.use(
		axiosInterceptorsResponseSuccess,
		axiosInterceptorsResponseError,
	);

	digivApi.interceptors.request.use(
		axiosInterceptorsRequest,
		axiosInterceptorsRequestError,
	);
	digivApi.interceptors.request.use(handleGlobalConfig);
	return {
		cancelRequest: (message) => cancelToken.cancel(message),
		digivApi,
	};
};
const refreshAccessToken = async (ctx) => {
	let refreshToken;
	if (ctx) {
		refreshToken = nookies.get(ctx)["ART"];
	} else {
		refreshToken = parseCookies()["ART"];
	}
	if (!refreshToken) {
		return null;
	}

	try {
		const getNewToken = await axios.get(`${ENV.API_URL}api/auth/refresh`, {
			headers: {
				authorization: `Bearer ${refreshToken}`,
			},
		});

		const {
			data: { data, status_code },
		} = getNewToken;
		if (data) {
			return data;
		}
	} catch (error) {
		console.log(error);
	}
	return null;
};

export const { digivApi } = digivApiServices;
export default digivApiServices;
