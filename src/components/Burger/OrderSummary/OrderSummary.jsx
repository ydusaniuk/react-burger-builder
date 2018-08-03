import React from 'react';

export const OrderSummary = ({ingredients}) => (
  <React.Fragment>
    <h3>Your Order</h3>
    <p>A delicious burger with the following ingredients:</p>
    <ul>
      {
        Object.keys(ingredients)
          .map(key =>
            <li key={key}>
              <span style={{textTransform: 'capitalize'}}>{key}</span>: {ingredients[key]}
            </li>)
      }
    </ul>
    <p>Continue to checkout?</p>
  </React.Fragment>
);
