const webpack = require("webpack");
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin"); // 生成.html文件的插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 把样式提取为单独的css文件 的插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 清除构建目录的插件
module.exports = {
    entry: "./src/main.js", // 打包入口文件
    mode: "development", // 使用开发模式
    devServer: {
        // 本地服务器代理
        contentBase: path.join(__dirname, "./test-build-serve/static"), //指定在哪个目录下找要加载的文件
        compress: true,
        port: 8080, // 配置端口
        hot: true, // 配置热更新
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            ignoreOrder: false,
        }),
        new htmlWebpackPlugin({
            favicon: "./public/favicon.ico",
            filename: "index.html",
            template: "./public/index.html",
        }),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"], // 处理css的loader
            },
            {
                test: /\.(gif|png|jpe?g)$/i,
                use: [
                    {
                        // 用 url-loader 处理图片
                        loader: "url-loader", // url-loader 依赖于  file-loader 要使用url-loader必须安装file-loader
                        options: {
                            name: "[name].[hash:16].[ext]", // 文件名.hash.文件扩展名 默认格式为[hash].[ext]，没有文件名
                            limit: 1024 * 8, // 将小于8KB的图片转换成base64的格式
                            outputPath: "assets/imgs", // 为你的文件配置自定义 output 输出目录 ; 用来处理图片路径问题
                            publicPath: "assets/imgs", // 为你的文件配置自定义 public 发布目录 ; 用来处理图片路径问题
                        },
                    },
                    {
                        // 用 img-loader 压缩图片
                        loader: "img-loader",
                        options: {
                            plugins: [
                                require("imagemin-pngquant")({
                                    //压缩 png 的插件
                                    speed: 4, // 取值范围 1-11  值越大压缩率越小 ，值越小压缩生成的文件越小 默认为4
                                }),
                                require("imagemin-gifsicle")({
                                    // 压缩 gif 插件
                                    optimizationLevel: 1, // 取值范围 1、2、3 默认1   3极限压缩,压缩和图片效果不好，使用默认1就行
                                }),
                                require("imagemin-mozjpeg")({
                                    // 压缩 jpg 插件
                                    quality: 50, // 1-100   值越大压缩率越小 ，值越小压缩生成的文件越小
                                }),
                            ],
                        },
                    },
                ],
            },
        ],
    },
    output: {
        path: path.join(__dirname, "./test-build-serve/static"),
        filename: "app.[hash:16].js",
        publicPath: "/", // 也可以用来处理路径问题，加在所有文件路径前的根路径
    },
};
