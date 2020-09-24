# vuex

store/index.js

```javascript
Vue.use(Vuex);
const store = new Vuex.store({
  state:{
    count:0
  },
  mutation:{
    add(state){
      state.count++
    }
  }
})
```

## State

```javascript
//在通过Vue.use注册过后,所有组件都能访问到vuex中的数据
//这是一个组件
computed:{
  count(){
    return this.$store.state.count
  }
}
```

### mapState辅助函数

和react的 stateToProps=(state)=>({isLogin:state.isLogin})原理基本相同

```JavaScript
//在一个组件需要多个状态的时候,每次都声明就显得有些重复
import {mapState} from 'vuex'
export default {
  computed:mapState({
    count:state=>state.count,
    //传递字符串等同于上面的代码
    count2:'count',
    countPlusLocal(state){
      return state.count + this.localCount
    }
  })
}

//想映射的计算属性名称与state子节点名称相同时,也可以直接给他传递一个字符串数组
computed:mapState([
  //等同于state=>state.count
  'count'
])

//与其他计算属性混用
computed:{
  localCount(){/*.....*/},
  //返回的是个数组,使用展开运算符合并
  ...mapState([
    'count'
  ])
}
```

## Getter

如果很多组件都需要处理一个从vuex取得的数据,例如过滤掉persons数组中age大于20的元素,那么就需要Getter

```javascript
const store = new Vuex.store({
  state:{
    todos:[{id:1,done:true},{id:2,done:false}],
  },
  getters:{
    doneTodos:state=>{
      return state.todos.filters(todo=>todo.done);
    },
    //第二个参数是getters
    donelength:(state,getters)=>{
      return getters.doneTodos.length
    },
    //让getter返回一个函数,来实现给getter传递参数
    getTodo:(state)=>(id)=>{
      return state.todos.find(todo=>todo.id===id)
    }
  }
})

//在组件中通过this.$store.getters['']访问 是一个属性
```

### mapGetter

```javascript
//将getters属性映射到计算属性
computed:{
  localCount(){/**/},
  ...mapGetter([
    'doneTodos',
    'doneLength'
  ])
}
```

## Mutation

更改vuex中的唯一方法是提交mutation

**类似于redux中,在reducer中进行的swtich case 处理数据,commit可以看成redux中的dispatch**

```javascript
const store = new Vuex.store({
  state:{
    count:0
  },
  mutations:{
    add(state,n){
      state.count+=n
    }
  }
})
//mutation不能直接被调用,需要使用commit来提交,同时可以传入参数
this.$store.commit('add',n)

//对象风格提交,和redux基本上一致
mutations:{
  add(state,payload){
    state.count+=payload.amount
  }
}
store.commit({
  type:'add',
  amount:10
})
```

所以有如下建议

1. 使用多少就提前初始化多少mutation
2. 用新对象替换老对象使用`state.obj  = {...state.obj,text:'1'} `
3. 使用常量替代mutation事件 `const SOME_MUTATION = 'someMutaion'

### mapMutations

可以在组件中使用`this.$store.commit({type:'add',value:1})` 但是有些麻烦,我们可以使用mapMutations来映射为methods中的方法

```javascript
methods:{
  logText(){/*...*/},
  ...mapMutations([
    'add'
  ])
}
```

## Action

+ Action提交到mutation,而不是直接改变状态
+ Action可以包含任何异步操作

```JavaScript
const store = new Vuex.store({
  state:{
    count:0
  },
  mutations:{
    increment(state){
      state.count++
    }
  },
  actions:{
    increment(context){
      //这里的context可以看成一个store实例
      context.commit('increment')
    },
    //解构赋值简化
    increment({commit}){
      commit('increment')
    }
  }
})

//组件中,支持在异步中执行
fetch(url).then(()=>{
  this.$store.dispatch({
  type:'increment',
  value:10
	})
})

