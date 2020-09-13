const webpack = require("webpack");
const path = require("path");
const tailwindCss = require("tailwindcss");

require("dotenv").config();
const isProd = process.env.NODE_ENV === "production";

module.exports = (config, options) => {
	const rules = [
		{
			test: /\.scss$/,
			use: [
				{
					loader: "postcss-loader",
					options: {
						ident: "postcss",
						plugins: [tailwindCss("./tailwind.config.js")],
					},
				},
				{ loader: "sass-loader" },
			],
		},
		{
			test: /\.(eot|woff|woff2|ttf)$/,
			use: {
				loader: "url-loader",
				options: {
					limit: 100000,
					outputPath: "../public/assets/", // if you don't use ../ it will put it inside ".next" folder by default
					publicPath: "/assets/",
				},
			},
		},
	];
	let envObject = {
		ENV: {},
	};

	Object.keys(process.env).map((key) => {
		envObject[`ENV`][key] = JSON.stringify(process.env[key]);
	});

	return {
		...config,
		node :{
			fs: 'empty'
		},
		plugins: [
			...config.plugins,
			new webpack.DefinePlugin(envObject),
			// new CaseSensitivePathsPlugin({debug: true}),
		],
		module: {
			...config.module,
			rules: [...config.module.rules, ...rules],
		},
	};
};

// path.resolve(path.join(__dirname, '../tailwind.config.js'))
