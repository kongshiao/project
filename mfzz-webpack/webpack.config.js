var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var glob = require('glob'); //这里的glob是nodejs的glob模块，是用来读取webpack入口目录文件的

var rootpath = path.join(__dirname, 'dist')//项目根目录拼接上dist;

//获取Html模版的方法
function getEntry(globPath) {
  var entries = {},
    basename, tmp, pathname;

  glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry));
    tmp = entry.split('/').splice(-3);
    pathname = tmp.splice(0, 1) + '/' + basename; // 正确输出js和html的路径
    entries[pathname] = entry;
  });
  // console.log(entries);

  return entries;
}


var pages = getEntry('./src/view/*.html');

  module.exports = {
    entry: { //配置入口文件，有几个写几个
      // a: './src/js/entry/a.js',
      // b: './src/js/entry/b.js',
    },
    output: { 
      path:rootpath, //输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
      publicPath: '/zjsf/static/',       //模板、样式、脚本、图片等资源对应的server上的路径
      filename: 'js/[name]-1.0.0.js',     //每个页面对应的主js的生成配置
      chunkFilename: 'js/[id].chunk.js'   //chunk生成的配置
    },
   module: {
     rules: [
     // { //如果不分离出css
     //     test: /\.css$/,
     //     use: [
     //       'style-loader',
     //       'css-loader'
     //     ]
     //   },
       {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader",
        })
       },
       {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          }
        },
         {
            test: /\.(png|jpg|gif|ico)$/,
            use: [
              {
                loader: 'file-loader?name=img/[name].[hash].[ext]',
              }
            ]                           
          },
          {
            test: /\.html$/,
            use: [
              {
                loader: 'html-withimg-loader',
              }
            ]
          },
     ]
   },
   plugins:[
    new webpack.ProvidePlugin({
      $:"jquery",
      jQuery:"jquery",
      "window.jQuery":"jquery"
    }),
    new ExtractTextPlugin('style/[name]-1.0.0.css'), //单独使用link标签加载css并设置路径，相对于output配置中的publickPath
  ]
  };


for (var pathname in pages) {
  // 配置生成的html文件，定义路径等
  var arr = pathname.split("/")
  var chunk = arr[1];

  // 根据模版设置入口
  module.exports.entry[chunk] = './src/js/entry/'+chunk+'.js';

  // HtmlWebpackPlugin配置
  var htmlconf = {
    filename: './view/'+chunk + '.html',
    template: 'html-withimg-loader!'+pages[pathname], // 模板路径
    inject: 'body', //js插入的位置，true/'head'/'body'/false
    chunks: [chunk], // 每个html引用的js模块
    // favicon: path.resolve(__dirname, 'src/ico/ico1.ico')
  };
  // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
  module.exports.plugins.push(new HtmlWebpackPlugin(htmlconf));
}