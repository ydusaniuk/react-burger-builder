import React from 'react';
import styles from './NavItems.css';
import NavItem from './NavItem/NavItem';

const NavItems = (props) => {
  const links = [
    { to: '/', label: 'Burger Builder' }
  ];

  if (props.isAuthenticated) {
    links.push({ to: '/orders', label: 'Orders' });
    links.push({ to: '/logout', label: 'Logout' });
  } else {
    links.push({ to: '/auth', label: 'Authenticate' });
  }

  return (
    <ul className={styles.NavItems}>
      {
        links.map((link) =>
          <NavItem key={link.to} onClick={props.onClick} to={link.to}>
            {link.label}
          </NavItem>
        )
      }
    </ul>
  )
};

export default NavItems;
