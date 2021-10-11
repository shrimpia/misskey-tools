/**
 * webpack configuration
 */

const fs = require('fs');
const webpack = require('webpack');

//  class WebpackOnBuildPlugin {
//	constructor(readonly callback: (stats: any) => void) {
//	}

//	public apply(compiler: any) {
//		compiler.hooks.done.tap('WebpackOnBuildPlugin', this.callback);
//	}
//  }

const isProduction = process.env.NODE_ENV === 'production';

const meta = require('./package.json');

module.exports = {
	entry: {
		fe: './src/frontend/init.tsx',
	},
	module: {
		rules: [{
			test: /\.(eot|woff|woff2|svg|ttf)([?]?.*)$/,
			type: 'asset/resource'
		}, {
			test: /\.json5$/,
			loader: 'json5-loader',
			options: {
				esModule: false,
			},
			type: 'javascript/auto'
		}, {
			test: /\.tsx?$/,
			use: [
				{ loader: 'ts-loader' }
			]
		}, {
			test: /\.scss$/,
			use: [
				'style-loader',
				{
					loader: 'css-loader',
					options: {
						url: false,
						sourceMap: true,
					},
				},
				{
					loader: 'sass-loader',
					options: {
						implementation: require('sass'),
						sassOptions: {
							fiber: false
						},
						sourceMap: true,
					},
				},
			],
		}, {
			test: /\.css$/i,
			use: ['style-loader', 'css-loader'],
		}]
	},
	plugins: [
		new webpack.ProgressPlugin({}),
	],
	output: {
		path: __dirname + '/built/assets',
		filename: `[name].${meta.version}.js`,
		publicPath: '/assets/',
		pathinfo: false,
	},
	resolve: {
		extensions: [
			'.js', '.ts', '.json', '.tsx'
		],
		alias: {
		}
	},
	resolveLoader: {
		modules: ['node_modules']
	},
	experiments: {
		topLevelAwait: true
	},
	devtool: false, //'source-map',
	mode: isProduction ? 'production' : 'development'
};
