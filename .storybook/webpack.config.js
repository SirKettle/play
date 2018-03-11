const webpack = require('webpack');
const merge = require('webpack-merge');
const R = require('ramda');
const path = require('path');
const storybookDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');
const srcPath = path.join(__dirname, '..', 'src');

module.exports = (config, env) => {
  const storybookConfig = storybookDefaultConfig(config);
  const output = merge(
    {
      resolve: {
        modules: ['src', 'node_modules'],
        extensions: ['.json', '.js', '.jsx', '.css']
      },
      module: {
        rules: [
          {
            enforce: 'pre',
            test: /\.(js|jsx)$/,
            loaders: ['eslint-loader'],
            include: srcPath
          },
          {
            test: /\.(js|jsx)$/,
            include: srcPath,
            loaders: ['babel-loader']
          },
          {
            test: /\.png$/,
            use: 'url-loader?mimetype=image/png'
          },
          {
            test: /\.(jpeg|jpg)$/,
            use: 'url-loader?mimetype=image/jpeg'
          },
          {
            test: /\.svg$/,
            use: 'url-loader?mimetype=image/svg+xml'
          },
          {
            test: /\.css$/,
            use: [
              {
                loader: 'style-loader',
                options: {
                  singleton: true
                }
              },
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  importLoaders: 1,
                  localIdentName: '[hash:base64:4]-[folder]--[name]--[local]',
                  minimize: true
                }
              },
              {
                loader: 'postcss-loader'
              }
            ],
            include: srcPath,
            exclude: /node_modules/
          }
        ]
      }
    },
    R.omit(['postcss', 'module'])(storybookConfig)
  );
  return output;
};
