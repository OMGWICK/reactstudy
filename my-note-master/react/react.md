# 共通 api

## api

### `React.Fragment` 

```react
//不额外创建dom的情况下返回多个子节点
function MyComponent(){
  return <>
    <div></div><h1></h1>
    </>
}
```

### React.createRef

```react
//注意ref不能跨组件传递
function MyComponent(){
  const inputRef = React.createRef();
  return <input ref={inputRef} />
}
```

### React.forwardRef

```react
//转发ref到其他组件
//Father.tsx
function Father(){
  const ref = React.createRef();
  return <Child />
}
//Child.tsx
export const Child = React.forwardRef((props,ref)=>{
  return <h1 ref={ref}>123</h1>
})
```

### React.lazy(()=>import())

```react
const Test = React.lazy(()=>import('@/component/Test.tsx'))
```

### React.Suspense

```react
//可以在组件未加载完成的时候显示另一个加载动画组件
const OtherComponent = React.lazy(()=>import('@/component/OtherComponent.tsx'));
function App(){
  //显示Loading直到OtherComponent渲染完成
  return <React.Suspense fallback={<Loading />}>
  					<OtherComponent />
   				</React.Suspense>
}
```



### React.createContext(defaultValue)

```react
//暴露三个方法 Provider Consumer displayName
const MyContext = React.createContext(0);
function ListenClick() {
  const [state,setState] = useState(1);
  return <div>
 		<MyContext.Provider value={state}>
    	<child />
  	</MyContext.Provider>
  </div>;
}
```



#  class API

## react class组件生命周期

其余方法即将被移除

1. componentDidMount()    如果在这里添加了订阅,请在componentWillUnmount中卸载
2. componentDidUpdate()
3. componentWillUnmount()

## api

### setState

setState((state,props)=>{return newState }); setState(newState);

### forceUpdate(callback) 

强制重新渲染

### React.PureComponent

是浅层比较,无法检测深处的差别,在props和state较为简单的时候使用 PureComponnet性能更为优秀,**注意 这个是跳过当前组件及所有子组件更新,所以确保所有子组件都是纯的组件**

### contextType

MyClass.contextType = MyContext;  挂载MyContext到context上去

# funtion API

 ## api

### React.memo 

如果当前函数组件在给定相同props渲染相同的结果,那么就可以在`React.memo`中调用

```JavaScript
const MyComponent = React.memo(function MyComponent(props){})
```

### useEffect

相当于componentDidUpdate,componentDidMount,return值相当于componentWillUnmount

```javascript
//useEffect(()=>{},[])第二个参数为依赖属性,如果为空便不会调用
function ListenClick({ children }: { children: JSX.Element }) {
  useEffect(() => {
    const handler = () => {
      console.log('mouse is click ');
    };
    document.addEventListener('click', handler);
    return () => {
      document.removeEventListener('click', handler);
    };
  });
  return <div>{children}</div>;
}
```

### useContext

```JavaScript
//接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值。当前的 context 值由上层组件中距离当前组件最近的 <MyContext.Provider> 的 value prop 决定。
const value = useContext(MyContext);
function ListenClick() {
  const MyContext = useContext(ClickTimeContext);
  return <div>{MyContext}</div>;
}
class App extends React.component{
  render(){
     return <ClickTimeContext.Provider value={this.state.x}>
          <ListenClick></ListenClick>
        </ClickTimeContext.Provider>
}
}
```

# ReactDOM

```javascript
import ReactDOM from 'react-dom'
ReactDOM.render(
  <App />,
  document.querySelector('#app')
)
```

# ReactDOMServer

```javascript
import ReactDOMServer from 'react-dom/server';
ReactDOMServer.renderToString(<App />)//把react元素渲染为字符串
```

# react

## 一个react实例

