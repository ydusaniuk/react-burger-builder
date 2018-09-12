import React from 'react';
import { connect } from 'react-redux';

import Form from '../../UI/Form/Form';
import Spinner from '../../UI/Spinner/Spinner';

import authActions from '../../../store/actions/auth.actions';

import styles from './SignUp.css';

class SignUp extends React.Component {
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
    repeatPassword: {
      type: 'input',
      elementType: 'password',
      placeholder: 'repeat password',
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

    if (data.password !== data.repeatPassword) {
      alert('Passwords doesn\'t match');
      return;
    }

    this.props.onAuth(data.email, data.password, true);
  };

  render() {
    return (
      <div className={styles.SignUp}>
        <label className={styles.Title}>Create new account</label>
        {
          this.props.loading
            ? <Spinner/> : (
              <React.Fragment>
                <Form controls={this.controls} onSubmit={this.onSubmitHandler}/>
                {this.props.error && <p>{this.props.error.message}</p>}
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
