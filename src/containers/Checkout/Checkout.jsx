import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../../components/Checkout/ContactData/ContactData';

class Checkout extends React.Component {
  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    return (
      !this.props.ingredients || this.props.purchased
        ? <Redirect to="/"/>
        : (
          <div>
            <CheckoutSummary ingredients={this.props.ingredients}
                             onCancel={this.checkoutCancelHandler}
                             onContinue={this.checkoutContinueHandler}
            />
            <Route path={this.props.match.path + '/contact-data'}
                   component={ContactData}
            />
          </div>
        )
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  }
};

export default connect(mapStateToProps)(Checkout);
