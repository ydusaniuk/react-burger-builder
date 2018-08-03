import React from 'react';
import styles from './Modal.css';

export const Modal = props => (
  <div className={styles.Modal}
       style={{
         transform: props.visible ? 'translateY(0)' : 'translateY(-100vh)',
         opacity: props.visible ? '1' : '0',
       }}>
    {props.children}
  </div>
);
