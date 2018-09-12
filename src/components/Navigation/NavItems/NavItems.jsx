import React from 'react';
import styles from './NavItems.css';
import NavItem from './NavItem/NavItem';

const NavItems = (props) => (
  <ul className={styles.NavItems}>
    <NavItem to="/" exact>Burger Builder</NavItem>
    {
      props.isAuthenticated
        ? <React.Fragment>
          <NavItem to="/orders" exact>Orders</NavItem>
          <NavItem to="/logout" exact>Logout</NavItem>
        </React.Fragment>
        : <React.Fragment>
          <NavItem to="/auth/signIn" exact>Sign in</NavItem>
          <NavItem to="/auth/signUp" exact>Sign up</NavItem>
        </React.Fragment>
    }
  </ul>
);

export default NavItems;
