import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import styles from './Layout.css';
import { Toolbar } from '../../components/Navigation/Toolbar/Toolbar';
import { SideDrawer } from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends React.Component {
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
        <Toolbar isAuthenticated={this.props.isAuthenticated} menuClicked={this.toggleSideDrawerHandler}/>
        <SideDrawer isAuthenticated={this.props.isAuthenticated} open={this.state.showSideDrawer} closed={this.closeSideDrawerHandler}/>
        <main className={styles.Content}>
          {this.props.children}
        </main>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  }
};

export default withRouter(connect(mapStateToProps)(Layout))
