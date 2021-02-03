import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import * as ROUTES from '../constants/routes';
import {UserContext} from "./UserProvider"
import {auth} from "./firebase"

const withoutAuthorization = condition => Component => {
  class WithoutAuthorization extends React.Component {
    componentDidMount() {
      this.listener = auth.onAuthStateChanged(
        user => {
          if (!condition(user)) {
            this.props.history.push(ROUTES.HOME);
          }
        },
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <UserContext.Consumer>
          {user =>
            condition(user) ? <Component {...this.props} /> : null
          }
        </UserContext.Consumer>
      );
    }
  }

  return compose(
    withRouter,
  )(WithoutAuthorization);
};

export default withoutAuthorization;