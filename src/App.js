import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import StoreListPage from './pages/StoreListPage';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/store/list" component={StoreListPage} />
      <Route path="*">
        <Redirect to="/store/list" />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default App;
