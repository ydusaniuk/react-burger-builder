import React from 'react';
import styles from './Layout.css';
import { Toolbar } from '../Navigation/Toolbar/Toolbar';
import { SideDrawer } from '../Navigation/SideDrawer/SideDrawer';

export class Layout extends React.Component {
  state = {
    visibleSideDrawer: false,
  };

  closeSideDrawerHandler = () =>
    this.setState({visibleSideDrawer: false});

  toggleSideDrawerHandler = () =>
    this.setState((prevState) => {
      return {
        visibleSideDrawer: !prevState.visibleSideDrawer,
      }
    });

  render() {
    return (
      <React.Fragment>
        <Toolbar menuClicked={this.toggleSideDrawerHandler}/>
        <SideDrawer open={this.state.visibleSideDrawer} closed={this.closeSideDrawerHandler}/>
        <main className={styles.Content}>
          {this.props.children}
        </main>
      </React.Fragment>
    )
  }
}
