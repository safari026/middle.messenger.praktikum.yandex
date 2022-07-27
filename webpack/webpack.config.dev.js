const { merge } = require('webpack-merge');

const common = require('./webpack.config.common.js');


const path = require('path');

const devConfig = {
	mode: 'development',
	devServer: {
		static: {
			directory: path.join(__dirname, '../dist'),
		},
		historyApiFallback: true,
		compress: true,
		port: 4000,
		open: true,
		hot: true,
	},
    module: {
		rules: [
			{
				test: /\.scss$/i,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
		],
	},
};
module.exports = merge(common, devConfig);