```react
class Avatar extends React.Component {
  render() {
    return <img src={this.props.user.avatarUrl} alt={this.props.user.name} />;
  }
}
class UserInfo extends React.Component {
  render() {
    return (
      <div className="userInfo">
        <Avatar user={this.props.author} />
        <div className="UserInfo-name">{this.props.author.name}</div>
      </div>
    );
  }
}
class Comment extends React.Component {
  render() {
    return (
      <div className="Comment">
        <UserInfo author={this.props.author} />
        <div className="Comment-text">{this.props.text}</div>
        <div className="Comment-date">{this.props.date}</div>
      </div>
    );
  }
}
let author = {
  avatarUrl: 'www.qq.com',
  name: 'luxun'
};
const element = (
  <Comment author={author} text="some msg" date={new Date().toISOString()} />
);
ReactDOM.render(element, document.querySelector('#root'));
```

## compont name

组件名必须是大写的,小写字母开头的组件是原生 dom

## lifecycle

1. 当组件第一次挂载到 dom 的时候,为他设置一个定时器,这被称之为挂载(mount)
1. 当 DOM 中的组件被删除的时候,应该清楚定时器,这被称之为卸载(unmount)

```javascript
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  tick() {
    this.setState({
      date: new Date()
    });
  }
  render() {
    return (
      <div>
        <h1>hello world!</h1>
        <h2>it is {this.state.date.toLocaleTimeString()}</h2>
      </div>
    );
  }
}
const element = <Clock />;
ReactDOM.render(element, document.querySelector('#root'));
```

## state

1. 不要直接修改 `state`,使用 setState()
1. 构造函数是唯一可以给 this.state 赋值的地方
1. state 可能是异步的

```javascript
//异步的时候,就不要依赖他们的值更新,可以让setState接受一个函数,这个函数用上一个 state 作为第一个参数，将此次更新被应用时的 props 做为第二个参数：
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

1. state 的更新会被合并,在调用多个 setState(),更新多个独立的属性例如`this.state={posts:[],comments:[]}`,在分别调用 setState()更新属性的时候,会单独更新,这里的合并是浅合并,所以另一个属性被保留,相同的属性被替换
1. 数据向下流动,单向数据流,组件可以选中把他的 state 作为 props 向下传递到它的子组件,子组件从 props 接受到参数,但是子组件无法知道他是怎么来的

## event

```javascript
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOn: true
    };
    //注意绑定回调的this,可以用箭头函数来创建handleclick来确保this,也可以在render的时候用this调用来锁定this,<button onClick={()=>this.handleClick()}></button>
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    this.setState({
      isOn: !this.state.isOn
    });
  }
  // handleClick=()=>{ this.setState({
  //     isOn: !this.state.isOn
  //   });}
  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isOn ? 'on' : 'false'}
      </button>
    );
  }
}
const element = <Clock />;
ReactDOM.render(element, document.querySelector('#root'));
```

## list

**非常好的经验是 map 当中的元素需要绑定 key**

```javascript
class Clock extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    //要在上下文绑定key,不要在子组件绑定key
    return (
      <ul>
        {this.props.numbers.map((n) => (
          <ListItem key={n} value={n} />
        ))}
      </ul>
    );
  }
}
class ListItem extends React.Component {
  render() {
    return <li>{this.props.value}</li>;
  }
}
const numbers = [1, 2, 3, 4, 5];
const element = <Clock numbers={numbers} />;
ReactDOM.render(element, document.querySelector('#root'));
```

1. key 只是在兄弟节点中唯一,并不需要在全局唯一
1. key 只会传递给 react,但不会传递给我
1. jsx 允许在大括号中嵌入任何表达式

## form

在受控组件指定了肯定的值后,输入会被锁定

```javascript
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: ''
    };
  }
  submitHandler = (e) => {
    console.log(
      '提交的名字是' + this.state.user,
      '提交的密码是' + this.state.password
    );
    e.preventDefault();
  };
  changeHandler = (e) => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
  };
  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <label>
          name:
          <input
            type="text"
            value={this.state.user}
            name="user"
            onChange={this.changeHandler}
          />
        </label>
        <label>
          password:
          <input
            type="text"
            name="password"
            value={this.state.password}
            onChange={this.changeHandler}
          />
        </label>
        <input type="submit" />
      </form>
    );
  }
}