//在store.dispatch执行后返回的是一个promise
this.$store.dispatch('increment').then(()=>{})
//同样可以在另一个action完成以后在触发
actionB({dispatch,commit}){
  return dispatch('actionA').then(()=>{
    commit('actionB')
  })
}
//结合async/await
actions: {
  async actionA ({ commit }) {
    commit('gotData', await getData())
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // 等待 actionA 完成
    commit('gotOtherData', await getOtherData())
  }
}
```

### mapActions

```javascript
methods:{
  local(){/*...*/},
  ...mapActions([
    'increment'
  ])
}
```

## Module

因为是单一组件树的原因应用的所有状态会集中到一个比较大的对象,会比较臃肿,vuex中可以把store像组件的方式分割,<font color='red'>**注意的是,这里只有state是局部,其他的都会被映射到全局**</font>

```javascript
const moduleA = {
  state:{/*...*/},
  getters:{
    //三个参数
    countPlusRootCount(state,getters,rootState){
      return state.count + rootState.count
    }
  }
};
const moduleB = {
  state:{/**/},
  mutations:{
    //这里的state是局部状态
    increment(state){
      state.count++
    }
  },
  actions:{
    //一个参数context,context进行解构赋值
    incrementIfSome({state,commit,rootState}){
      if(state.count+rootState.count===3){
        commit('increment')
      }
    }
  }
};
const store = new Vuex.store({
  state:{/**/},
  modules:{
    a:moduleA,
    b:moduleB
  }
})
//store.state.a =>moduleA
```

### 命名空间

默认情况下,模块的内部的action,mutation,getter是注册在<font color='red'>**全局的命名空间**</font> 如果让模块有更强的封装度使用`namespaced:true`  当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。<font color='red'>**在我认为,只要有一个采用了命名空间,尽量所有的都采用命名空间**</font>,例如： 

```JavaScript
const store = new Vuex.Store({
  modules: {
    account: {
      namespaced: true,

      // 模块内容（module assets）
      state: { ... }, // 模块内的状态已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响
      getters: {
        isAdmin () { ... } // -> getters['account/isAdmin']
      },
      actions: {
        login () { ... } // -> dispatch('account/login')
      },
      mutations: {
        login () { ... } // -> commit('account/login')
      },

      // 嵌套模块
      modules: {
        // 继承父模块的命名空间
        myPage: {
          state: { ... },
          getters: {
            profile () { ... } // -> getters['account/profile']
          }
        },

        // 进一步嵌套命名空间
        posts: {
          namespaced: true,

          state: { ... },
          getters: {
            popular () { ... } // -> getters['account/posts/popular']
          }
        }
      }
    }
  }
})
//命名空间中访问全局内容
 modules:{
	foo:{
		getters:{
    	someGetter(state,getters,rootState,rootGetters){/**/}  
    },
     ations: {
      // 在这个模块中， dispatch 和 commit 也被局部化了
      // 他们可以接受 `root` 属性以访问根 dispatch 或 commit
      someAction ({ dispatch, commit, getters, rootGetters }) {
        getters.someGetter // -> 'foo/someGetter'
        rootGetters.someGetter // -> 'someGetter'
        dispatch('someOtherAction') // -> 'foo/someOtherAction'
        dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'
        commit('someMutation') // -> 'foo/someMutation'
        commit('someMutation', null, { root: true }) // -> 'someMutation'
      },
      someOtherAction (ctx, payload) { ... }
    }
	}
}
//应为是所有的都是局部的,在子模块action想直接dispatch到全局的mutation时候可以直接添加root:true
{
 actions: {
   someOtherAction ({dispatch}) {
     dispatch('someAction')
    }
  },
  modules: {
    foo: {
      namespaced: true,
      actions: {
        someAction: {
          root: true,
          handler (namespacedContext, payload) { ... } // -> 'someAction'
        }
      }
    }
  }
```

### 带有命名空间的mapState,mapGetters,mapMutations,mapActions

```javascript
computed: {
  ...mapState({
    a: state => state.some.nested.module.a,
    b: state => state.some.nested.module.b
  })
},
methods: {
  ...mapActions([
    'some/nested/module/foo', // -> this['some/nested/module/foo']()
    'some/nested/module/bar' // -> this['some/nested/module/bar']()
  ])
}

//改进方法
computed: {
  ...mapState('some/nested/module', {
    a: state => state.a,
    b: state => state.b
  })
},
methods: {
  ...mapActions('some/nested/module', [
    'foo', // -> this.foo()
    'bar' // -> this.bar()
  ])
}

//可以在子组件创建基于当前要使用的模块的空间名称来进行绑定
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('some/nested/module')

export default {
  computed: {
    // 在 `some/nested/module` 中查找
    ...mapState({
      a: state => state.a,
      b: state => state.b
    })
  },
  methods: {
    // 在 `some/nested/module` 中查找
    ...mapActions([
      'foo',
      'bar'
    ])
  }
}
```



## 建议文件结构

```sh
├── index.html
├── main.js
├── api
│   └── ... # 抽取出API请求
├── components
│   ├── App.vue
│   └── ...
└── store
    ├── index.js          # 我们组装模块并导出 store 的地方
    ├── actions.js        # 根级别的 action
    ├── mutations.js      # 根级别的 mutation
    └── modules
        ├── cart.js       # 购物车模块
        └── products.js   # 产品模块
```



```javascript
// /store/index.js
import mutation from './mutation'
import getters from './getters'
import Vuex from 'vuex'
const store = new Vuex.store({
  state:{
    count:0,
    /*.....*/
  },
  mutation,
  getters,
})
```

```javascript
// /store/mutationTypes
export const ADD_COUNT_MUTATION = 'addCount'
```

```javascript
// /store/mutation
import * as mutationTypes from './mutationTypes'
export default {
  [mutationTypes.ADD_COUNT_MUTATION](state){
    /**/
  }
}
```

