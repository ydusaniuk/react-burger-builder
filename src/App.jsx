import React from 'react';
import { Layout } from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

export const App = () => (
  <div>
    <Layout>
      <BurgerBuilder/>
      <Checkout/>
    </Layout>
  </div>
);
