const webpack = require('webpack');
const fs = require('fs');

const packageJson = fs.readFileSync('./package.json');
const version = JSON.parse(packageJson).version || 0;

const now = new Date();
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  productionSourceMap: true,
  outputDir: 'dist',
  publicPath: process.env.VUE_APP_BASE_ROUTE || '/',
  filenameHashing: process.env.VUE_APP_HASH || false,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/scss/_variables.scss";`,
      },
    },
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
      ],
    },
    plugins: [
      new CopyPlugin([
        { from: "src/assets/data/", to: "data/" }
      ]),
      new webpack.DefinePlugin({
        'process.env': {
          PACKAGE_VERSION: `"${version}"`,
          DATE_DEPLOY: `"${now.toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })}"`,
          ENV_DEPLOY: `"${process.env.NODE_ENV}"`,
        },
      }),
    ],
  }
};
