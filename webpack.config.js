import path from 'path'
import webpack from 'webpack';
import babelConfig from './babel.config.js';
const webpackConfig = {
  entry: './src/index.ts',
  devtool: 'source-map',
  // mode: 'production',
  mode: 'development',
  target: "node",
  output: {
    filename: '[name].cjs',
    path: path.resolve(process.cwd(), `dist`),
    clean: true,
  },
    
  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'jsx']
  },
  module:{
    rules:[
      {oneOf: [
        {
          test: /\.(js|ts|jsx|tsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options:
                {
                  // cacheDirectory: process.env.NODE_ENV === 'development', // 在dev开发环境开始缓存
                  ...babelConfig
                }
            }]
        },
      ]}
    ]
  },
  plugins:[
    new webpack.BannerPlugin({
      banner:'#!/usr/bin/env node',
      raw: true
    })
  ]

}

export default webpackConfig;