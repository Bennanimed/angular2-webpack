'use strict';

const path    = require('path');
const webpack = require('webpack');

module.exports = {
    watch   : true,
    output  : {
        path            : __dirname + '/build',
        filename        : './build.[name].js'
    },
    devtool : 'source-map',
    module  : {
        loaders : [
            {
                test    : /(\.ts|\.js)$/,
                loader  : 'awesome-typescript-loader',
                query   : {
                    presets : [ 'es2015' ]
                },
                exclude : path.resolve(__dirname, 'node_modules'),
                include : [
                    path.resolve(__dirname, 'build'),
                    path.resolve(__dirname, 'app')
                ]
            }
        ]
    },
    resolve : {
        extensions : [ '', '.ts', '.tsx', '.js', '.jsx' ]
    },
    plugins : [
        new webpack.ProvidePlugin({
            $               : 'jquery',
            jQuery          : 'jquery',
            'window.jQuery' : 'jquery',
            Hammer          : 'hammerjs/hammer'
        })
    ]
};
