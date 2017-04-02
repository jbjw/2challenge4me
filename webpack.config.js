// var webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const DIST_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'src');

const config = {
	devtool: 'source-map',
	devServer: {
		inline: true,
		// hot: true,
		contentBase: 'dist/',
		port: 80,
	},
	entry: path.resolve(SRC_DIR, 'main.jsx'),
	output: {
		path: DIST_DIR,
		filename: 'bundle.js',
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015', 'react'],
				},
			},
		],
	},
	plugins: [

    new CopyWebpackPlugin([
      {
        from: 'src/index.html',
        to: 'index.html'
      },
    ]),

		new CopyWebpackPlugin([
      {
        from: 'src/index.css',
        to: 'index.css'
      },
    ]),

    new OpenBrowserPlugin({
      url: 'http://localhost/'
    }),
  ],
};

module.exports = config;
