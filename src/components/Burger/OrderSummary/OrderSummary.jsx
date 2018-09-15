import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../UI/Button/Button';

const OrderSummary = props => (
  <React.Fragment>
    <h3>Your Order</h3>
    <p>A delicious burger with the following ingredients:</p>
    <ul>
      {
        Object.keys(props.ingredients || {})
          .map(key =>
            <li key={key}>
              <span style={{ textTransform: 'capitalize' }}>{key}</span>: {props.ingredients[key]}
            </li>)
      }
    </ul>
    <p><strong>Total Price: {props.totalPrice.toFixed(2)}</strong></p>
    <p>Continue to checkout?</p>
    <Button type="Danger" clicked={props.cancelClicked}>Cancel</Button>
    <Button type="Success" clicked={props.continueClicked}>Continue</Button>
  </React.Fragment>
);

OrderSummary.propTypes = {
  ingredients: PropTypes.object,
  totalPrice: PropTypes.number,
  cancelClicked: PropTypes.func.isRequired,
  continueClicked: PropTypes.func.isRequired,
};

export default OrderSummary;
