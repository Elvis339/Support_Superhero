import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import AuthenticatedComponent from './AuthenticatedComponent';
import Login from './Login'
import Signup from './Signup'
import Home from './Home'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={'/'} exact component={Signup} />
        <Route path={'/login'} exact component={Login} />
        <AuthenticatedComponent>
          <Route path={'/home'} exact component={Home} />
        </AuthenticatedComponent>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
