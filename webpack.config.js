var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
	entry: './component.jsx',
	output: {
		publicPath: 'http://localhost:8090/assets',
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /\.jsx?$/, // A regexp to test the require path. accepts either js or jsx
			loader: 'babel' // The module to load. "babel" is short for "babel-loader"
		},
			{
				test: /\.styl$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader!stylus-loader")
			}]
	},
	resolve: {
		extensions: ['', '.js', '.jsx', '.css', 'styl']
	},
	plugins: [
		new ExtractTextPlugin("styles.css")
	]
};
