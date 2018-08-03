import React from 'react';
import styles from './Modal.css';
import { Backdrop } from '../Backdrop/Backdrop';

export const Modal = props => (
  <React.Fragment>
    <Backdrop visible={props.visible} clicked={props.modalClosed}/>
    <div className={styles.Modal}
         style={{
           transform: props.visible ? 'translateY(0)' : 'translateY(-100vh)',
           opacity: props.visible ? '1' : '0',
         }}>
      {props.children}
    </div>
  </React.Fragment>
);
