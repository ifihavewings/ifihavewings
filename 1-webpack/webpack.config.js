const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
// const jquery = require('./src/jquery')
module.exports = {
  // entry : './src/index.js',  // 单入口
  // entry : ['./src/index.js','./src/base.js'],  // 多入口
  entry : { // 多入口
    // 先找到每个入口，然后从各个入口分别出发，找到依赖的模块，然后生成一个chunk（代码块），最后把chunk写到文件系统中， 生成assets（资源）
    // 每个模块都是一个闭包，所以模块之间的变量不能共享。
    index : './src/index.js',
    base : './src/base.js',
    vendor : './src/common.js', // 公用的模块
  },  
  output : {   // 出口
    path : path.resolve(__dirname, 'dist'), // 输出的文件夹， 只能是绝对路径
    // filename : 'bundle.js', // 打包后的文件名
    // name 是根据 entry名字，单入口文件默认为main,  hash 是根据文件内容算出来的20位的散列值，默认20位,[hash:12]可以指定位数
    filename : '[name].[hash:12].js' // 打包后的文件名
  }, 
  module : {
    rules : [
      {
        test : /\.css$/,  // 解析文件的扩展名
        // css-loader 解析处理 css 文件中的url 路径,把css文件转换成js 的模块
        // style-loader, 把css 文件编程style 标签， 插入到html文件中
        // 多个loader 是有顺序要求的， 从右往左一次处理， 先css-loader，然后在执行 style-loader

        loader : ["style-loader","css-loader"]
      }
    ]
  },
  plugins : [
    // 此插件可以自动产出html文件,并把相关静态资源插入到产出的html
    // plugin 与顺序无关
    new HtmlWebpackPlugin({
      template : './src/index.html', // 以哪个文件为模板产出文件
      filename : 'index.html', //产出的html文件的名字，保存在output.path 下面
      title : '哈哈哈', // 标题
      hash : true, //给引入的文件加上查询字符串，防止被缓存
      chunks : ['vendor','index'], // 在产出的html中引入哪些代码块, 名字跟entry 下的名字对应, 注意引用顺序有影响， 应先引入先执行的代码块
      minify : {
        removeAttributeQuotes : true 
      }
    }),
    // 多入口时，生成两个html
    new HtmlWebpackPlugin({
      template : './src/index.html', // 以哪个文件为模板产出文件
      filename : 'base.html', //产出的html文件的名字，保存在output.path 下面
      title : '哈哈哈', // 标题
      hash : true, //给引入的文件加上查询字符串，防止被缓存
      chunks : ['vendor','base'], // 在产出的html中引入哪些代码块, 名字跟entry 下的名字对应, 注意引用顺序有影响， 应先引入先执行的代码块
      minify : {
        removeAttributeQuotes : true 
      }
    }),
    new CleanWebpackPlugin({path :path.join(__dirname, 'dist')}), // 每次打包先清空dist目录
    // 向模块内部注入变量， 变量的名字是键名，值是键值
    new webpack.ProvidePlugin({
      $ : 'jquery'
    })
  ],
  // 配置静态文件服务器，预览打包后的项目
  devServer : {
    contentBase : './dist', // 预览的根目录
    host : 'localhost', //主机
    port : 1234, //端口
    compress : true, // 服务器返回给浏览器的时候， 是否启动gzip压缩
  }
}