# 前端每日学习

## 第一天

### [html] 第1天 页面导入样式时，使用link和@import有什么区别？

资料: 1. link是html标签 @import是css中的标签. 2. link引入的样式和页面同时加载 @import引入的样式等页面加载完成再加载. 3. link没有兼容性问题 @import不支持ie5

### [css] 第1天 圣杯布局和双飞翼布局的理解和区别，并用代码实现

```html
圣杯布局
<html lang="en">

<head>
  <style>
    * {
      margin: 0;
      padding: 0px;
    }

    header,
    footer {
      width: 100%;
      height: 100px;
      background-color: aliceblue;
    }

    .main>div {
      height: 300px;
    }

    .left,
    .right {
      width: 200px;
    }

    .left,
    .right,
    .middle {
      float: left;
      position: relative;
    }

    .main {
      padding: 0 200px 0 200px;
      overflow: hidden;
    }

    .middle {
      width: 100%;
      background-color: beige;
    }

    .left {
      margin-left: -100%;
      left: -200px;
      background-color: rebeccapurple;
    }

    .right {
      margin-left: -200px;
      right: -200px;
      background-color: red;
    }
  </style>
</head>

<body>
  <header></header>
  <div class="main">
    <div class="middle">middle</div>
    <div class="left">left</div>
    <div class="right">right</div>
  </div>

  <footer></footer>
</body>

</html>
圣杯布局
采用内边距控制间距
双飞翼同理
采用子元素+外边距控制间距
```

###  [js] 第1天 用递归算法实现，数组长度为5且元素的随机数在2-32间不重复的值

```javascript
let array=new Array(5);
let obj=new Object();
function num(){
    let rand=Math.round(Math.random()*30)+2;
    obj[rand]=rand;
    if(Object.keys(obj).length<5){
        num();
    }else{
        array=Object.keys(obj);
    }
};
num();
//或者array.includes判断是否包括
let array=new Array(5);
let count=0;
function num(count){
    let rand=Math.round(Math.random()*30)+2;
    if(count===5) return;
    if(!array.includes(rand)){
        array[count]=rand;
        count++;
        num(count);
    }else{
        num(count);
    }
};
num(count);
```

## 第二天

### [html] 第2天 html的元素有哪些（包含H5）？

我的答案: 

1.块级元素 br div p header footer main 

2.行内元素 html body head span style i 

资料

1.块级元素

h1-h6 div p ul/ol li table form tr header footer section article nav

2.行内元素

span label input button br a td canvas video

### [css] 第2天 CSS3有哪些新增的特性？

资料:  

边框圆角 border-radius  ; 盒子阴影 box-shadow ; 文字阴影 text-shadow ; 2d3d变换 transform ; 过渡动画 transition ; 自定义动画 animate ; 图片边框 border-image ;

### [js] 第2天 写一个方法去掉字符串中的空格

```javascript
let str=" a bc ";
let newStr="";
function space(str){
  for(let i=0;i<str.length;i++){
    if(!(str[i]==false)){
       newStr+=str[i];
    }
  }
}
space(str);

let str = ' 1 2 3445 6    ';
console.log(str.split(' ').join(''))

```

## 第三天

### [html] 第3天 HTML全局属性(global attribute)有哪些（包含H5）？

我的答案: class id  style title

### [css] 第3天 在页面上隐藏元素的方法有哪些？

我的答案: display:none; display:hidden; 

资料:  visibility: hidden;  display:none; opacity:0;          width:0; height:0; overflow:hidden;  margin-left:-100%;

### [js] 第3天 去除字符串中最后一个指定的字符

```javascript
var str="adcert	adcert";
function del(delStr){
  var newStr=str.split("").reverse();
  for(var i=0;i<newStr.length;i++){
    if(newStr[i]===delStr){
      newStr.splice(i,1);
      str=newStr.reverse().join("");
      console.log(str);
      return;
    }
  }
};
del("a");

```

## 第四天

### [html] 第4天 HTML5的文件离线储存怎么使用，工作原理是什么？

我的答案: localstorage 存储

### [css] 第4天 CSS选择器有哪些？哪些属性可以继承？

我的答案: id class 标签 属性 后代 兄弟 伪类

### [js] 第4天 写一个方法把下划线命名转成大驼峰命名

```JavaScript
function trim(str){
  var array=str.split("");
  while(!(str.indexOf===-1)){
    var num=str.indexOf("_")+1;
    if(num===0) return str;
    array.splice(num,1,array[num].toUpperCase());
    array.splice(num-1,1);
    str=array.join("");
  }
}
```

## 第五天

### [html] 第5天 简述超链接target属性的取值和作用

我的答案: target     _self当前页面打开默认   _blank 新页面打开 

### [css] 第5天 CSS3新增伪类有哪些并简要描述

我的答案: before after 

资料: :first-child :last-child :nth-child()  :root :empty 

