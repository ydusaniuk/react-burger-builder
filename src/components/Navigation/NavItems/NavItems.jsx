import React from 'react';
import styles from './NavItems.css';
import { NavItem } from './NavItem/NavItem';

export const NavItems = (props) => (
  <ul className={styles.NavItems}>
    <NavItem to="/" exact>Burger Builder</NavItem>
    {
      props.isAuthenticated
        ? (
          <React.Fragment>
            <NavItem to="/orders">Orders</NavItem>
            <NavItem to="/logout">Logout</NavItem>
          </React.Fragment>
        )
        : <NavItem to="/auth">Authenticate</NavItem>

    }
  </ul>
);
