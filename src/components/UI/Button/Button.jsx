import React from 'react';
import styles from './Button.css';

const Button = ({type, clicked, disabled, children}) => (
  <button className={[styles.Button, styles[type]].join(' ')}
          onClick={clicked}
          disabled={disabled}>
    {children}
  </button>
);

export default Button;
