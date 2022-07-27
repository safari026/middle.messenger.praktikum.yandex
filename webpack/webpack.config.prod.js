const { merge } = require('webpack-merge');

const common = require('./webpack.config.common.js');
const miniCss = require('mini-css-extract-plugin');

const prodConfig = {
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.scss$/i,
				use: [miniCss.loader, 'css-loader', 'sass-loader'],
			},
		],
	},
	plugins: [
		new miniCss({
			filename: 'style.css',
		}),
	],
};
module.exports = merge(common, prodConfig);
