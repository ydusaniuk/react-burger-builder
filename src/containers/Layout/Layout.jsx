import React from 'react';
import styles from './Layout.css';
import { Toolbar } from '../../components/Navigation/Toolbar/Toolbar';
import { SideDrawer } from '../../components/Navigation/SideDrawer/SideDrawer';

export class Layout extends React.Component {
  state = {
    showSideDrawer: false,
  };

  closeSideDrawerHandler = () =>
    this.setState({showSideDrawer: false});

  toggleSideDrawerHandler = () =>
    this.setState((prevState) => {
      return {
        showSideDrawer: !prevState.showSideDrawer,
      }
    });

  render() {
    return (
      <React.Fragment>
        <Toolbar menuClicked={this.toggleSideDrawerHandler}/>
        <SideDrawer open={this.state.showSideDrawer} closed={this.closeSideDrawerHandler}/>
        <main className={styles.Content}>
          {this.props.children}
        </main>
      </React.Fragment>
    )
  }
}
