import React from 'react';
import styles from './NavItem.css';

export const NavItem = props => (
  <li className={styles.NavItem}>
    <a className={props.active ? styles.active : null}
       href={props.to}>
      {props.children}
    </a>
  </li>
);
