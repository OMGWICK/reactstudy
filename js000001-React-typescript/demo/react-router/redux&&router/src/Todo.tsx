import React, { useEffect } from 'react';
import {
  Switch,
  Route,
  Link,
  NavLink,
  Redirect,
  useLocation,
  withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';
function App({ changePath }: { path: string; changePath: Function }) {
  const { pathname } = useLocation();
  useEffect(() => {
    changePath(pathname);
  }, [pathname]);
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/home">Redirect</Link>
        </li>
        <li>
          <NavLink to="/react" activeClassName="hurray">
            React
          </NavLink>
        </li>
      </ul>

      <Switch>
        <Route path="/about" component={About}></Route>
        <Route path="/react">
          <h2>react</h2>
        </Route>
        <Route path="/home">
          <Todo></Todo>
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}
function Todo() {
  return <Redirect to="/"></Redirect>;
}
const stateToProps = (state: any) => ({
  path: state
});
const dispatchToProps = (dispatch: any) => ({
  changePath(url: string) {
    const action = {
      type: 'CHANGE_PATH',
      value: url
    };
    dispatch(action);
  }
});
export default withRouter(connect(stateToProps, dispatchToProps)(App));
