import React from 'react';
import styles from './Toolbar.css';
import { Logo } from '../../Logo/Logo';
import { NavItems } from '../NavItems/NavItems';

export const Toolbar = props => (
  <header className={styles.Toolbar}>
    <div>Menu</div>
    <Logo/>
    <nav>
      <NavItems/>
    </nav>
  </header>
);
