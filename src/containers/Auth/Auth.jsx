import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Input, Button, Spinner } from '../../components/UI';
import styles from './Auth.css';
import authActions from '../../store/actions/auth.actions';
import { checkValidity } from '../../shared/validation.utility';

class Auth extends React.Component {
  state = {
    isSigningUp: false,
    controls: [
      {
        key: 'email',
        value: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'E-Mail',
          },
          elementValue: '',
          validation: {
            isValid: false,
            touched: false,
            required: true,
          },
        }
      },
      {
        key: 'password',
        value: {
          elementType: 'input',
          elementConfig: {
            type: 'password',
            placeholder: 'Password',
          },
          elementValue: '',
          validation: {
            isValid: false,
            touched: false,
            required: true,
            minLength: 6,
          },
        }
      },
    ]
  };

  inputChangedHandler = ({ target }, inputKey) => {
    this.setState((prevState) => {
      const controls = _.cloneDeep(prevState.controls);

      const input = controls.find(p => p.key === inputKey).value;
      input.elementValue = target.value;

      if (input.validation) {
        input.validation.isValid = checkValidity(target.value, input.validation);
        input.validation.touched = true;
      }

      return ({ controls });
    });
  };


  isFormValid = () => {
    return this.state.controls
      .every(({ value }) => value.validation && value.validation.isValid);
  };

  onSubmitHandler = (e) => {
    e.preventDefault();

    const email = this.state.controls.find(e => e.key === 'email').value.elementValue;
    const password = this.state.controls.find(e => e.key === 'password').value.elementValue;

    this.props.onAuth(email, password, this.state.isSigningUp);
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
          {
            this.state.isSigningUp
              ? 'Sign Up'
              : 'Sign In'
          }
        </label>
        {
          this.props.loading
            ? <Spinner/>
            : (
              <React.Fragment>
                <form onSubmit={this.onSubmitHandler}>
                  {
                    this.state.controls.map(({ key, value }) => {
                      return <Input key={key}
                                    elementType={value.elementType}
                                    config={value.elementConfig}
                                    value={value.elementValue}
                                    validation={value.validation}
                                    onChange={(e) => this.inputChangedHandler(e, key)}/>
                    })
                  }
                  {this.props.error && <p>{this.props.error.message}</p>}
                  <Button type="Success" disabled={!this.isFormValid()}>SUBMIT</Button>
                </form>
                <Button type='Danger' clicked={this.switchAuthModeHandler}>
                  {
                    this.state.isSigningUp
                      ? 'Already have an account?'
                      : 'Create new account'
                  }
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
