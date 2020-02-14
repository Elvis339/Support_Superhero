import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import AuthController from './controllers/AuthController/AuthController';
import AuthenticationController from './controllers/AuthenticationController/AuthenticationController';
import DashboardController from './controllers/DashboardController/DashboardController';
import NewsController from './controllers/NewsController/NewsController';
import ActiveCollabController from './controllers/ActiveCollabController/AcApiController';
import SearchController from './controllers/SearchController/SearchController';
import View from './components/View/View';
import 'bootstrap/dist/css/bootstrap.min.css';

import Editor from './controllers/EditorController/EditorController';
import 'react-quill/dist/quill.snow.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path={'/register'} exact component={Signup} /> */}
        <Route path={'/login'} exact component={AuthenticationController} />
        <AuthController>
          <Route path={'/'} exact component={DashboardController} />
          <Route path={'/view/:documentId'} exact component={View} />
          <Route path={'/add'} exact component={Editor} />
          <Route path={'/news'} exact component={NewsController} />
          <Route path={'/tasks'} exact component={ActiveCollabController} />
          <Route path={'/search'} exact component={SearchController} />
        </AuthController>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