const element = <Clock />;
ReactDOM.render(element, document.querySelector('#root'));

```

## state improvement

其实就是子传父,首先在子组件设定事件,然后在父组件中调用事件

```javascript
const sclaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};
class BoilingVerdict extends React.Component {
  render() {
    return this.props.celsius >= 100 ? (
      <p style={{ color: 'red' }}>the water is boliing</p>
    ) : (
      <p style={{ color: 'green' }}>this water is not boliing</p>
    );
  }
}
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
  }
  changeHandler = (e) => {
    //设定事件,传递参数为值
    this.props.onTem(e.target.value);
  };
  render() {
    return (
      <div>
        <h1>please input celsius in {this.props.scale}</h1>
        <input
          type="number"
          value={this.props.temperature}
          onChange={this.changeHandler}
        />
      </div>
    );
  }
}
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: '',
      temperature: 0
    };
  }
  cHandler = (temperature) => {
    this.setState({ scale: 'c', temperature });
  };
  fHandler = (temperature) => {
    this.setState({ scale: 'f', temperature });
  };
  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius =
      scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit =
      scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
    return (
      <div>
        <TemperatureInput
          scale={sclaleNames['c']}
          onTem={this.cHandler}
          temperature={celsius}
        />
        <TemperatureInput
          scale={sclaleNames['f']}
          onTem={this.fHandler}
          temperature={fahrenheit}
        />
        <BoilingVerdict celsius={celsius} />
      </div>
    );
  }
}
function toCelsius(temperature) {
  return (temperature - 32) / 1.8;
}
function toFahrenheit(temperature) {
  return temperature * 1.8 + 32;
}
function tryConvert(temperature, name) {
  return name(temperature);
}
const element = <Calculator />;
ReactDOM.render(element, document.querySelector('#root'));

```

## Inherit,slot

子组件插槽

```javascript
class Test extends React.Component {
  render() {
    return (
      <div>
        <TestChild color={'red'}>hello world</TestChild>
      </div>
    );
  }
}
class TestChild extends React.Component {
  render() {
    return <h1 style={{ color: this.props.color }}>{this.props.children}</h1>;
  }
}
const element = <Test />;
ReactDOM.render(element, document.querySelector('#root'));

```

## ref

标记

```javascript
class Test extends React.Component {
  constructor(props) {
    super(props);
    //创建一个textInput DOM元素的ref
    this.textInput = React.createRef();
    //就是创建一个容器
  }
  focus = () => {
    this.textInput.current.focus();
  };
  componentDidMount() {
    this.textInput.current.focus();
  }
  render() {
    return (
      <div>
        {/* 使用ref回调函数以实例中的一个变量存储文本输入dom,,比如this.textInput
        .再用ref把dom放进去
        */}
        <TestChild textInput={this.textInput} />
        <button onClick={this.focus}>button</button>
      </div>
    );
  }
}

class TestChild extends React.Component {
  render() {
    return <input type="text" ref={this.props.textInput} />;
  }
}
const element = <Test />;
ReactDOM.render(element, document.querySelector('#root'));

