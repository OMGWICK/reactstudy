# vue

this.$options.render查看template转换为render函数的样子

## 指令

### v-once

只渲染一次,如果这父组件重新渲染,所有包含v-once的dom都将会跳过重新渲染,**可以优化提高性能**

### v-on

事件监听

```vue
<!--传递多个参数如下所示-->
<button @click='handler(`abc`,$event)'></button>
<!--修饰符等等-->
<button @click.prevent='handler'>阻止默认事件</button>
<button @click.stop='handler'>阻止冒泡</button>
```

### v-model

```vue
<!--修饰符等等-->
<input v-model.lazy="text" />
lazy 监听input转为change
number value转为数字
trim 去除左右两边空格
```

### v-slot

作用域插槽,为了能够访问到子组件中才有的数据

```vue
//作用域插槽
    <div id="app">
      <my-son :text="text">
        <!--#btn相当于v-slot:btn slot="btn"-->
        <template #btn="{text}">{{text}}</template>
        <!--"#btn=""的值是个对象,他是定义插槽的时候的参数,这里在解构赋值"-->
      </my-son>
    </div>
  <template id="cpn">
    <div>
      <button>
        <!--在父组件中使用 子组件特有的数据text-->
        <slot name="btn" :text="text">默认值</slot>
      </button>
    </div>
  </template>

```



## 实例api

### filters

```vue
<h1>{{price | tofix}}</h1>
filters:{
	tofix(data){
		return data.toFixed(3)
	}
}
```

### props

```javascript
//props
{
  childMovies:Array,
  isChecked:Boolean,
  cMessage:{
    type:String,
    default:'hello',
    required:false
  }
  childSong:{
    type:String,
    //default可以为一个函数
    default(){
      return '12'
    }
  }
}
```

### $emit

```vue
<!--子传父-->
<!--改变父值用v-model-->
<div id="app">
  <h1>{{text}}</h1>
  <my-son v-model="text"></my-son>
</div>
<template id="cpn">
  <input type="text" @input="handler" />
</template>
<script>
  Vue.component('mySon', {
    model: {
      prop: 'text',
      event: 'changeFather',
    },
    template: '#cpn',
    methods: {
      handler(e) {
        this.$emit('changeFather', e.target.value);
      },
    },
  });
  new Vue({
    data() {
      return {
        text: '',
      };
    },
  }).$mount('#app');
</script>
<!--在父处触发事件用事件监听-->
  <my-son @change-father="handler"></my-son>
<script>
  Vue.component('mySon', {
    template: '#cpn',
    methods: {
      handler(e) {
        this.$emit('change-father', e.target.value);
      },
    },
  });
  new Vue({
    methods: {
      handler(text) {
        console.log(text);
      },
    },
  }).$mount('#app');
</script>
```

### $children

```javascript
this.$children //取到子组件
```

### $refs

```javascript
this.$refs['xxx'] //访问到注册的dom元素或者组件
<input ref="xxx" /> //在组件或者dom元素上使用 ref属性进行注册
```

### $parent

```javascript
this.$parent //访问到父组件
```

### $root

```javascript
this.$root //访问到根组件
```

### provide / inject

注意的是,这里的传入的对象不是响应式的

**因为你在父子组件的实现和结构上直接引入了耦合，使组件的可扩展性几乎极大地降低**

```javascript
//官方不推荐使用,允许一个祖先组件对所有子孙注入依赖
const father = {
  provide:{
    foo:'bar'
  }
  //用函数的方式
  provide(){
    return {
      foo:'bar'  //    messageData: this.$data 把data暴露给所有的,这里的data是响应式的,Vue.observable实现响应式
    }
  }
}
const child = {
  inject:['foo'],
  //用对象的方式
  inject:{
    foo
  }
  computed:{
    newValue(){
      return this.foo
    }
  }
}
```

### vm.$attrs

取得在父作用域中不作为prop,但是**获取到了的属性** (除了class和style),,可以通过`v-bind='$attrs'`穿入内部组件

返回一个对象 {text:'hello'}

### vm.$listeners

取得父作用域中正在监听本组件的v-on事件监听器,如下

```html
<my-son @change='handler' @inpput=handler></my-son>

<!--在子组件中-->
this.$listeners 可以得到结果 {change:f,input:f}
```

### vm.$on

*vm.$on(event:string,callback:Function)* 

```javascript
//监听事件
this.$on('test',msg=>console.log(msg))
//事件可以由$emit触发
this.$emit('test','hi')
```

### vm.$once

*vm.$once(event:string,callback:Function)*

监听一个自定义事件,只触发一次

### vm.$off

移除自定义事件监听器。

- 如果没有提供参数，则移除所有的事件监听器；
- 如果只提供了事件，则移除该事件所有的监听器；
- 如果同时提供了事件与回调，则只移除这个回调的监听器。

### vm.$emit

*vm.$emit(eventName:string,..args)*

触发当前实例上的事件,附加参数都会传给监听器回调

### vm.$nextTick

*vm.nextTick(callback:Function)* 

回调将会在当前实例dom更新完后调用

## 全局API

### Vue.extend(options)

创建一个子类

```JavaScript
const options = {
  template:'#test'
  data(){
    return {
      text:'';
    }
  },
};
const Component = Vue.extend(options);
new Component().$mount('#app')
```

### Vue.nextTick()

vue修改数据是异步的

```JavaScript
Vue.nextTick()//会返回一个promise,执行在dom更新后的操作
```

### Vue.set

*Vue.set(target:object,propertyName:index|string,value:any)*

为数据对象新添加属性,来确保该属性也是响应式的,因为在初始化的时候,vue是遍历对象来设置的getter,setter,所以新增属性不能通过原生的方法,而是要通过Vue.set

### Vue.delete

*Vue.delete(target:object,propertyName:string|number)*

### Vue.directive

*Vue.directive(id:string,options:Function|object)*

```javascript
//注册全局指令
Vue.directive('focus',{
  inserted(el){}
})

//第二个参数如果是函数,相当于绑定update,bind
Vue.directive('focus',()=>{})
```

### Vue.filter()

全局过滤器

### Vue.component()

全局组件

### Vue.use()

安装插件

### Vue.observable(object)

让一个对象可响应

 返回的对象可以直接用于[渲染函数](https://vuejs.bootcss.com/guide/render-function.html)和[计算属性](https://vuejs.bootcss.com/guide/computed.html)内，并且会在发生改变时触发相应的更新。也可以作为最小化的跨组件状态存储器，用于简单的场景： 

```javascript
const state = Vue.observable({count:0})
new Vue({
  computed:{
    newValue(){
      return state.count+1
    }
  }
})
```

在vue3.0中这里会返回一个proxy,要遵循永远不要直接操纵源对象原则,只能对返回的proxy操纵,这里同理



# vue-cli

## 安装

```powershell
	npm i -g @vue/cli
	npm i -g @vue/cli-service-global
```

### 创建项目

```shell
vue create app
```

## 单元测试

### 安装依赖

```shell

```



