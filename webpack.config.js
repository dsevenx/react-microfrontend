const path = require('path');

module.exports = {
  entry: './src/webcomponent.js',
  output: {
    filename: 'webcomponent.bundle.js',
    path: path.resolve(__dirname, 'public'),
    iife: true, // aktiviert IIFE-Modus für Bundle
    library: {
      name: 'TribemotorakteApp',
      type: 'var' // einfacher globaler Export
    }
  },
  mode: 'production',
  module: {
    rules: [
      // JS & JSX über Babel
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      // TS & TSX über ts-loader
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      // CSS über style-loader und css-loader
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx']
  }
};
