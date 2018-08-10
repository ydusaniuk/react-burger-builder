import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Layout } from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

export const App = () => (
  <BrowserRouter>
    <div>
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/" component={BurgerBuilder}/>
        </Switch>
      </Layout>
    </div>
  </BrowserRouter>
);
