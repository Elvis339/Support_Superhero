import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import AuthController from './controllers/AuthController/AuthController';
import AuthenticationController from './controllers/AuthenticationController/AuthenticationController';
import DashboardController from './controllers/DashboardController/DashboardController';
import 'bootstrap/dist/css/bootstrap.min.css';

// import 'react-quill/dist/quill.snow.css';
// import Editor from './controllers/EditorController/EditorController';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path={'/register'} exact component={Signup} /> */}
        <Route path={'/login'} exact component={AuthenticationController} />
        <AuthController>
          <Route path={'/'} exact component={DashboardController} />
        </AuthController>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
