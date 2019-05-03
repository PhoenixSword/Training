import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import React from 'react';
import { Route, Switch } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Register } from './components/Register';
import Game1 from './Game1';

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route {...rest} render={props => (
    <Layout>
      <Component {...props} />
    </Layout>
  )} />
)

const EmptyLayout = props => (
  <div>
    {props.children}
  </div>
)

const App = () => (
  <div>
    <Switch>
      <AppRoute exact path="/" layout={Layout} component={Home} />
      <AppRoute exact path="/login" layout={Layout} component={Login} />
      <AppRoute exact path="/register" layout={Layout} component={Register} />
      <AppRoute exact path="/game1" layout={EmptyLayout} component={Game1} />
    </Switch>
  </div>
)
export default App;