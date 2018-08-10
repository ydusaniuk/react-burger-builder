import React from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends React.Component {
  state = {
    ingredients: null,
    price: 0,
  };


  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === 'price') {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }

    }
    this.setState({ingredients, price});
  }

  render() {
    return (
      <div>
        <CheckoutSummary ingredients={this.state.ingredients}
                         onCancel={this.checkoutCancelHandler}
                         onContinue={this.checkoutContinueHandler}
        />
        <Route path={this.props.match.path + '/contact-data'}
               render={() => (<ContactData totalPrice={this.state.price}
                                           ingredients={this.state.ingredients}/>)}
        />
      </div>
    );
  }
}

export default Checkout;
