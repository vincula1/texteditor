const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Makes an HTML
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Webpack Plugin',
      }),

      // Generates a manifest.json
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'My Progressive Web App',
        short_name: 'MyPWA',
        description: 'My awesome Progressive Web App!',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        start_url: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
          },
        ],
      }),

      new InjectManifest({
        swSrc: './src-sw.js', // this is your sw template
        swDest: 'service-worker.js',
      }),
    ],

    module: {
      rules: [
        // Babel loader
        {
          test: /\.js$/, // all files ending with .js
          exclude: /node_modules/, // except those in node_modules
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'], // use the preset-env
            },
          },
        },
        
        // CSS loaders
        {
          test: /\.css$/, // all files ending with .css
          use: ['style-loader', 'css-loader'], // use these loaders
        },
      ],
    },
  };
};

