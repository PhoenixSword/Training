import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import React from 'react';
import { Route, Switch } from 'react-router';
import { Layout } from './components/Layout';
import { TeacherHome } from './components/TeacherHome';
import { SchoolchildHome } from './components/SchoolchildHome';
import { Login } from './components/Login';
import { Register } from './components/Register';
import Game1 from './components/Games/Game1';
import Game2 from './components/Games/Game2';
import {role} from './components/services/Auth-header';
import {Events} from './components/Events';
import {Games} from './components/Games';

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
      {role() === "Teacher" ? <AppRoute exact path="/" layout={Layout} component={TeacherHome} /> : null}
      {role() === "Teacher" ? <AppRoute exact path="/games" layout={Layout} component={Games} /> : null}
      {role() === "Teacher" ? <AppRoute exact path="/schoolchilds" layout={Layout} component={TeacherHome}/> : null}
      {role() === "Schoolchild" ? <AppRoute exact path="/" layout={Layout} component={SchoolchildHome} /> : null}
      {
        //role() === "Schoolchild" ? <AppRoute exact path="/event" layout={Layout} component={Event}/> : null
      }
      <AppRoute exact path="/" layout={Layout} component={Login}/>
      <AppRoute exact path="/events" layout={Layout} component={Events}/>
      <AppRoute exact path="/login" layout={Layout} component={Login} />
      <AppRoute exact path="/register" layout={Layout} component={Register} />
      <AppRoute exact path="/game1" layout={EmptyLayout} component={Game1} />
      <AppRoute exact path="/game2" layout={EmptyLayout} component={Game2} />
    </Switch>
  </div>
)
export default App;