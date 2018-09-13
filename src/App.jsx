import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Layout from './containers/Layout/Layout';
import Logout from './components/Auth/Logout/Logout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

import authActions from './store/actions/auth.actions';

import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncAuth = asyncComponent(() => import('./containers/Auth/Auth'));
const asyncOrders = asyncComponent(() => import('./containers/Orders/Orders'));
const asyncCheckout = asyncComponent(() => import('./containers/Checkout/Checkout'));

class App extends React.Component {
  componentDidMount() {
    this.props.onTryAutoSignUp();
  }

  render() {
    const routes = !this.props.isAuthenticated
      ? (
        <Switch>
          <Route path="/auth" component={asyncAuth}/>
          <Route path="/" exact component={BurgerBuilder}/>
          <Redirect to="/"/>
        </Switch>
      )
      : (
        <Switch>
          <Route path="/checkout" component={asyncCheckout}/>
          <Route path="/orders" component={asyncOrders}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/" exact component={BurgerBuilder}/>
          <Redirect to="/"/>
        </Switch>
      );

    return (
      <BrowserRouter>
        <div>
          <Layout>{routes}</Layout>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(authActions.tryAutoLogin()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
