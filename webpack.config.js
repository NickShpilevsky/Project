const webpack = require('webpack');
const path = require('path');
const copyWebpackPlugin = require('copy-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';
const isDev = NODE_ENV === 'development';   //определяет, с каким окружением работать (production или development)

module.exports = {
    entry: './dev/Main/index.js', //точка входа
    output: { //куда собирать проект
        path: path.resolve(__dirname, "site"), //выстравает путь к папке вне зависимости от окружения
                                               //dirname указывает абсолютный путь к текущему файлу
        filename: "bundle.js",
    },
    mode: NODE_ENV,   //было 'development',  //если production, то файл минимизируется и весит намного меньше
    devtool: isDev && "eval-source-map",  //тип показа ошибок (файл и строка)
                                          //должно срабатывать только при develelop сборке,
                                          //поэтому, добавлено isDev &&
    module: {   //module описывает процессы для импорта
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new copyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'dev', 'static'),
                to: path.resolve(__dirname, 'site'),   //папка site не создается, потому что webpack знает,
            }                                          //что это девелоперская версия, и не создает лишних файлов, но все подключает
        ]),
        new webpack.DefinePlugin({
            '__DEV__': JSON.stringify(isDev),   //данные только для develop версии
        }),
    ]
};