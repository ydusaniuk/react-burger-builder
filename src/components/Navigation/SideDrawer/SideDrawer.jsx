import React from 'react';
import styles from './SideDrawer.css';

import { Logo } from '../../Logo/Logo';
import { NavItems } from '../NavItems/NavItems';
import { Backdrop } from '../../UI/Backdrop/Backdrop';

export const SideDrawer = props => {
  const statusClassName = props.open ? 'Open' : 'Close';
  const sideDrawerClasses = [
    styles.SideDrawer,
    styles[statusClassName]
  ].join(' ');

  return (
    <React.Fragment>
      <Backdrop clicked={props.closed} visible={props.open}/>
      <div className={sideDrawerClasses}>
        <div className={styles.Logo}>
          <Logo/>
        </div>
        <nav>
          <NavItems onClick={props.closed} isAuthenticated={props.isAuthenticated}/>
        </nav>
      </div>
    </React.Fragment>
  );
};
