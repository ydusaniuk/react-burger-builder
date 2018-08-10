import React from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends React.Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1,
    }
  };


  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};

    for (let param of query.entries()) {
      ingredients[param[0]] = +param[1];
    }
    this.setState({ingredients});
  }

  render() {
    return (
      <div>
        <CheckoutSummary ingredients={this.state.ingredients}
                         onCancel={this.checkoutCancelHandler}
                         onContinue={this.checkoutContinueHandler}
        />
        <Route path={this.props.match.path + '/contact-data'}
               component={ContactData}
        />
      </div>
    );
  }
}

export default Checkout;
