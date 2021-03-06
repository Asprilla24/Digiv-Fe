const withPlugins = require("next-compose-plugins");
const withCss = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");
const tailwindCss = require("tailwindcss");
const withWorkbox = require("next-with-workbox");
const webpackBaseConfig = require("./config/webpack.base.conf");
const webpack = require("webpack");
const optimizedImages = require("@mrroll/next-optimized-images");
require('dotenv').config()

const nextConfig = {
	webpack: (config, options) => {
		return webpackBaseConfig(config);
	},
	env: JSON.stringify(process.env),
	pageExtensions: ["js"],
	useFileSystemPublicRoutes: false,
};

const workboxConfig = withWorkbox({
	workbox: {
		swSrc: "worker.js",
		
	},
});

module.exports = withPlugins([
	nextConfig,
	[optimizedImages, {
        inlineImageLimit: -1
    }],
	[withSass],
	[withCss],
]);
