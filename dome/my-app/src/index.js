import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { func } from 'prop-types';

import Redux,{createStore} from 'redux';
import {Provider,connect} from 'react-redux';

//hash模式
// import {HashRouter as Router,Link,Route} from 'react-router-dom'

//history模式
import {BrowserRouter as Router,Link,Route,Redirect,Switch} from 'react-router-dom'

//jsx语法
//<app/>js普通对象
// let app = <App/>;
// let root =document.getElementById('root');
// ReactDOM.render(app,root);

// let h1=<h1>one one one</h1>

// ReactDOM.render(
//     h1,
//     root
// )
// ReactDOM.render(
//      <App/>,
//      document.getElementById("root")
//     )

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


//时间渲染在页面
let root = document.getElementById('root');
// function clock(){
//     let nowtime= new Date().toString();
//     let element =(
//         <div>
//        <h1>现在的事件{nowtime}</h1>
//        <h2>这是h2</h2>
//        </div>
//     );
//     ReactDOM.render(element,root)
// }

// clock()

// setInterval(runClock,1000)
setTimeout(runClock,1000)

//函数组件
function Clock(props){
    return (
        <div>
       <h1>现在的时间：{props.date.toLocaleTimeString()}</h1>
       <h2>这是函数式组件{1+1}</h2>
       </div>
    )
}

function runClock(){
    ReactDOM.render(
        <div>{bgcolor()}
        <Clock date={new Date()}/>
        {elementdom}
        <Godoor weather='xiayu'/>
        <Holloreact name="yes" weather="hot"/>
        <Statec />
        <ParentCom />
        <List />
        <Life />
        <Slot>
            <h5>插槽1</h5>
            <h5>插槽2</h5>
            <span data-positon='headerCom'>头</span>
            <span data-positon='main'>主</span>
            <span data-positon='footer'>尾</span>
        </Slot>
        <RouterCom />
        <Counter />
        <Provider store={storetwo}>
            <NewNumber />
        </Provider>
        </div>,
        root
    )
}

function bgcolor(){
let bgcolor = 'red';
return  (
    <div className={bgcolor}>
        redBackGround
    </div>
)
}
// console.log(bgcolor())

//样式
let exampleStyle={
    background:"skyblue",
    borderBottom:"1px solid red"
};
let arr=['red','redd'].join(" ");
let elementdom = (
    <div> {/* 注释 */}
    <h1 style={exampleStyle}>style样式1</h1><h2 className={arr}>class样式2</h2></div>
)

//函数组件
function Godoor(props){
    console.log(props)
    let weather = props.weather;
    let ifgo= (weather==="xiayu")?"no":"go";
    return (
        <div>
            函数组件是否出去：{ifgo}
        </div>
    )
}

//类组件
class Holloreact extends React.Component{
    render(){
        console.log(this)
        return(
            <div>
                <span>类组件是否出去:{this.props.name}</span>
                <Godoor weather="no"/>
            </div>
        )
    }
}

//state
class Statec extends React.Component{
    constructor(props){
        super(props)
        //状态数据 view
        this.state = {
            time:new Date().toLocaleTimeString(),
            c1:'content active',
            c2:'content'
        };
        this.clickEvent = this.clickEvent.bind(this)
    }
    clickEvent(e){
        console.log('clickEvent');
        console.log(e.target.dataset.index)
        let index = e.target.dataset.index;
        if(index==1){
            this.setState({
                c1:'content active',
                c2:'content'
            });
        }else{
            this.setState({
                c1:'content',
                c2:'content active'
            })
        }
    }
    render(){
        return(
            <div>
                <span>
                    state时间：{this.state.time}
                </span>
                <button data-index='1' onClick={this.clickEvent}>点我切换1</button>
                <button data-index='2' onClick={this.clickEvent}>点我切换2</button>
                <span className={this.state.c1}>content 1</span>
                <span className={this.state.c2}>content 2</span>
            </div>
        )
    }
    //生命周期函数，组件渲染完成时的函数
    componentDidMount(){
        setInterval(()=>{
            //切勿直接修改state数据，直接state重新渲染需要使用setState
            //this.setState不会立即修改，所有设置状态改变后再修改
            this.setState({
                time:new Date().toLocaleTimeString()
            })
        },1000
        )
    }
}

