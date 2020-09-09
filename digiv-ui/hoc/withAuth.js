import React from "react";
import Router from "next/router";
import nookies from "nookies";
import digivApiServices from "@utils/httpRequest";

const login = "/login"; // Define your login route address.

const getAuthData = async (ctx) => {
	const { digivApi } = digivApiServices(ctx);
	const isUserLoggedIn = ctx.req.cookies["ATT"] && ctx.req.cookies["ART"];
	if (!isUserLoggedIn) {
		return null;
	}
	try {
		const getDataUser = await digivApi.get(`api/user/${ctx.req.cookies["AEU"]}`, {
			headers: {
				authorization: `Bearer ${ctx.req.cookies["ATT"]}`,
			},
		});
		const {
			data: { data },
		} = getDataUser;
		if (data) {
			return data;
		}
	} catch (e) {
    console.log(e)
  }
	return null;
};

const WrappedComponent = (Component) => {
	const hocComponent = ({ ...props }) => <Component {...props} />;

	hocComponent.getInitialProps = async (ctx) => {
		const isUserLoggedIn = ctx.req.cookies["ATT"];
		nookies.set(ctx, "fromGetInitialProps", "value", {
			maxAge: 30 * 24 * 60 * 60,
			path: "/",
		});
		const authData = await getAuthData(ctx);

		// Are you an authorized user or not?
		if (!isUserLoggedIn || !authData) {
			// Handle server-side and client-side rendering.
			if (ctx.res) {
				ctx.res?.writeHead(302, {
					Location: login,
				});
				ctx.res?.end();
			} else {
				Router.replace(login);
			}
		} else if (WrappedComponent.getInitialProps) {
			const wrappedProps = await WrappedComponent.getInitialProps({});
			return { ...wrappedProps, auth: authData };
		}

		return { test: "asdasdasd", auth: authData };
	};

	return hocComponent;
};

export default WrappedComponent;
