import React from 'react';

import Backdrop  from '../Backdrop/Backdrop';

import styles from './Spinner.css';

export const Spinner = () => (
  <div className={styles.Spinner}>
    <Backdrop visible />
    <div className={styles.Loader}>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
    </div>
  </div>
);

export default Spinner;
