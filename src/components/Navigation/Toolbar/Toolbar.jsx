import React from 'react';
import styles from './Toolbar.css';
import { Logo } from '../../Logo/Logo';
import { NavItems } from '../NavItems/NavItems';
import { HamburgerToggle } from '../SideDrawer/Toogle/HamburgerToggle';

export const Toolbar = props => (
  <header className={styles.Toolbar}>
    <HamburgerToggle clicked={props.menuClicked}/>
    <div className={styles.Logo}>
      <Logo/>
    </div>
    <nav className={styles.DesktopOnly}>
      <NavItems/>
    </nav>
  </header>
);
