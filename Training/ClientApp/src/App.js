import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import React from 'react';
import { Route, Switch } from 'react-router';
import { Layout } from './components/Layout';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { role } from './components/services/Auth-header';

import { TeachersEvents } from './components/TeachersEvents';
import { SchoolchildsEvents } from './components/SchoolchildsEvents';
import { TeachersSchoolchilds } from './components/TeachersSchoolchilds';

import { Games } from './components/Games';
import Game1 from './components/Games/Game1';
import Game2 from './components/Games/Game2';

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
      {role() === "Teacher" ? <AppRoute exact path="/" layout={Layout} component={TeachersEvents} /> : null}
      {role() === "Teacher" ? <AppRoute exact path="/events" layout={Layout} component={TeachersEvents}/> : null}
      {role() === "Teacher" ? <AppRoute exact path="/schoolchilds" layout={Layout} component={TeachersSchoolchilds}/> : null}
      {role() === "Teacher" ? <AppRoute exact path="/games" layout={Layout} component={Games} /> : null }
      {role() === "Schoolchild" ? <AppRoute exact path="/" layout={Layout} component={SchoolchildsEvents} /> : null}
      {role() === "Schoolchild" ? <AppRoute exact path="/events" layout={Layout} component={SchoolchildsEvents} /> : null}
      {
        //role() === "Schoolchild" ? <AppRoute exact path="/event" layout={Layout} component={Event}/> : null
      }
      <AppRoute exact path="/login" layout={Layout} component={Login} />
      <AppRoute exact path="/register" layout={Layout} component={Register} />
      {
        //games
      }
      <AppRoute exact path="/game1" layout={EmptyLayout} component={Game1} />
      <AppRoute exact path="/game2" layout={EmptyLayout} component={Game2} />
      <AppRoute exact path="/*" layout={Layout} component={Login}/>
    </Switch>
  </div>
)
export default App;