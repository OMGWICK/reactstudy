# vue-router

### src目录

1. components
2. router 路由配置
3. views 路由组件

入口文件配置

```javascript
new Vue({
  render:h=>h(app),
  router
}).$mount('#app')
```

### 路由配置

```javascript
import VueRouter from 'vue-router'
Vue.use(VueRouter);
//默认hash模式
const routes = [
   // 下面的对象就是路由记录
  {
    path:'/',
    //这里的路由会分开打包成几个js文件
    component:()=>import('./views/Home')
  },
  {
    path:'/home',
    redirect:'/'
  },
  {
    path: '/user/:userId',
    component:()=>import('./views/User')
  },
  {
    path:'/acticle',
    component:()=>import('./views/Article'),
    children:[
    	{
    		path:'',
    		redirect:'/article/arthome'
  		},
  		{
        path:'news',
        component:()=>import('./views/ArtNews')
      }
    ]
  }
]
const router = new VueRouter({
  routes,
  mode:'history',
  //路由跳转激活样式,更多api在官网
  linkActiveClass:'active'
})
export default router
```

RouterConfig

```typescript
interface RouteConfig = {
  path: string,
  component?: Component,
  name?: string, // 命名路由
  components?: { [name: string]: Component }, // 命名视图组件
  redirect?: string | Location | Function,
  props?: boolean | Object | Function,
  alias?: string | Array<string>,
  children?: Array<RouteConfig>, // 嵌套路由
  beforeEnter?: (to: Route, from: Route, next: Function) => void,
  meta?: any,

  // 2.6.0+
  caseSensitive?: boolean, // 匹配规则是否大小写敏感？(默认值：false)
  pathToRegexpOptions?: Object // 编译正则的选项
}
```

### app.vue

```vue
<template>
  <div id="app">
    <!-- router-link跳转 -->
    <router-link to="/home">首页</router-link>
    <router-link to="/about" tag="button">关于</router-link>
    <!-- 动态路由 -->
    <router-link :to="cuserid">用户</router-link>
    <!-- tag属性 tag="button" -->
    <!--active-class属性 active-class="active" -->
    <router-view></router-view>

    <!-- 使用代码跳转首页 -->
    <!-- <button @click="btnclick">首页</button> -->
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        userId: 'zhangsan',
      };
    },
    computed: {
      cuserid() {
        return '/user/' + this.userId;
      },
    },
    methods: {
      btnclick() {
        this.$router.push('/home');
      },
    },
  };
  //可以在这里进行路由跳转的同时传递参数
  this.$router.push({
    path:'profile',
    query:{
      name:'zhangfei',
      age:18
    }
  })
</script>

<style>
  .active {
    background-color: aqua;
  }
</style>
```

### 导航守卫 navigation

 当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于 **等待中**。 

```JavaScript
//全局前置守卫
router.beforeEach((to,from,next)=>{
  document.title = to.matched[0].meta.title;
  //必须调用next,不然钩子就不会resloved,从而一直不跳转
  next();
})
//全局解析守卫
router.beforeReslove((to,from,next)=>{
  //在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用
})
//全局后置钩子
router.beforeEach((to,from)=>{
  //在跳转完成后调用
})

//路由独享的守卫,局部的守卫,在配置路由的时候设置
const routes = [
  {
    path:'/',
    component:()=>import('./views/home'),
    beforeEnter(to,from,next){
    //
  	}
  }
]

//路由组件,注意是路由组件中可以定义
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```

