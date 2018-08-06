import React from 'react';
import { Layout } from './containers/Layout/Layout';
import { BurgerBuilder } from './containers/BurgerBuilder/BurgerBuilder';

export const App = () => (
  <div>
    <Layout>
      <BurgerBuilder/>
    </Layout>
  </div>
);
