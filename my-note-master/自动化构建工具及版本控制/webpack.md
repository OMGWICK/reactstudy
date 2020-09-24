## 初始配置

```JavaScript
const path = require('path');
module.exports = {
  //入口
  entry: './src/index.ts',
  /*多个入口,会打包成多个文件
    app: './src/index.ts',
    hello: './src/hello.ts',
  */
  //出口
  output: {
    path: path.resolve(__dirname, 'dist'),
    //会根据入口名字打包生成
    filename: '[name].js', //打包后输出文件的文件名
  },
  //模块
  module: {
    rules: [
      {
        test: /\.ts/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  //解决依赖
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  //模式
  mode: 'development',
};

```

## 运行服务器

```JavaScript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: {
    app: './src/index.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js', //打包后输出文件的文件名
  },
  module: {
    rules: [
      {
        test: /\.ts/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.less/,
        use: 'less-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.less'],
  },
  plugins: [
    //根据项目提供html模板
    new HtmlWebpackPlugin({ template: './public/index.html' })],
  mode: 'production',
  devServer: {
    contentBase: './dist', // 本地服务器所加载文件的目录
    port: '8088', // 设置端口号为8088
    inline: true, // 文件修改后实时刷新
    historyApiFallback: true, //不跳转
  },
};

```

