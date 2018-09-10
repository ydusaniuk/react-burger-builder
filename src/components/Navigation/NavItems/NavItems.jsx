import React from 'react';
import styles from './NavItems.css';
import { NavItem } from './NavItem/NavItem';

export const NavItems = (props) => (
  <ul className={styles.NavItems}>
    <NavItem to="/" exact>Burger Builder</NavItem>
    <NavItem to="/orders">Orders</NavItem>
    {
      props.isAuthenticated
        ? <NavItem to="/logout">Logout</NavItem>
        : <NavItem to="/auth">Authenticate</NavItem>
    }
  </ul>
);
