import React from 'react';
import { connect } from 'react-redux';

import Backdrop from '../Backdrop/Backdrop';

import styles from './ShadowSpinner.css';

class ShadowSpinner extends React.Component {
  render() {
    if (!this.props.showShadowSpinner) return null;

    return (
      <div className={styles.ShadowSpinner}>
        <Backdrop visible/>
        <div className={styles.Loader}>
          <div/><div/><div/><div/><div/><div/></div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    showShadowSpinner: state.app.showShadowSpinner,
  }
};

export default connect(mapStateToProps)(ShadowSpinner);
