import React from 'react';
import { Route, Redirect} from 'react-router-dom';
import { connect} from 'react-redux';
import { getIsAuthorized } from '../../reducers/auth';

const PrivateRoute = (props) => {
  const { component: Component, isAuthorized, ...rest } = props;
  
  return (
    <Route
      { ...rest }
      render = {
        props => {
          return isAuthorized ? <Component { ...props } /> : <Redirect to="/" />
        }
      }
    />
  );
}

export default connect(
  state => ({ isAuthorized: getIsAuthorized(state) })
)(PrivateRoute);
