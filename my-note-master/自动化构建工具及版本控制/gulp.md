## 配置文件gulpfile.js

```javascript
function defaultTask(cb) {
  // place code for your default task here
  cb();
}

//为default  命令行输入不需要参数如gulp
exports.default = defaultTask;
//参数为build gulp build
exports.build = defaultTask;
```

## 转译

1. 如果使用typescript 重命名为gulpfile.ts 并安装ts-node
2. 如果使用babel 重命名为gulpfile.babel.js 并安装 @babel/register

## 模块配置gulp

1. 将文件夹命名为gulpfile.js 内部有index.js文件
2. 可以导入任务

## 创建任务

每个gulp函数都是一个异步任务,此函数可以接受一个callback作为参数的函数

### 导出任务

+ 公开任务 从gulpfile中被导出,可以通过gulp命令调用
+ 私有任务 被设计在内部使用,通常作为series()或者parallel()的组成部分

```JavaScript
const { series } = require('gulp');

// `clean` 函数并未被导出（export），因此被认为是私有任务（private task）。
// 它仍然可以被用在 `series()` 组合中。
function clean(cb) {
  // body omitted
  cb();
}

// `build` 函数被导出（export）了，因此它是一个公开任务（public task），并且可以被 `gulp` 命令直接调用。
// 它也仍然可以被用在 `series()` 组合中。
function build(cb) {
  // body omitted
  cb();
}

exports.build = build;
exports.default = series(clean, build);
```

## 组合任务

## series()

任务按照顺序执行

```JavaScript
const { series } = require('gulp');

function transpile(cb) {
  // body omitted
  cb();
}

function bundle(cb) {
  // body omitted
  cb();
}

exports.build = series(transpile, bundle);
```



## parallel()

任务并发执行

```javascript
const { parallel } = require('gulp');

function javascript(cb) {
  // body omitted
  cb();
}

function css(cb) {
  // body omitted
  cb();
}

exports.build = parallel(javascript, css);
```

## 任意嵌套

```javascript
const { series, parallel } = require('gulp');

function clean(cb) {
  // body omitted
  cb();
}

function cssTranspile(cb) {
  // body omitted
  cb();
}

function cssMinify(cb) {
  // body omitted
  cb();
}

function jsTranspile(cb) {
  // body omitted
  cb();
}

function jsBundle(cb) {
  // body omitted
  cb();
}

function jsMinify(cb) {
  // body omitted
  cb();
}

function publish(cb) {
  // body omitted
  cb();
}

exports.build = series(
  clean,
  parallel(
    cssTranspile,
    series(jsTranspile, jsBundle)
  ),
  parallel(cssMinify, jsMinify),
  publish
);
```

## 异步执行

### 返回promise

```JavaScript
function promiseTask() {
  return Promise.resolve('the value is ignored');
}

exports.default = promiseTask;
```

### 执行回调

```JavaScript
function promiseTask(cb) {
  cb()
}

exports.default = promiseTask;
```

### 使用 async/await

```JavaScript
const fs = require('fs');

async function asyncAwaitTask() {
  const { version } = fs.readFileSync('package.json');
  console.log(version);
  await Promise.resolve('some result');
}

exports.default = asyncAwaitTask;
```

## 处理文件

### src()

读取文件

### dest()

生成文件

```JavaScript
import { series, parallel, src, dest } from 'gulp';
const typescript = require('gulp-typescript');

function js() {
  return src('src/*.js').pipe(dest('dist/'));
}

function ts() {
  return src('src/*.ts').pipe(typescript()).pipe(dest('dist/'));
}

exports.build = series(parallel(js, ts));

```

## glob详解

```bash
#能够匹配index.js,但是不能匹配目录下的如 test/*.js
'*.js'
#匹配任意目录下的文件scripts/ 目录下。它将匹配类似 scripts/index.js、scripts/nested/index.js 和 scripts/nested/twice/index.js 的文件。
'/scripts/**/*.js
```

