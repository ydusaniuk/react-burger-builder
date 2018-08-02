import React from 'react';

export const Layout = (props) => (
  <React.Fragment>
    <div>
      Toolbar, SideDrawer, Backdrop
    </div>
    <main>
      {props.children}
    </main>
  </React.Fragment>
);
