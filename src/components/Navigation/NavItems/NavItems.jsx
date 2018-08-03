import React from 'react';
import styles from './NavItems.css';
import { NavItem } from './NavItem/NavItem';

export const NavItems = () => (
  <ul className={styles.NavItems}>
    <NavItem to="/" active>Burger Builder</NavItem>
    <NavItem to="/">Checkout Page</NavItem>
  </ul>
);
