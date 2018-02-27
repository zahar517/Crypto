import React, { PureComponent } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import LoginPage from '../LoginPage';
import PrivateRoute from '../PrivateRoute';
import UserPage from '../UserPage';

export class AppRouter extends PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ LoginPage } />
        <PrivateRoute path="/trade/:currency" component={ UserPage } />
        <Redirect to="/" />
      </Switch>
    );
  }
}

export default withRouter(AppRouter);
