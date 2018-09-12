import React from 'react';
import styles from './NavItems.css';
import NavItem from './NavItem/NavItem';

const NavItems = (props) => (
  <ul className={styles.NavItems}>
    <NavItem onClick={props.onClick} to="/" exact>Burger Builder</NavItem>
    {
      props.isAuthenticated
        ? <React.Fragment>
          <NavItem onClick={props.onClick} to="/orders" exact>Orders</NavItem>
          <NavItem onClick={props.onClick} to="/logout" exact>Logout</NavItem>
        </React.Fragment>
        : <React.Fragment>
          <NavItem onClick={props.onClick} to="/auth/signIn" exact>Sign in</NavItem>
          <label className={styles.TextSeparator}>or</label>
          <NavItem onClick={props.onClick} to="/auth/signUp" exact>Sign up</NavItem>
        </React.Fragment>
    }
  </ul>
);

export default NavItems;
