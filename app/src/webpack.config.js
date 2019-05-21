const webpack = require('webpack');
const resolve = require('path').resolve;
const config = {
 devtool: 'eval-source-map',
 entry: [
  'regenerator-runtime/runtime',
   __dirname + '/js/index.js'
 ],
 output:{
      path: resolve('../public'),
      filename: 'bundle.js',
      publicPath: resolve('../public')
},
 resolve: {
  extensions: ['.js','.jsx','.css']
 },
 module: {
    rules: [
    {
        test: /\.jsx?/,
        loader: 'babel-loader',
        exclude: /node_modules/,
    },
    {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules'
    },
    {
        test: /\.(jpg|png)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 25000,
          },
        },
    },]
   }
};
module.exports = config;

