import React from 'react';

import { Logo } from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import { HamburgerToggle } from '../SideDrawer/Toogle/HamburgerToggle';

import styles from './Toolbar.css';

export const Toolbar = props => (
  <header className={styles.Toolbar}>
    <HamburgerToggle clicked={props.menuClicked}/>
    <div className={styles.Logo}>
      <Logo/>
    </div>
    <nav className={styles.DesktopOnly}>
      <NavItems isAuthenticated={props.isAuthenticated}/>
    </nav>
  </header>
);
