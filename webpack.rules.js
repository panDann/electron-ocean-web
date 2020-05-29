const path = (path) => require('path').resolve(__dirname, path)

module.exports = [
  // Add support for native node modules
  {
    test: /\.node$/,
    use: 'node-loader',
  },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@marshallofsound/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    },
  },
  {
    test: /\.(styl)$/,
    use: [

      'style-loader'
      ,

      {
        loader: 'css-loader',
        //  options:{
        //    root:'',
        //   //  alias:{
        //   //    '~images':path('src/assets/images')
        //   //  }
        //  }
      }
      ,
      {
        loader: 'stylus-loader',
        options: {
          // includePaths:[path('src/styles/variables.styl')]
        }
      },
      {
        loader: 'style-resources-loader',
        options: {
          patterns: [
            path('src/styles/variables.styl'),
          ]
        }
      }
    ]
  },
  {
    test: /\.(jpg|png)$/,
    use: 'file-loader',
  },
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|\.webpack)/,
    use: {
      loader: 'ts-loader',
      options: {
        transpileOnly: true
      }
    }
  },
  // {
  //   test: /\.(tsx|ts)$/,
  //   exclude: /(node_modules|\.webpack)/,
  //   use: {
  //     loader: 'babel-loader',
  //     options: {
  //       presets: ['env','react']
  //     }
  //   }
  // },
];
