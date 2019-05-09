'use strict';

const webpack = require('webpack');
const path = require('path');

const bundleFolder = "./TestsES6/wwwroot/assets/";

module.exports = {
    entry: [
        'babel-polyfill',
        "./TestsES6/Scripts/TestController.js",
        "./TestsES6/Scripts/Logic.js",
        "./TestsES6/Scripts/Question.js",
        "./TestsES6/Scripts/RadioQuestion.js",
        "./TestsES6/Scripts/CheckboxQuestion.js"
    ],
    devtool: "source-map",
    output: {
        filename: "bundle.js",
        publicPath: './TestsES6/wwwroot/assets/',
        path: path.resolve(__dirname, bundleFolder)
    },
    module: {
        loaders: [
            {
                exclude: /(node_modules)/,
                loader: 'babel-loader?presets[]=es2015,presets[]=stage-3'              
            }
        ]
    },
    plugins: [
    ]
};