'use strict'

const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const env = process.env.ENV || 'dev'

const appDir = fs.realpathSync(process.cwd())

const resolveApp = relativePath => path.resolve(appDir, relativePath)

const cssRegex = /\.css$/
const cssModuleRegex = /\.module\.css$/
const lessRegex = /\.(less)$/
const lessModuleRegex = /\.module\.(less)$/
const sassRegex = /\.(scss|sass)$/
const sassModuleRegex = /\.module\.(scss|sass)$/

const srcDir = resolveApp('./app')
const distDir = resolveApp('./dist')

const entry = {
  app: `${srcDir}/index.js`
}
const outputPath = distDir
const outputPublicPath = '/'
const htmlWebpackPlugins = [
  new HtmlWebpackPlugin({
    template: `${srcDir}/public/index.html`,
    filename: 'index.html',
    inject: 'body',
    chunks: ['app', 'vendors']
  })
]
const copyPluginOpts = [{
  context: `${srcDir}/public`,
  from: '**/*',
  to: '',
  ignore: ['index.html']
}]

const lessLoader = {
  loader: 'less-loader',
  options: {
    javascriptEnabled: true
  }
}

module.exports = {
  entry: entry,
  output: {
    path: outputPath,
    publicPath: outputPublicPath,
    filename: 'static/js/[name].[contenthash:8].js',
    chunkFilename: 'static/js/[name].[contenthash:8].js'
  },
  stats: {
    children: false,
    chunks: false,
    modules: false
  },
  resolve: {
    alias: {
      '@': `${srcDir}`,
      ENV: path.resolve(__dirname, `${srcDir}/env/${env}`)
    },
    extensions: ['.js', '.jsx', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|vue)$/,
        enforce: 'pre',
        exclude: /(node_modules|vendors)/,
        use: [
          {
            loader: 'eslint-loader'
          }
        ],
        include: srcDir
      },
      {
        test: /\.vue$/,
        use: [
          'vue-loader'
        ]
      },
      {
        oneOf: [
          {
            test: /\.(bmp|gif|jpe?g|png)$/,
            loader: 'url-loader',
            options: {
              limit: 4196,
              name: 'static/media/[name].[hash:8].[ext]'
            }
          },
          {
            test: /\.(js|jsx)$/,
            include: srcDir,
            loader: 'babel-loader'
          },
          /* css */
          {
            test: cssRegex,
            exclude: cssModuleRegex,
            use: [
              {
                loader: MiniCssExtractPlugin.loader
              },
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('autoprefixer')
                  ]
                }
              }
            ]
          },
          {
            test: cssModuleRegex,
            use: [
              {
                loader: MiniCssExtractPlugin.loader
              },
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  importLoaders: 1
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('autoprefixer')
                  ]
                }
              }
            ]
          },
          /* less */
          {
            test: lessRegex,
            exclude: lessModuleRegex,
            use: [
              {
                loader: MiniCssExtractPlugin.loader
              },
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('autoprefixer')
                  ]
                }
              },
              lessLoader
            ]
          },

          {
            test: lessModuleRegex,
            use: [
              {
                loader: MiniCssExtractPlugin.loader
              },
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  importLoaders: 1
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('autoprefixer')
                  ]
                }
              },
              lessLoader
            ]
          },
          /* sass */
          {
            test: sassRegex,
            exclude: sassModuleRegex,
            use: [
              {
                loader: MiniCssExtractPlugin.loader
              },
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('autoprefixer')
                  ]
                }
              },
              'sass-loader'
            ]
          },
          {
            test: sassModuleRegex,
            use: [
              {
                loader: MiniCssExtractPlugin.loader
              },
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  importLoaders: 1
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('autoprefixer')
                  ]
                }
              },
              'sass-loader'
            ]
          },
          {
            loader: 'file-loader',
            exclude: /\.(js|jsx|vue|html|json)$/,
            options: {
              name: 'static/media/[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    ...htmlWebpackPlugins,
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
    }),
    new CopyWebpackPlugin(copyPluginOpts)
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'vendors',
      maxInitialRequests: 6
    }
  }
}
