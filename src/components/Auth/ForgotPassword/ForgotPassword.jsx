import React from 'react';
import { connect } from 'react-redux';

import Form from '../../UI/Form/Form';
import Panel from '../../UI/Panel/Panel';

import authActions from '../../../store/actions/auth.actions';

import styles from './ForgotPassword.css';
import panelStyles from '../../UI/Panel/Panel.css';

class ForgotPassword extends React.Component {
  controls = {
    email: {
      id: '#forgotPassword_email',
      type: 'input',
      label: 'Enter your email address and we will send you a link to reset your password.',
      elementType: 'email',
      value: '',

      validation: {
        isValid: false,
        touched: false,
        required: true,
      },
    },
  };

  onSubmitHandler = (e, data) => {
    e.preventDefault();
    this.props.onRequestObbCode(data.email);
  };

  render() {
    return (
      <div className={styles.ForgotPassword}>
        <Panel>
          <label className={panelStyles.PanelTitle}>Reset your password</label>
          {
            this.props.requestOobCodeLoadStatus.loaded
              ? (
                <div className={styles.SuccessBlock}>
                  Please check out your email and follow the instructions
                  <a className={styles.Link} onClick={() => this.props.history.goBack()}>Go back</a>
                </div>
              )
              : (
                <React.Fragment>
                  <Form controls={this.controls} onSubmit={this.onSubmitHandler}/>
                  {this.props.requestOobCodeLoadStatus.error &&
                  <p>{this.props.requestOobCodeLoadStatus.error.message}</p>}
                </React.Fragment>
              )
          }
        </Panel>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    requestOobCodeLoadStatus: state.auth.requestOobCodeLoadStatus,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onRequestObbCode: (email) => dispatch(authActions.requestObbCode(email)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
