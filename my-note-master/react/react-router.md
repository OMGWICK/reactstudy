# react-router

条件大的写后面,条件小的写前面

```tsx
  <Route path={`${match.path}/:topicId`}>
  {/*比如这里的路径的子路径,如果把/目录放在前面进行路由匹配的时候则会直接匹配到/这个目录*/}
    <Topic />
  </Route>
  <Route path={match.url}>
    <h3>please select somthing</h3>
  </Route>
```

导航链接是一种特殊的链接,当它的导航与当前位置匹配时候,可以将自己设置为'活动

```tsx
 <NavLink to="/react" activeClassName="hurray">
     React
   </NavLink>
{/*在导航匹配的时候会渲染为*/}
<a href="/react" aria-current="page" class="hurray">React</a>
{/*普通的Link没有这个属性*/}

```

重定向

```tsx
 <Route path="/about">
   <About />
 </Route>
 <Route path="/react">
   <h2>react</h2>
 </Route>
{/*前面的都不存在重定向*/}
 <Redirect to="/"></Redirect>
 <Route path="/">
   <Home />
 </Route>
```

## 初始化

```bash
yarn add react-router react-router-dom
```

## 实例

```jsx
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from 'react-router-dom';
import { Home } from './views/Home';
import { User } from './views/User';
import { Search } from './views/Search';
function Test() {
  return (
    <Router>
      <p>
        <Link to="/home">Home</Link>
      </p>
      <p>
        <Link to="/user">User</Link>
      </p>
      <p>
        <NavLink to="/search" activeClassName="hurray">
          search
        </NavLink>
      </p>
      <Switch>
        <Route path="/search" component={Search}></Route>
        <Route path="/user" component={User}></Route>
        <Route path="/home" component={Home}></Route>
      </Switch>
    </Router>
  );
}

export default Test;

```

## 携带信息

```jsx
<Link to={{ state: 'hello', pathname: '/user/123' }}>state</Link>
```

## useParams

```jsx
import React from 'react';
import { useParams } from 'react-router-dom';

export function User() {
  const s = useParams();
  console.log(s);
  return (
    <div>
      <h1>User</h1>
      <h1>{Object.values(s)}</h1>
    </div>
  );
}

```

## exact

当设置为true只有完全匹配才会显示

```jsx
<Switch>
  这里的/不会和之前一样被匹配到
 <Route path="/" exact component={Home}></Route>
 <Route path="/home" component={Home}></Route>
</Switch>
```

## useLocation

获取信息如下

```javascript
{state: "hello", pathname: "/user/123", search: "", hash: "", key: "n9xalj"}
```

