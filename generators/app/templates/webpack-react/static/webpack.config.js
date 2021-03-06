"use strict";

var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var STATIC_SRC = require("./ciconfig")["static-src"];
var DIST_PATH = require('./ciconfig').dist;
var HTML_PATH = require('./ciconfig').output;
const env = require("./ciconfig").env;
const PUBLIC_PATH = require('./ciconfig').urlPrefix + STATIC_SRC + '/';

var plugins = [
	new CleanWebpackPlugin(['dist'], {
		root: path.join(__dirname),
		verbose: true,
		dry: false
	}),
	new CopyWebpackPlugin([{
		from: './html',
		to: '../'
	}]),
	new webpack.optimize.CommonsChunkPlugin({
		name: "common",
		filename: "common.js",
		minChunks: Infinity
	}),
	new ExtractTextPlugin("[name].css", {
		allChunks: true
	})
];

if (env == "product") {
	plugins.push(
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		})
	);
	plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	);
}

module.exports = {
	entry: {
        'yourpagename': ['./src/yourpagename/index.js'],
        common: ['react', 'react-dom']
    },
	output: {
		filename: '[name].js',
		path: path.join(__dirname, DIST_PATH, STATIC_SRC),
		publicPath: PUBLIC_PATH,
		chunkFilename: '[name].[chunkhash].js',
		sourceMapFilename: '[name].map'
	},
	devtool: 'source-map',
	resolve: {
		extensions: ['.js', '.es6', '.json', '.jsx', '']
	},
	module: {
		loaders: [{
			test: /\.(es6|jsx|js)$/,
			loader: 'babel',
			exclude: /node_modules/
		}, {
			test: /\.css$/,
			loader: ExtractTextPlugin.extract('css-loader?-restructuring!postcss')
		}, {
			test: /\.css\.module/,
			loader: ExtractTextPlugin.extract('css-loader?-restructuring&modules&localIdentName=[local]___[hash:base64:5]!postcss')
		}, {
			test: /\.woff|ttf|woff2|eot$/,
			loader: 'url?limit=100000'
		}, {
			test: /\.json$/,
			loader: 'json-loader'
		}, {
			test: /\.less$/,
			loader: ExtractTextPlugin.extract('css-loader!postcss!less')
		}, {
			test: /\.less\.module/,
			loader: ExtractTextPlugin.extract('css-loader?modules&localIdentName=[local]___[hash:base64:5]!postcss!less')
		}, {
			test: /\.(jpe?g|png|gif|svg)$/i,
			loaders: ['url?limit=25000']
		}]
	},
	postcss: function() {
		//处理css兼容性代码，无须再写-webkit之类的浏览器前缀
		return [
			require('postcss-initial')({
				reset: 'all'
			}),
			require('autoprefixer')({
				browsers: ['> 5%']
			})
		];
	},
	plugins: plugins,
	devServer: {
		contentBase: HTML_PATH,
		historyApiFallback: false,
		hot: true,
		port: 8080,
		publicPath: PUBLIC_PATH,
		noInfo: false
	}
};
