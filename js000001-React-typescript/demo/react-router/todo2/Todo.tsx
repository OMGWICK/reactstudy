import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/topics">
            <Topics />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Topics() {
  let match = useRouteMatch();
  return (
    <div>
      <ul>
        <li>
          <Link to={`${match.url}/components`}>components</Link>
        </li>
        <li>
          <Link to={`${match.url}/another`}>another</Link>
        </li>
      </ul>
      <Switch>
        <Route path={`${match.url}/:id`}>
          <Topic></Topic>
        </Route>
        <Route path={match.url}>
          <h3>please select somthing</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  let { id } = useParams();
  return <h3>select {id}</h3>;
}
