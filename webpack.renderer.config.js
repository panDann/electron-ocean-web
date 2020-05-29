const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');
const path = (path) => require('path').resolve(__dirname,path)

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader'}, { loader: 'css-loader', options:{alias:{
    '~images':path('src/assets/images')
  }} }],
});

module.exports = {

  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.styl'],
    alias:{
      "@src":path('src'),
      "~images":path('src/assets/images'),
    }
  },
  devServer:{
    hot:true
  }
};
