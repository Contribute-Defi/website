const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const GoogleFontsPlugin = require('google-fonts-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: ['babel-loader', 'eslint-loader'],
			},
			{
				test: /\.html$/,
				use: 'html-loader',
			},
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(woff2?|eot|ttf|otf|svg|png|jpg|gif)(\?.*)?$/,
				loader: 'file-loader',
				options: {
					name: '[name].[hash].[ext]',
				},
			},
		],
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 5051,
		host: '0.0.0.0',
		disableHostCheck: true,
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[hash].css',
		}),
		new GoogleFontsPlugin({
			fonts: [
				{
					family: 'Raleway',
					variants: ['200', '400', '700'],
				},
			],
			formats: ['woff', 'woff2'],
		}),
		new Dotenv(),
	],
	devtool: 'source-map',
};
