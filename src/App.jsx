import React from 'react';
import { Layout } from './containers/Layout/Layout';
import { BurgerBuilder } from './containers/BurgerBuilder/BurgerBuilder';

export class App extends React.Component {
  render() {
    return (
      <div>
        <Layout>
          <BurgerBuilder/>
        </Layout>
      </div>
    );
  }
}