```

## context

```javascript
//相当于个全局变量
// 多个组件不必用context传递;
// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
// 为当前的 theme 创建一个 context（“light”为默认值）。
const ThemeContext = React.createContext('light');
class App extends React.Component {
  render() {
    // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
    // 无论多深，任何组件都能读取这个值。
    // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  // 在这个例子中，当前的 theme 值为 “dark”。
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}

```

## HOC

高阶组件定义是,高阶组件是参数为组件,返回值为新的组件的函数

```javascript
const EnhancedComponent = higherOrderComponent(WrappedComponent);

```

1. 组件是将 props 转换为 UI，而高阶组件是将组件转换为另一个组件。
1. 抽象共通的地方,获取被包装组件接收来自容器组件的所有 prop，同时也接收一个新的用于 render 的 data prop。HOC 不需要关心数据的使用方式或原因，而被包装组件也不需要关心数据是怎么来的。
1. 也就是相当于父亲获取数据,儿子直接使用
1. 工厂函数,抽象相同的,来构建工厂函数
1. 实例为react-redux 的connect

## shouldComponentUpdate

![w](https://zh-hans.reactjs.org/static/5ee1bdf4779af06072a17b7a0654f6db/cd039/should-component-update.png)

在这个函数返回 false 的时候,react 不会去渲染

这段代码中 color 和 count 不改变便不会更新

```javascript
class CounterButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 1 };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.color !== nextProps.color) {
      return true;
    }
    if (this.state.count !== nextState.count) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState((state) => ({ count: state.count + 1 }))}
      >
        Count: {this.state.count}
      </button>
    );
  }
}
ReactDOM.render(<CounterButton />, document.querySelector('#root'));

```

## React.pureComponent

可以用它来替代 shouldComponentUpdate,但是他只是用来浅比较,比如数组中的数据改变的时候他不能够检测出来
解决办法是可以直接用[...this.state.words]生成一个新的数组

```javascript
class CounterButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { count: 1 };
  }

  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState((state) => ({ count: state.count + 1 }))}
      >
        Count: {this.state.count}
      </button>
    );
  }
}

```

## Portals

一个 portal 的典型用例是当父组件有 overflow: hidden 或 z-index 样式时，但你需要子组件能够在视觉上“跳出”其容器。例如，对话框、悬浮卡以及提示框：

```javascript
//child是任何可渲染的react元素,例如一个jsx,一个字符串,第二个参数是一个dom元素
ReactDOM.createPortal(child, container);

```

```jsx
// 在 DOM 中有两个容器是兄弟级 （siblings）
const appRoot = document.getElementById('app-root');
const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    // 在 Modal 的所有子元素被挂载后，
    // 这个 portal 元素会被嵌入到 DOM 树中，
    // 这意味着子元素将被挂载到一个分离的 DOM 节点中。
    // 如果要求子组件在挂载时可以立刻接入 DOM 树，
    // 例如衡量一个 DOM 节点，
    // 或者在后代节点中使用 ‘autoFocus’，
    // 则需添加 state 到 Modal 中，
    // 仅当 Modal 被插入 DOM 树中才能渲染子元素。
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el
    );
  }
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {clicks: 0};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // 当子元素里的按钮被点击时，
    // 这个将会被触发更新父元素的 state，
    // 即使这个按钮在 DOM 中不是直接关联的后代
    this.setState(state => ({
      clicks: state.clicks + 1
    }));
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        <p>Number of clicks: {this.state.clicks}</p>
        <p>
          Open up the browser DevTools
          to observe that the button
          is not a child of the div
          with the onClick handler.
        </p>
        <Modal>
          <Child />
        </Modal>
      </div>
    );
  }
}

function Child() {
  // 这个按钮的点击事件会冒泡到父元素
  // 因为这里没有定义 'onClick' 属性
  return (
    <div className="modal">
      <button>Click</button>
    </div>
  );
}

ReactDOM.render(<Parent />, appRoot);

```

## Profiler

分析渲染多久

```javascript
render(
  <App>
    <Profiler id="Navigation" onRender={callback}>
      <Navigation {...props} />
    </Profiler>
    <Main {...props} />
  </App>
);

```

onRender

```javascript
function onRenderCallback(
  id, // 发生提交的 Profiler 树的 “id”
  phase, // "mount" （如果组件树刚加载） 或者 "update" （如果它重渲染了）之一
  actualDuration, // 本次更新 committed 花费的渲染时间
  baseDuration, // 估计不使用 memoization 的情况下渲染整颗子树需要的时间
  startTime, // 本次更新中 React 开始渲染的时间
  commitTime, // 本次更新中 React committed 的时间
  interactions // 属于本次更新的 interactions 的集合
) {
  // 合计或记录渲染时间。。。
}

