import React from 'react';
import { Modal } from '../../components/UI/Modal/Modal';

export const withErrorHandler = (Component, axios) => {

  return class extends React.Component {
    state = {
      error: null,
    };

    errorConfirmedHandler = () => {
      this.setState({error: null})
    };

    componentWillMount() {
      axios.interceptors.request.use(res => {
        this.errorConfirmedHandler();
        return res;
      });

      axios.interceptors.response.use(res => res, err => {
        console.error(err);
        this.setState({error: err});
      });
    }

    render() {
      return (
        <React.Fragment>
          <Modal visible={this.state.error !== null} onClosed={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <Component {...this.props}/>
        </React.Fragment>
      );
    }
  }

};
