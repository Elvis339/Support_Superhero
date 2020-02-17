import React from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import AuthController from './controllers/AuthController/AuthController';
import AuthenticationController from './controllers/AuthenticationController/AuthenticationController';
import DashboardController from './controllers/DashboardController/DashboardController';
import NewsController from './controllers/NewsController/NewsController';
import ActiveCollabController from './controllers/ActiveCollabController/AcApiController';
import SearchController from './controllers/SearchController/SearchController';
import View from './components/View/View';
import ClientView from './components/View/Clients/ClientView';
import 'bootstrap/dist/css/bootstrap.min.css';

import Editor from './controllers/EditorController/EditorController';
import 'react-quill/dist/quill.snow.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path={'/register'} exact component={Signup} /> */}
        <Route path={'/login'} exact component={AuthenticationController} />
        <Route path={'/document/view/:documentId'} exact={true} component={ClientView} />
        <AuthController>
          <Route path={'/'} exact component={DashboardController} />
          <Route path={'/document/:documentId'} exact component={View} />
          <Route path={'/add'} exact={true} component={Editor} />
          <Route path={'/news'} exact={true} component={NewsController} />
          <Route path={'/tasks'} exact={true} component={ActiveCollabController} />
          <Route path={'/search'} exact={true} component={SearchController} />
        </AuthController>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
