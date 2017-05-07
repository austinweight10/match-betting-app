var config = {
   entry: './main.js',

   output: {
      path:'/',
      publicPath: "/",
      filename: 'index.js',
   },

   devServer: {
      inline: true,
      port: 8080
   },


   module: {
      loaders: [
          {
              test: /\.json$/,
              loader: 'json-loader'
          },
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
               presets: ['es2015', 'react']
            }
        }
      ]
   }
}

module.exports = config;
