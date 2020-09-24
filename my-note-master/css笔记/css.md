[link](https://juejin.im/post/5cc59e41e51d456e62545b66)

# css day1

## 标准盒模型

标准盒模型是由margin border padding content构成

### 如何获取宽高

1. 宽高由getComputedStyle(element).widht获取

### 根据盒模型解释边距重叠

1. 父子边距重叠,取较大值
2. 兄弟边距重叠,取较大值
3. 空元素边距重叠,如一个div为空,同时有margin-top,margin-bottom 取其中较大的

计算规则:边距都为正或者负数,取两者绝对值大的,一正一负取相加和

# css day2

## box-sizing属性

1. content-box为标准盒子模型,宽度为content宽度
2. border-box为ie盒子模型,宽度为content border padding

## 解释BFC

中文名块格式上下文,块内元素不会对块外造成影响,以下达成任意一种可形成BFC

1. overflow不为visible
2. display为inline-block
3. 定位为绝对定位的 position:absolute 或者fixed
4. float不为none的
5. 根元素html

## css有哪些选择器,哪些属性能继承,优先级如何

有如下选择器

1. id选择器 #a
2. class选择器 .a
3. 属性选择器 a[href='www.a.com']
4. 后代选择器 #a .b
5. 子选择器 #a > .b
6. 兄弟选择器 .a + .b
7. 伪类选择器 a:hover a:nth-child

## css新加伪类有哪些

1. before
2. after
3. disabled
4. nth-child

## 如何居中div？如何居中一个浮动元素？如何让绝对定位的div居中

1. 居中div

   ```vue
   <template>
     <div>
     </div>
   </template>
   <style>
     div{
      /* 
       margin:0 auto;*/
       /*display:flex;
       justify-content:center*/
       /*position:absolute;
       left:50%;
       margin-left:-wdith*50%*/
     }
   </style>
   ```

2. 居中浮动元素

   ```vue
   <template>
     <div>
     </div>
   </template>
   <style>
     div{
       /*已知宽高*/
       float:left;
       left:50%;
       widht:300px;
       height:300px;
       margin-left:-150px;
       /*未知宽高*/
       left:50%
        transform:translateX(-50%)
     }
   </style>
   ```

   

## display的值有哪些

1. none 
2. hidden 
3. block 块元素
4. inline 行内元素
5. inline-block 既有块的性质且不换行
6. flex 弹性盒布局

## position有哪些值

1. relative 相对定位
2. absolute 绝对定位
3. fixed 跟随屏幕定位

## css3的新特性

1. transition:border 1s ease-in
2. animation: anima 1s  infinite
3. border-radius

## 解释flexbox,并说出他的应用场景

1. flexbox是弹性盒布局,display设置为flex时候,会激活,会根据宽度或者高度自动分配内部盒子的宽度高度,达到自适应的目的
2. 自适应,居中等

## 用css创建一个三角形

```css
div{
          width: 0;
        height: 0;
        border: 40px solid transparent;
        border-bottom: 40px solid #ff0000;
}
```

# css-day3

## 常见的兼容性问题

每个浏览器的默认样式不同,引入**css reset**重置默认样式

##  CSS里的 visibility 属性有个 collapse 属性值是干吗用的？在不同浏览器下以后什么区别？

## display:none 与 visibility:hidden 的区别是什么？

1. display:none是隐藏,从文档流中消失,布局会改变
2. visibility:hidden也是隐藏,但是布局不会改变

##  position 跟 display、overflow、float 这些特性相互叠加后会怎么样？

1. postion:absolute fixed优先级最高,其次float

## 为什么会出现浮动? 什么时候需要清除浮动？清除浮动有哪些方式？优缺点是什么？你认为最好的是哪一种？为什么？

1. float不为none的时候出现浮动
2. 当盒子内只有一个浮动元素,高度塌陷的时候
3. 方法有
   1. 父盒子设置overflow:hidden形成BFC
   2. 再创建一个和浮动元素相同宽高的盒子
   3. 定义空div,设置clear:both
   4. 定义该浮动div的:after或者before 设置clear:both

## 上下 margin 重合的问题

1. margin重叠,的时候当两个盒子的外边距都为正或者负的时候,取绝对值大的,一个为正一个为负取和

## 设置元素浮动后，该元素的 display 值是多少？

display:block

## 什么是CSS 预处理器 / 后处理器？大家为什么要使用他们？

1. 预先处理,有less,增强css代码复用性,
2. 可以嵌套,混合,计算,声明变量

##  CSS优化、提高性能的方法有哪些？

1. 表面后代选择器
2. 避免过度越苏
3. 避免重复
4. 语义化css名字
5. 移除空的css
6. 能不用浮动则不用

## 在网页中的应该使用奇数还是偶数的字体？为什么呢？

偶数,因为大部分字体标准点阵是偶数,奇数占位相同,只是小了1px从而略显稀疏

## margin 和 padding 分别适合什么场景使用？

1. 例如当前背景色为白色,盒子为红色,想盒子宽度不变,而中间间隔为背景色,选择margin
2. padding是因为字与边框贴合不美观,所以采用margin

## 元素竖向的百分比设定是相对于容器的高度吗？

1. 父容器的高度
2. 一些特别如,padding-top,padding-bottom,margin-top,margin-bottom,依据的父容器的宽度

## 什么是响应式设计？响应式设计的基本原理是什么？

1. 根据设备的不同,自适应合式的界面,
2. 根据媒体查询对不同的屏幕尺寸做适配

## ::before 和 :after中双冒号和单冒号有什么区别？解释一下这2个伪元素的作用

::before相当于一个元素,:表示伪元素,::表示伪类,

## 你对line-height是如何理解的？

行高,一般用于文本的垂直居中

## 怎么让Chrome支持小于12px 的文字？

```css
a{
  font-size:12px;
  transform:scale(80%);
}
```

## 如果需要手动写动画，你认为最小时间间隔是多久，为什么？

 多数显示器默认频率是60Hz，即1秒刷新60次，所以理论上最小间隔为1/60＊1000ms ＝ 16.7ms。 

##  li 与 li 之间有看不见的空白间隔是什么原因引起的？有什么解决办法？

存在padding,清空padding

##  有一个高度自适应的div，里面有两个div，一个高度100px，希望另一个填满剩下的高度

```css
div.father{
  display:flex;
  flex-direction:column;
  width:100%;
  height:100%;
}
div.height{
  height:100px;
}
div.child{
  flex:1
}

div.father{
  width:100%;
  height:100%;
  overflow:hidden;
}
div.height{
  height:100px;
}
div.child{
  height:100%;
}
```

# css day4

## style 标签写在 body 后与 body前有什么区别？

1. html是自上而下解析的,放在body前面会先下载css,再绘制dom

## CSS属性overflow属性定义溢出元素内容区的内容会如何处理?

1. 隐藏

## CSS 伪类和伪元素的区别？

1. 伪元素相当于一个元素
2. 伪类是:focus :hover 是为了弥补原来css功能不足

## CSS 中可以通过哪些属性定义，使得一个 DOM 元素不显示在浏览器可视范围内？　　

1. visibility:hidden
2. display:none
3. width:0;heighy:0

## 行内元素和块级元素的具体区别是什么？行内元素的 padding 和 margin 可设置吗？

1. 块级独占一行,行内不换行,块级可设置宽高
2. margin top/bottom不可设置 padding top/bottom不可设置

## 什么是外边距重叠？重叠的结果是什么？

1. 两个盒子的外边距都为正或者负的时候,外边距为绝对值大的元素,
2. 一个为正一个为负数,取两者之间的和

## rgba() 和 opacity 的透明效果有什么不同？

1. rgba作用于颜色不会继承
2. opacity会继承

## px 和 em ,rem,vw的区别。

1. px是像素,固定的
2. em基于父级元素字体大小
3. rem基于根元素的字体大小
4. vw视口基于屏幕宽度,vh基于屏幕高度

## 描述一个"reset"的CSS文件并如何使用它。知道normalize.css吗？你了解他们的不同之处？　

1. 不同浏览器的默认样式不同,reset是将所有浏览器的默认样式统一

## CSS引入的方式有哪些？

1. 行内样式
2. 内联样式
3. 外部引入

## 列举常用行内元素和块元素，并解释其作用

1. 行内元素有,span文字,a跳转链接,b加粗,i斜体,img图片
2. 块元素 div,p,li,h1-h6

## 让行内元素水平居中的两种方法

1. 父级元素text-align:center
2. 设为块级元素margin:0 auto