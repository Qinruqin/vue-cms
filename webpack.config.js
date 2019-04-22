const path = require('path');
//启用热更新，第2步
const webpack = require('webpack');

const VueLoaderPlugin = require('vue-loader/lib/plugin');
//导入在内存中生成的HTML页面的插件
// 插件的作用：
// 1.自动在内存中生成页面
// 2.自动把打包好的bundle.js追加到页面中
const htmlWebpackPlugin = require('html-webpack-plugin');

// 这个配置文件，其实就是一个js文件，通过Node的模块操作，向外暴露了一个配置对象
module.exports = {
    mode:'development',
  	entry:path.join(__dirname,'./src/main.js'), //入口，表示webpack要打包哪个文件
  	devServer: {
      // contentBase: 'src', //指定托管的目录
      open:true,  //自动打开浏览器
      compress: true,
      port: 3000, //设置端口号
      hot: true   //启用热更新，第1步
    },
    plugins:[ //配置插件的节点
      new webpack.HotModuleReplacementPlugin(), //new一个热更新的模块对象，启动热更新第3步
      new htmlWebpackPlugin({ //创建一个在内存中生成的HTML页面插件
        template:path.join(__dirname,'./src/index.html'),//指定模板页面，将来会根据指定的路径，生成内存中的页面
        filename:"index.html"
      }),
      new VueLoaderPlugin({})
    ],
    module:{
      rules:[ //所有第三方文件的匹配和处理的规则，从右至左调用
        {test:/\.css$/,use:['style-loader','css-loader']}, //配置处理.css文件
        {test:/\.less$/,use:['style-loader','css-loader','less-loader']},//配置处理.less文件
        {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},//配置处理.scss文件
        {test:/\.(jpg|png|gif|hmp|jpeg)$/,use:'url-loader?limit=118297&name=[hash:8]-[name].[ext]'}//配置处理图片路径文件
        //limit值给定的值，是图片的大小，单位是byte，如果引用的图片，大于或等于给定的值，则不会转为base64格式的字符串，否则转为base64字符串
        ,{test:/\.(ttf|eot|svg|woff|woff2)$/,use:'url-loader'} //处理字体文件
        ,{test:/\.js$/,use:'babel-loader',exclude:/node_modules/} //处理字体文件
        ,{test:/\.vue$/,use:'vue-loader'} //处理.vue文件
      ]
    },
  
    output:{ //输出文件相关配置
    	path:path.resolve(__dirname,'dist'),
    	filename:'bundle.js'
    }
    
}

// 当我们输入webpack命令时，webpack做了以下几步：
// 1.首先，webpack发现，并没有给它指定入口和出口
// 2.webpack就会去项目的根目录中，查找一个叫做‘webpack.config.js’的配置文件
// 3.找到配置文件后，webpack会去解析这个配置文件，当解析执行完配置文件后，就得到配置文件中，导出配置对象
// 4.当webpack拿到配置对象后，就拿到其中指定的入口和出口，打包构建