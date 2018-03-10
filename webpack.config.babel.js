import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';

const env = process.env.NODE_ENV;
const isProd = env === 'production';

const srcPath = path.join(__dirname, './src');
const distPath = path.join(__dirname, './dist');

const loadPlugins = () => {
  const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify(env),
    __DEV__: env === 'development'
  };

  const plugins = [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: './index.html'
    }),
    new webpack.NamedModulesPlugin()
  ];

  if (isProd) {
    plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          screw_ie8: true,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true
        },
        output: {
          comments: false
        }
      })
    );
  } else {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }
  plugins.push(
    new ExtractTextPlugin('[name].bundle-[chunkhash].css')
  );

  return plugins;
};

const getAppEntryPoints = () => {
  const entry = ['whatwg-fetch', path.join(__dirname, 'src', 'index.jsx')];

  if (!isProd) {
    entry.unshift('react-hot-loader/patch');
  }

  entry.unshift('babel-polyfill');

  return entry;
};

const config = {
  devtool: isProd ? 'source-map' : 'cheap-module-eval-source-map',
  entry: getAppEntryPoints(),
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.json', '.js', '.jsx', 'css']
  },
  output: {
    path: distPath,
    filename: isProd ? 'bundle-[chunkhash].js' : 'bundle.js'
  },
  plugins: loadPlugins(),
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
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: true,
                localIdentName: '[name]-[local]-[hash:base64:5]'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: './postcss.config.js'
                }
              }
            }
          ]
        })
      }
    ]
  },
  devServer: {
    contentBase: './src',
    historyApiFallback: true,
    port: 3000,
    compress: isProd,
    inline: !isProd,
    overlay: true,
    hot: !isProd,
    stats: {
      assets: true,
      timings: true,
      warnings: true,
      colors: {
        green: '\u001b[32m'
      }
    }
  }
};

export default config;