### [js] 第5天 写一个把字符串大小写切换的方法

```javascript
var str = "aVcDdaAB";
function change(str){
  var newStr="";
  for(var i=0;i<str.length;i++){
    if(str[i].toUpperCase()===str[i]){
      newStr+=str[i].toLowerCase();
    }else{
      newStr+=str[i].toUpperCase();
    }
  };
  return newStr;
};
change(str);

```

## 第六天

### [html] 第6天 label都有哪些作用？并举相应的例子说明

资料: 用来关联表单控件如

```html
<label for="sex">性别</label>
<input id="sex" type="checkbox">
```

### [css] 第6天 用css创建一个三角形，并简述原理

```CSS
div{
  width:0px;
  height:0px;
  border:50px transparent solid;
  border-bottom:50px solid Red;
}
```

### [js] 第6天 写一个去除制表符和换行符的方法

```javascript
var remove=str=>str.replace(/\n|\t/g,"");
remove("sadad\n\t");
```

## 第七天

### [html] 第7天 iframe框架都有哪些优缺点？

资料: 优点

- 重载页面时不需要重载整个页面，只需要重载页面中的一个框架页
- 技术易于掌握，使用方便，可主要应用于不需搜索引擎来搜索的页面
- 方便制作导航栏

缺点

- 会产生很多页面，不容易管理
  *不容易打印
- 对浏览器搜索引擎不友好
- 多框架的页面会增加服务器的http请求

### [css] 第7天 简述你对BFC规范的理解

资料: BFC全称块级格式化上下文 是页面上的一个独立容器,容器里面的子元素不会影响到外面的元素     

<span style="color:Red">形成条件是float不为none display为inline-block inline-flex table-cell table-caption  flex  overflow的值不为visible</span> 

应用场景 解决文字环绕在float四周的问题

### [js] 第7天 统计某一字符或字符串在另一个字符串中出现的次数

```JavaScript
var str="ab";
var string="ab cd ab de ab ce ab po ab de ab mvbams";
function getStrCount(str,string){
  var count=0;
  var array=string.split("");
  while(string.indexOf(str)!==-1){
    array.splice(string.indexOf(str),str.length);
    string=array.join("");
    count++;
  }
  return count;
}
getStrCount(str,string);


var count = string.split(str).length - 1

var count=(str,string)=> string.match(new RegExp(str,"g")).length;
count(str,string)


function getStrCount(strs, str) {
  let count = 0;
  for (let i = 0; i < strs.length; i++) {
    if (strs.slice(i, str.length + i) === str) {
      count++;
    }
  }
  return count;
}
```

## 第八天

### [html] 第8天 简述下html5的离线储存原理，同时说明如何使用？

资料:  HTML5的离线存储是基于一个新建的.appcache文件的缓存机制(不是存储技术)，通过这个文件上的解析清单离线存储资源，这些资源就会像cookie一样被存储了下来。之后当网络在处于离线状态下时，浏览器会通过被离线存储的数据进行页面展示。 

### [css] 第8天 清除浮动的方式有哪些及优缺点？

我的答案: float:clear; 

资料: clear:both; 触发BFC 让内层的不影响外层 

### [js] 第8天 写一个加密字符串的方法

```javascript
var str="abcdqwa";
var newStr="";
function encey(str) {
  return str
    .split('')
    .map((v) => {
      return String.fromCharCode(v.charCodeAt(0) + 20);
    })
    .join('');
}
function decry(str) {
  return str
    .split('')
    .map((v) => {
      return String.fromCharCode(v.charCodeAt(0) - 20);
    })
    .join('');
}

```

## 第九天

### [html] 第9天 浏览器内多个标签页之间的通信方式有哪些？

我的答案: cookie localstorage

### [css] 第9天 简述下你理解的优雅降级和渐进增强

优雅降级

先不考虑兼容，优先最新版本浏览器效果，之后再逐渐兼容低版本浏览器。

渐进增强

考虑兼容，以较低（多）浏览器效果为主，之后再逐渐增加对新版本浏览器的支持，以内容为主。也是多数公司所采用的方法。

### [js] 第9天 写一个判断数据类型的方法

```JavaScript
var obj={age:18},str="hello",num=18,ary=[0,1,2];
var checkType=v=> Object.prototype.toString.call(v).replace(/object |\[|\]/g,"");
```

## 第十天

### [html] 第10天 viewport常见设置都有哪些？

资料:  `viewport` 就是视区窗口，也就是浏览器中显示网页的部分。PC 端上基本等于设备显示区域，但在移动端上 `viewport` 会超出设备的显示区域（即会有横向滚动条出现）。
设备默认的 `viewport` 在 980 - 1024 之间。 

### [css] 第10天 对比下px、em、rem有什么不同？

资料: 

PX

像素，相对长度单位，px 是相对显示器屏幕分辨率而言的。

EM

相对长度单位，em 相对于当前对象内文本的字体尺寸。通常 `1em = 16px`。

