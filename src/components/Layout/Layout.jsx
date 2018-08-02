import React from 'react';
import styles from './Layout.css';

export const Layout = (props) => (
  <React.Fragment>
    <div>
      Toolbar, SideDrawer, Backdrop
    </div>
    <main className={styles.Content}>
      {props.children}
    </main>
  </React.Fragment>
);
