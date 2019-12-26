import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import AuthenticatedComponent from '../containers/Authenticated/AuthenticatedComponent';
import Login from '../containers/Login/Login'
import Signup from '../containers/Signup/Signup'
import Home from '../containers/Home/Home'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={'/register'} exact component={Signup} />
        <Route path={'/login'} exact component={Login} />
        <AuthenticatedComponent>
          <Route path={'/'} exact component={Home} />
        </AuthenticatedComponent>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
