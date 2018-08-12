import React from 'react';
import styles from './NavItems.css';
import { NavItem } from './NavItem/NavItem';

export const NavItems = () => (
  <ul className={styles.NavItems}>
    <NavItem to="/" exact>Burger Builder</NavItem>
    <NavItem to="/orders">Orders</NavItem>
  </ul>
);
