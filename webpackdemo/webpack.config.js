/// <binding BeforeBuild='Run - Production' />
'use strict';

const AssetsPlugin = require('assets-webpack-plugin'); // 将每个资源文件的原生filename和chunkhashname一一对应起来的插件
const CleanPlugin = require('clean-webpack-plugin'); // 清空目录的插件
const path = require('path'); // 顾名思义，路径相关操作的插件
const webpack = require('webpack'); // 主角，webpack
const pkg = require('./package'); // package.json
var WebpackNotifierPlugin = require('webpack-notifier');

const SCRIPTS_ROOT = 'Content/Scripts/';
const SOURCE_DIRECTORY = 'app'; // 业务文件名
const BUILD_DIRECTORY = 'build'; // 构建目录名
const BUILD_DROP_PATH = path.join(__dirname, SCRIPTS_ROOT, BUILD_DIRECTORY);
//const BUILD_DROP_PATH = path.resolve(__dirname, BUILD_DIRECTORY); // 构建全路径
const WEB_ROOT = path.join(__dirname, SCRIPTS_ROOT); // 当前上下文


const CHUNK_FILE_NAME = '[name].[chunkhash].js';

var readFile = function (path) {
    var fs = require('fs');
    var files = fs.readdirSync('./' + path);
    var jsFiles = files.filter((f) => {
        return f.endsWith('.js');
    });

    var ret = {};
    jsFiles.forEach(function (item) {
        var temp = item.substring(item, item.indexOf(".js"));
        ret[temp] = "./" + SOURCE_DIRECTORY + "/" + item;

    });
    return ret;
};


var webpackEntry = readFile(path.join(SCRIPTS_ROOT, SOURCE_DIRECTORY));

console.log(webpackEntry);

const config = {

    context: WEB_ROOT, // 声明上下文

    // entry: {
    //   wp:[ './app/webpack.js'] // 独立的业务文件

    // }, // 入口文件定义
    entry: webpackEntry,

    module: {
        loaders: [
        {
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            },
            exclude: /node_modules/
        },
        {
            test: /(\.css$)/,
            loaders: ['style-loader', 'css-loader', 'postcss-loader']
        },
       {
           test: /\.(png|woff|woff2|eot|ttf|svg)$/,
           loader: 'url-loader?limit=100000'
       }
        ]
    }, // 使用babel编译js


    output: {
        path: BUILD_DROP_PATH,
        filename: CHUNK_FILE_NAME,
        chunkFilename: CHUNK_FILE_NAME
    }, // 输出

    plugins: [
    new AssetsPlugin({
        filename: 'webpack.assets.json',
        path: BUILD_DROP_PATH,
        prettyPrint: true
    }), // 将filename 和 filename.chunkhash对应起来

    new CleanPlugin(BUILD_DROP_PATH), // 构建前先清空文件夹

    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        output: {
            comments: false
        }
    }), // 压缩混淆

    new WebpackNotifierPlugin(),
    ],
};

module.exports = config;