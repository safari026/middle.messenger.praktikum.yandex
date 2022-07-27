const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const { EnvironmentPlugin } = require('webpack');

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');


const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	entry: './src/index.ts',
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'bundle-[hash].js',
	},
	resolve: {
		plugins: [new TsconfigPathsPlugin()],
		alias: {
			handlebars: 'handlebars/dist/handlebars.min.js',
		},
		extensions: ['.ts', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.(png|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
			{
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{
				test: /\.ts?$/,
				loader: 'ts-loader',
			},
		],
	},
	plugins: [
		
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
		}),
		new EnvironmentPlugin({
			API_ENDPOINT: 'https://ya-praktikum.tech/api/v2',
			WS_CHAT_ENDPOINT: 'wss://ya-praktikum.tech/ws/chats',
		}),
		new CleanWebpackPlugin(),
	],
};
