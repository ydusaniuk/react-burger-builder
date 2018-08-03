import React from 'react';

import styles from './Logo.css';
import burgerLogo from '../../assets/images/burger-logo.png';

export const Logo = props => (
  <div className={styles.Logo}>
    <img src={burgerLogo} alt="burger-logo"/>
  </div>
);
