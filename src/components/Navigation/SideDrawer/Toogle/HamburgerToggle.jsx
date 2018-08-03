import React from 'react';
import styles from './HamburgerToggle.css';

export const HamburgerToggle = (props) => (
  <div className={styles.HamburgerToggle} onClick={props.clicked}>
    <div/>
    <div/>
    <div/>
  </div>
);
