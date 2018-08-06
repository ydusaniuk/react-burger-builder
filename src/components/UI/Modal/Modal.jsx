import React from 'react';
import styles from './Modal.css';
import { Backdrop } from '../Backdrop/Backdrop';

export class Modal extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.visible !== this.props.visible;
  }

  render() {
    return (
      <React.Fragment>
        <Backdrop visible={this.props.visible} clicked={this.props.modalClosed}/>
        <div className={styles.Modal}
             style={{
               transform: this.props.visible ? 'translateY(0)' : 'translateY(-100vh)',
               opacity: this.props.visible ? '1' : '0',
             }}>
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}
