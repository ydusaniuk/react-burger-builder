import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

import SignIn from '../../components/Auth/SignIn/SignIn';
import SignUp from '../../components/Auth/SignUp/SignUp';
import ForgotPassword from '../../components/Auth/ForgotPassword/ForgotPassword';

class Auth extends React.Component {
  render() {
    if (this.props.isAuthenticated) {
      return (<Redirect to="/"/>);
    }

    return (
      <Switch>
        <Route path={this.props.match.path + '/signUp'} component={SignUp}/>
        <Route path={this.props.match.path + '/signIn'} component={SignIn}/>
        <Route path={this.props.match.path + '/restoreAccess'} component={ForgotPassword}/>
      </Switch>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  }
};

export default connect(mapStateToProps)(Auth);
