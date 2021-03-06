import webpack from 'webpack';
import path from 'path';
// import precss from 'precss';
// import autoprefixer from 'autoprefixer';

const NODE_ENV = process.env.NODE_ENV;


let config = {
    entry: {
        app: path.resolve(__dirname, './src/index'),
        vendor: ['react', 'react-dom', 'react-addons-shallow-compare']
    },
    output: {
        path: path.resolve(__dirname, './'),
        // publicPath: '/',
        filename: '[name].js'
    },
    module: {
        rules: [{
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: [
                        'react', ['es2015', { "loose": true, "modules": false }], 'stage-0'
                    ],
                    "env": {
                        "production": {
                            "plugins": [
                                "transform-react-constant-elements",
                                "transform-react-inline-elements"
                            ]
                        }
                    },
                    compact: false
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader', 'css-loader', 'postcss-loader'
                ],
                // loader: "style-loader!css-loader!postcss-loader",
                options: {
                    postcss: (wp) => [require("postcss-cssnext")()]
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.js'
        })
    ],
    devServer: {
        historyApiFallback: true,
        contentBase: './',
        port: 3000
    }
};


if (NODE_ENV == 'production') {
    config.plugins.push(
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production")
        }),
        new webpack.optimize.AggressiveSplittingPlugin({
            minSize: Infinity
                // maxSize: 50000
        })
    );
}




export default config;