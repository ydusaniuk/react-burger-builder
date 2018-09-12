import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { Button, Spinner } from '../../components/UI';
import styles from './Auth.css';
import authActions from '../../store/actions/auth.actions';
import Form from '../../components/UI/Form/Form';

class Auth extends React.Component {
  controls = {
    email: {
      type: 'input',
      elementType: 'email',
      placeholder: 'your@email.com',
      value: '',

      validation: {
        isValid: false,
        touched: false,
        required: true,
      },
    },
    password: {
      type: 'input',
      elementType: 'password',
      placeholder: 'password',
      value: '',

      validation: {
        isValid: false,
        touched: false,
        required: true,
        minLength: 6,
      },
    },
  };

  state = {
    isSigningUp: false,
  };

  onSubmitHandler = (e, data) => {
    e.preventDefault();
    this.props.onAuth(data.email, data.password, this.state.isSigningUp);
  };

  switchAuthModeHandler = () =>
    this.setState(prevState => {
      return {
        isSigningUp: !prevState.isSigningUp,
      }
    });

  render() {
    if (this.props.isAuthenticated) {
      return (<Redirect to="/"/>);
    }

    return (
      <div className={styles.Auth}>
        <label>
          {this.state.isSigningUp ? 'Sign Up' : 'Sign In'}
        </label>
        {
          this.props.loading
            ? <Spinner/> : (
              <React.Fragment>
                <Form controls={this.controls} onSubmit={this.onSubmitHandler}/>
                {this.props.error && <p>{this.props.error.message}</p>}
                <Button type='Danger' clicked={this.switchAuthModeHandler}>
                  {this.state.isSigningUp ? 'Already have an account?' : 'Create new account'}
                </Button>
              </React.Fragment>
            )
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSigningUp) => dispatch(authActions.authenticate(email, password, isSigningUp)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
