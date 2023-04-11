const path = require('path');

module.exports = {
   configureWebpack: {
      output: {
         filename: '[name].[fullhash].js',
         chunkFilename: '[name].[fullhash].js',
      },
      module: {
         rules: [
            {
               test: /\.mjs$/,
               include: /node_modules/,
               type: 'javascript/auto',
            },
         ],
      },
      resolve: {
         alias: {
            '@': path.resolve(__dirname, './src'),
         },
         extensions: ['.js', '.vue', '.json'],
      },
   },
   devServer: {
      allowedHosts: 'all',
      host: 'dev.payments-ui.hyphen.com',
      port: 4321,
   },
};
