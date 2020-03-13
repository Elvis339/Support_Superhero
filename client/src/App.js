import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Login from './containers/AuthenticationController/AuthenticationController';
import ClientView from './components/View/Clients/ClientView';
import AuthenticationComponent from './containers/AuthenticatedComponent/AuthenticatedComponent';
import DashboardContainer from './containers/DashboardContainer/DashboardContainer';
import ViewComponent from './components/View/View';
import AddDocumentContainer from './containers/DocumentsContainer/AddDocument/AddDocumentContainer';
import EditContainer from './containers/DocumentsContainer/EditDocument/EditDocumentContainer';
import NewsContainer from './containers/NewsContainer/NewsContainer';
import ActiveCollabController from './containers/ActiveCollabController/ActiveCollabContainer';
import SearchContainer from './containers/SearchContainer/SearchContainer';
import CalculatorContainer from './containers/CalculatorContainer/CalculatorContainer';
// import ReactionStatistics from './components/ReactionStatistics/ReactionStatistics';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-quill/dist/quill.snow.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path={'/register'} exact component={Signup} /> */}
        <Route path={'/login'} exact component={Login} />
        <Route path={'/document/view/:documentId'} exact={true} component={ClientView} />
        <AuthenticationComponent>
          <Route path={'/'} exact component={DashboardContainer} />
          <Route path={'/document/:documentId'} exact component={ViewComponent} />
          <Route path={'/document/edit/:documentId'} exact component={EditContainer} />
          <Route path={'/add'} exact={true} component={AddDocumentContainer} />
          <Route path={'/news'} exact={true} component={NewsContainer} />
          <Route path={'/tasks'} exact={true} component={ActiveCollabController} />
          <Route path={'/search'} exact={true} component={SearchContainer} />
          <Route path={'/calculator'} exact={true} component={CalculatorContainer} />
          {/* <Route path={'/statistics'} exact={true} component={ReactionStatistics} /> */}
        </AuthenticationComponent>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
