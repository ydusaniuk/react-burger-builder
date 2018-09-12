import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Form from '../../UI/Form/Form';
import Spinner from '../../UI/Spinner/Spinner';

import authActions from '../../../store/actions/auth.actions';

import styles from './SignIn.css';

class SignIn extends React.Component {
  controls = {
    email: {
      id: '#signin_email',
      type: 'input',
      label: 'Email',
      elementType: 'email',
      value: '',

      validation: {
        isValid: false,
        touched: false,
        required: true,
      },
    },
    password: {
      id: '#signin_password',
      type: 'input',
      label: 'Password',
      elementType: 'password',
      value: '',

      validation: {
        isValid: false,
        touched: false,
        required: true,
        minLength: 6,
      },
    },
  };

  onSubmitHandler = (e, data) => {
    e.preventDefault();
    this.props.onAuth(data.email, data.password, false);
  };

  render() {
    return (
      <div className={styles.SignIn}>
        <label className={styles.Title}>Sign In</label>
        {
          this.props.loading
            ? <Spinner/> : (
              <React.Fragment>
                <Form controls={this.controls} onSubmit={this.onSubmitHandler}/>
                {this.props.error && <p>{this.props.error.message}</p>}
                <label className={styles.Hint}>
                  Doesn't have an account?
                  <Link className={styles.Link} to="/auth/signUp">Create it</Link>
                </label>
              </React.Fragment>
            )
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSigningUp) => dispatch(authActions.authenticate(email, password, isSigningUp)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