//父元素使用state去控制子元素的props达到父元素数据传递给子元素
//父
class ParentCom extends React.Component{
    constructor(props){
        super(props)
        this.state={
            isActive:true
        }
        this.changShow=this.changShow.bind(this)
    }
    changShow(){
        this.setState({
            isActive:!this.state.isActive
        })
    }
    setChildData=(data)=>{
        this.setState({
            childData:data
        })
    }
    render(){
        return(
            <div>
                <button onClick={this.changShow}>控制子元素显示/隐藏</button>
                <ChildCom isActive={this.state.isActive} setChildData={this.setChildData}/>
                <p>子传给父元素的数据:{this.state.childData}</p>
            </div>
        )
    }
}
//子
class ChildCom extends React.Component{
    constructor(props){
        super(props)
        this.state={
            msg:'helloParent'
        }
        this.sendData=this.sendData.bind(this)
    }
    //子传父调用父元素传递过来的函数
    sendData(){
        this.props.setChildData(this.state.msg)
    }
    render(){
        let strClass = null;
        if(this.props.isActive){
            strClass = ' active'
        }else{
            strClass = ''
        }
        return(
            <div className={"content"+strClass}>
                <h1>父传子</h1>
                {/* <button onClick={this.sendData.bind(this)}>传递helloParent给父元素</button> */}
                <button onClick={this.sendData}>传递helloParent给父元素</button>
            </div>
        )
    }
}
//列表渲染
class List extends React.Component{
    constructor(props){
        super(props)
        this.state={
            arrName:["xiaoming","xiaohei","xiaobai"],
            arrObject:[{
                name:'wang',
                age:18
            },
            {
                name:'chen',
                age:21
            },{
                name:'niu',
                age:30
            }
        ]
        }
    }
    render(){
        let listArr = this.state.arrObject.map((item,index)=>{
            return(
                <li key={index}>
                    name:{item.name},age:{item.age}
                </li>
            )
        })
        return(
            <div>
                <ul>
                    {this.state.arrName.map((item,index)=>{
                        return <li key={index}>{item}</li>
                    })}
                    {listArr}
                </ul>
            </div>
        )
    }
}

//生命周期
class Life extends React.Component{
    constructor(props){
        super(props)
        this.state={
            msg:'hello'
        }
        console.log("构造函数")
    }
    // componentWillMount(){
    //     console.log('将要渲染')
    // }可以进行ajax
    componentDidMount(){
        console.log("渲染完毕")
    }
    // componentWillReceiveProps(){
    //     console.log("将要接收新的state和props")
    // }
    // componentWillUpdate(){
    //     console.log("将要更新")
    // }
    componentDidUpdate(){
        console.log("更新完毕")
    }
    componentWillUnmount(){
        console.log("将要卸载")
    }
    render(){
        return(
            <div></div>
        )
    }
}

//插槽
class Slot extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        let headerCom,main,footer;
        this.props.children.forEach((item,index)=>{
            if(item.props['data-position']==='header'){
                 headerCom = item
            }else if(item.props['data-positon']=='main'){
                 main = item
            }else if(item.props['data-positon']=='footer'){
                 footer = item
            }
        })
        console.log(this.props)
        return(
            <div>
                <h1>组件插槽</h1>
                {this.props.children}
                {headerCom}{main}{footer}
            </div>
        )
    }
}

//路由 Router Link Route Redirect Switch
class Home extends React.Component{
    constructor(props){
        super(props)
        // console.log(this.props)
    }
    render(){
        return(
            <div>这是home</div>
        )
    }
}

class Mine extends React.Component{
    clickEvent=()=>{
        // console.log(this.props)
        this.props.history.push("/",{msg:1})
        // this.props.history.replace("/",{msg:1})替换
        // 前进
        // this.props.history.go(1)
        // this.props.history.goForward()
        // 后退
        // this.props.history.go(-1)
        // this.props.history.goBack()

    }
    render(){
        return(
            <div>这是个人中心mine
                <button onClick={this.clickEvent}>跳转</button>
            </div>
        )
    }
}

