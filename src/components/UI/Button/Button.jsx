import React from 'react';
import styles from './Button.css';

export const Button = ({type, clicked, children}) => (
  <button className={[styles.Button, styles[type]].join(' ')}
          onClick={clicked}>
    {children}
  </button>
);

