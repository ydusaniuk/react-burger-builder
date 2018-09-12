import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import SignIn from '../../components/Auth/SignIn/SignIn';
import SignUp from '../../components/Auth/SignUp/SignUp';

class Auth extends React.Component {
  render() {
    if (this.props.isAuthenticated) {
      return (<Redirect to="/"/>);
    }

    return (
      <Switch>
        <Route path={this.props.match.path + '/signIn'} component={SignIn}/>
        <Route path={this.props.match.path + '/signUp'} component={SignUp}/>
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
