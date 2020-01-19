import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import AuthController from './controllers/AuthController/AuthController';
import AuthenticationController from './controllers/AuthenticationController/AuthenticationController';
import Dashboard from './components/Dashboard/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path={'/register'} exact component={Signup} /> */}
        <Route path={'/login'} exact component={AuthenticationController} />
        <AuthController>
          <Route path={'/'} exact component={Dashboard} />
        </AuthController>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