class RouterCom extends React.Component{
    render(){
        let obj = {
            pathname:"/me",//跳转路径
            search:"?username=admin",//get请求参数
            hash:"#abc",//设置hash值
            state:{msg:"hello"}//传入组件数据
        }
        return(
            <div>
                <Router basename='/'>
                    <div>
                        <Link to='/'>主页home</Link>
                        <Link to='/mine'>个人中心</Link>
                        <Link to={obj}>me</Link>
                    </div>
                    <Switch>
                    <Route path='/' exact component={Home}></Route>
                    <Route path='/mine' exact component={Mine}></Route>
                    <Route path='/me' exact component={()=>(<h1>123<Redirect to="/"></Redirect></h1>)}></Route>
                    </Switch>                
                </Router>
            </div>
        )
    }
}

//redux  reducer初始化数据，通过动作改变数据
const reducer = function(state={num:0},action){
    switch(action.type){
        case "add":
            state.num++;
            break;
        case "decrement":
            state.num--;
            break;
    }
    return {...state} //相当于对象 的copy
}
//创建仓库
const store = createStore(reducer)
console.log(store)

function add(){
    store.dispatch({type:"add"})
    console.log(store.getState())
}
function decrement(){
    store.dispatch({type:"decrement"})
    console.log(store.getState())
}

const Counter = function(props){
    //获取数据store.getState()
    let state = store.getState()
    return(
        <div>
            <h3>计数：{state.num}</h3>
            <button onClick={add}>+</button>
            <button onClick={decrement}>-</button>
        </div>
    )
}
//subscribe监听变化
store.subscribe(()=>{
    ReactDOM.render(
        <div>{bgcolor()}
        <Clock date={new Date()}/>
        {elementdom}
        <Godoor weather='xiayu'/>
        <Holloreact name="yes" weather="hot"/>
        <Statec />
        <ParentCom />
        <List />
        <Life />
        <Slot>
            <h5>插槽1</h5>
            <h5>插槽2</h5>
            <span data-positon='headerCom'>头</span>
            <span data-positon='main'>主</span>
            <span data-positon='footer'>尾</span>
        </Slot>
        <RouterCom />
        <Counter />
        <Provider store={storetwo}>
            <NewNumber />
        </Provider>
        </div>,
        root
        )
})
//react-redux
class Number extends React.Component{
    render(){
        //通过store的state给props，直接通过props就可以将state的数据获取
        const value = this.props.value;
        //修改数据的事件或者方法传入到props
        const onAddClick = this.props.onAddClick;
        //等同于vuex的mapMutation mapState
        return(
            <div>
                <h1>计数的数量：{value}</h1>
                <button onClick={onAddClick}>数字+1</button>
                <button onClick={this.props.onAddClick5}>数字+5</button>
            </div>
        )
    }
}
const addAction ={
    type:'add',
}

let ActionFnObj = {
    add:function(state,action){
        state.num++
        return state
    },
    addNum:function(state,action){
        state.num = state.num + action.num;
        return state
    }
}

function reducertwo(state={num:0},action){
    console.log(state)
    console.log(action)
    if(action.type.indexOf('redux')===-1){
    state = ActionFnObj[action.type](state,action)
    return {...state}
    }else{
        return state;
    }
    // switch(action.type){
    //     case "add":
    //         state.num++;
    //         break;
    //     default:
    //         break;
    // }
    // return {...state}
}

const storetwo = createStore(reducertwo)

//将state映射到props函数
function mapStateToProps(state){
    return{
        value: state.num
    }
}

//将修改state数据的方法，映射到props,默认会传入store里的dispatch方法
function mapDispatchToProps(dispatch){
    return{
        onAddClick:()=>{dispatch(addAction)},
        onAddClick5:()=>{dispatch({type:"addNum",num:5})}
    }
}
//将上面两个方法映射到组件上形成新组件
const NewNumber = connect(
    mapStateToProps,
    mapDispatchToProps
)(Number)

