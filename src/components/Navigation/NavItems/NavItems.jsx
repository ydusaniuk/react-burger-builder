import React from 'react';
import styles from './NavItems.css';
import { NavItem } from './NavItem/NavItem';

export const NavItems = (props) => (
  <ul className={styles.NavItems}>
    <NavItem onClick={props.onClick} to="/" exact>Burger Builder</NavItem>
    {
      props.isAuthenticated
        ? (
          <React.Fragment>
            <NavItem onClick={props.onClick} to="/orders">Orders</NavItem>
            <NavItem onClick={props.onClick} to="/logout">Logout</NavItem>
          </React.Fragment>
        )
        : <NavItem onClick={props.onClick} to="/auth">Authenticate</NavItem>

    }
  </ul>
);
