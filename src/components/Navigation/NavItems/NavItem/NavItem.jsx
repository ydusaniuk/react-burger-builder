import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavItem.css';

export const NavItem = props => (
  <li className={styles.NavItem}>
    <NavLink activeClassName={styles.active}
             to={props.to}
             exact={props.exact}>
      {props.children}
    </NavLink>
  </li>
);
