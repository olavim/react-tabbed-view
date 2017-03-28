const path = require('path');
const webpack = require('webpack');

module.exports = {
	context: path.resolve(__dirname, 'src'),
	entry: './app.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: 'dist/'
	},
	devtool: 'inline-source-map',
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(scss|sass)$/,
				loaders: [
					'style-loader',
					'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
					'sass-loader'
				]
			},
			{test: /\.(png|svg)$/, loader: 'url-loader'},
			{test: /\.(ttf|otf|eot)$/, loader: 'file-loader'}
		]
	},
	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development')
		})
	]
};
