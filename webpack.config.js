const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

module.exports = {
	entry: path.join(__dirname, "src", "index.js"),
	output: {
		path: path.resolve(__dirname, "dist"),
		clean: true,
	},
	mode: 'production',
	plugins: [new MiniCssExtractPlugin()],
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
			{
				test: /\.(jpg|jpeg|gif|png)$/,
				exclude: /node_modules/,
				use: [
					{
					  loader: 'url-loader',
					  options: {
						name:'[name].[ext]',
                        outputPath: 'images',
					  },
					},
				  ],
			},
			{
				test: /\.(woff|woff2|eot|ttf|svg)$/,
				exclude: /node_modules/,
				use: [
					{
					  loader: 'url-loader',
					  options: {
						name:'[name].[ext]',
                        outputPath: 'fonts'
					  },
					},
				  ],
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},

		],
	},
};