```

## Render Props

渲染参数,可以用来做数据处理

```javascript
//在dataprovider中声明{this.props.render(this.state)}的地方会渲染后面这个react元素,参数是设置render函数传递的参数
<DataProvider render={(data) => <h1>Hello {data.target}</h1>} />

```

也可以放在元素的内部

```javascript
<DataProvider>{(data) => <h1>Hello {data.target}</h1>}</DataProvider>

```

他也可以叫其他名字,例如 children prop

```javascript
<Mouse
  children={(mouse) => (
    <p>
      鼠标的位置是 {mouse.x}，{mouse.y}
    </p>
  )}
/>

```

定义一个 prop 作为方法

```javascript
class MouseTracker extends React.Component {
  // 定义为实例方法，`this.renderTheCat`始终
  // 当我们在渲染中使用它时，它指的是相同的函数
  renderTheCat(mouse) {
    return <Cat mouse={mouse} />;
  }

  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <Mouse render={this.renderTheCat} />
      </div>
    );
  }
}

```

## strict mode

严格模式

```javascript
import React from 'react';

function ExampleApplication() {
  return (
    <div>
      <Header />
      <React.StrictMode>
        <div>
          <ComponentOne />
          <ComponentTwo />
        </div>
      </React.StrictMode>
      <Footer />
    </div>
  );
}

```

# hook

**使用 linter 插件来强制要求执行规则**

[linter](https://www.npmjs.com/package/eslint-plugin-react-hooks)  

Hook 就是 JavaScript 函数，但是使用它们会有两个额外的规则：

1. 只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用。
1. 只能在 React 的函数组件中调用 Hook。不要在其他 JavaScript 函数中调用。

## state

第一个是设定的值,第二个是设定 state 的方法

```javascript
const { useState } = React;
function Test(props) {
  const [count, setCount] = useState(0);
  const [fruit, setFruit] = useState('apple');
  let handler = () => {
    setCount(count + 1);
  };
  return (
    <div>
      <h1>{count}</h1>
      <h2>fruit: {fruit}</h2>
      <button onClick={handler}>button</button>
    </div>
  );
}
ReactDOM.render(<Test words={'hello'} />, document.querySelector('#root'));
```

## effect

useEffect 就是一个 Effect Hook，给函数组件增加了操作副作用的能力。它跟 class 组件中的 componentDidMount、componentDidUpdate 和 componentWillUnmount 具有相同的用途，只不过被合并成了一个 API

```javascript
//相当于componentDidMount和componentDidUpdate
//return的回调,会在更新之前,或者销毁之前调用,相当于,componentWillUnmount
const { useState, useEffect } = React;
function Test(props) {
  const [count, setCount] = useState({ data: true });
  const [fruit, setFruit] = useState('apple');
  let handler = () => {
    // setCount(count + 1);
    setCount({ ...count });
  };
  //相当于componentDidMount和componentDidUpdate
  useEffect(() => {
    const getData = async () => {
      const result = await fetch(
        'https://jsonplaceholder.typicode.com/todos/1'
      );
      const json = await result.json();
      return json;
    };
    getData().then((json) => {
      setCount({ data: json });
    });
  }, []);
  return (
    <div>
      <h1>{JSON.stringify(count.data)}</h1>
      <h2>fruit: {fruit}</h2>
      <button onClick={handler}>button</button>
    </div>
  );
}

ReactDOM.render(<Test words={'hello'} />, document.querySelector('#root'));
```

## custom hook

主要目的是抽离相同的逻辑
FriendStatus 和 FriendListItem 之间需要共享逻辑。

```javascript
import { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
```

## useRef

```javascript
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

## shouldComponentUpdate?

你可以用 React.memo 包裹一个组件来对它的 props 进行浅比较：

```javascript
const Button = React.memo((props) => {
  // 你的组件
});
```