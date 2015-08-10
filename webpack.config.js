var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main/app.js',
    output: {
        path: __dirname + "/build",
        filename: "bundle-[hash].js",
        publicPath: ""
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'jsx-loader?insertPragma=React.DOM&harmony'
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            // For Bootstrap icon fonts
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js']
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/main/index.html',
        inject: 'body'
    })]
};