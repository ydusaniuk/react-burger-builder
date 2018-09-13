import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import authActions from '../../../store/actions/auth.actions';

class Logout extends React.Component {
  componentDidMount() {
    this.props.onLogout();
  }

  render() {
    return <Redirect to="/"/>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(authActions.logout())
  }
};

export default connect(null, mapDispatchToProps)(Logout);