REM

root em，CSS3 新增的一个相对单位。
使用 rem 为元素设定字体大小时，仍然是相对大小，但相对的只是HTML根元素。既可以做到只修改根元素就成比例地调整所有字体大小，又可以避免字体大小逐层复合的连锁反应。

### [js] 第10天 简要描述下什么是回调函数并写一个例子出来

```JavaScript
//将一个函数作为参数传递给另一个函数

function bar(){
  //.....
};

baz(bar);
```

## 第11天

### [html] 第11天 你对标签语义化的理解是什么？

我的答案: 能准确表达当前标签的作用.

### [css] 第11天 css常用的布局方式有哪些？

资料: 双飞翼布局 圣杯布局 [全部资料]( https://juejin.im/post/599970f4518825243a78b9d5 ) 

### [js] 第11天 简要描述下JS有哪些内置的对象

```JavaScript
//我的答案
Array
Number
String
Null
Boolean
Object
Window
Math
```

资料: 

[JavaScript标准内置对象]( https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects )

## 第12天

### [html] 第12天 常见的浏览器内核都有哪些？并介绍下你对内核的理解

我的答案: Safari

资料: webkit tridengt(ie) gecko(firfox) 

### [css] 第12天 说说你对css盒子模型的理解

我的答案: margin border padding 从内到外 

### [js] 第12天 写一个获取当前url查询字符串中的参数的方法

```JavaScript
let str=window.location.search.replace("?","");
function getParams(str){
  let params={};
  let ary = str.split("&");
  ary.forEach(e=>{
    let results=e.split("=");
    params[results[0]]=results[1];
  });
  return params;
}

```

### [软技能] 第12天 网页应用从服务器主动推送到客户端有那些方式？

资料: websocket

轮询 客户端每隔一段时间发出一个询问了解服务器有没有新的信息,典型场景是聊天室

## 第13天

### [html] 第13天 html5中的form怎么关闭自动完成？

我的答案: autocomplete="off"

### [css] 第13天 ::before和:after中单冒号和双冒号的区别是什么，这两个伪元素有什么作用？

资料: 伪类 :hover   伪元素::after

### [js] 第13天 说说你对javascript的作用域的理解

我的答案: var 只有函数作用域 声明的变量只在函数作用域内生效  let const有块级作用域,比如for 等带有大括号的,声明变量只在作用域内有效 

### [软技能] 第13天 http都有哪些状态码？

我的答案:  完成200 没有404 拒绝访问403

资料: 200成功 301重定向 400 服务器不理解请求语法 403 服务器拒绝请求  404服务器找不到请求资源 500 服务器内部错误

 200成功
4xx前端问题
5xx后端问题 

## 第14天

### [js] 第14天 什么是闭包？优缺点分别是什么？

```JavaScript
//访问另一个函数作用域内的变量
function bar(){
  var test=1;
 function baz(){
   alert(test)
 }
  baz();
}
bar();
```

## 第15天

### [js] 第15天 写一个数组去重的方法（支持多维数组）

```JavaScript
var ary=[1,1,2,2,3,['a','a','c',['q','q']]];
function foo(ary) {
  const newAry = [];
  for (let i = 0; i < ary.length; i++) {
    if (Array.isArray(ary[i])) {
      newAry.push(...foo(ary[i]));
    } else {
      newAry.push(ary[i]);
    }
  }
  return newAry;
}

//ary.flat()方法展平所有数组   1,1,2,2,3,a,a,c,q,q
```

## 第16天

### [html] 第16天 元素的alt和title有什么区别？

我的答案: alt是在加载不出来显示的 title移动到目标就显示

### [js] 第16天 返回到顶部的方法有哪些？把其中一个方法出来

```JavaScript
window.scrollTo(0,0);
document.documentElement.scrollTop=0;

```

## 第17天

### [js] 第17天 typeof('abc')和typeof 'abc'都是string, 那么typeof是操作符还是函数？

```JavaScript
typeof是操作符不是函数
typeof("abc")
typeof"abc"
都是正确的
typeof(typeof)会报错所以不是函数
       
```

## 第18天

### [html] 第18天 怎样在页面上实现一个圆形的可点击区域？

```html
border-radius:50%;
```

## 第19天

### [js] 第19天 "attribute"和"property"有什么不同？

资料: 

- property是DOM中的属性，是JavaScript里的对象
- attribute是HTML标签上的特性，它的值只能够是字符串

## 第22天

### [js] 第22天 你对new操作符的理解是什么？手动实现一个new方法

```JavaScript
function _new(Fn,...args){
  let obj={};
  obj.__proto__=Fn.prototype;
  Fn.apply(obj,args)
  return obj;
}
```

## 精选

### [js] 第29天 写一个获取数组的最大值、最小值的方法

```JavaScript
var ary=[1,23,123,11,34];
Math.max(...ary);
Math.min(...ary);
```



























