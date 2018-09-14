import React from 'react';
import styles from './Backdrop.css';

export const Backdrop = props => (
  props.visible ? <div className={styles.Backdrop} onClick={props.clicked}/> : null
);

export default Backdrop;
