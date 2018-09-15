import React from 'react';
import PropTypes from 'prop-types';

import BuildControl from './BuildControl/BuildControl';

import styles from './BuildControls.css';

const CONTROLS = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const BuildControls = props => (
  <div className={styles.BuildControls}>
    <p>Price: <strong>{props.price.toFixed(2)}</strong></p>
    {
      CONTROLS.map(ctrl =>
        <BuildControl key={ctrl.label}
                      label={ctrl.label}
                      lessDisabled={props.disabledInfo[ctrl.type]}
                      moreClicked={() => props.ingredientAdded(ctrl.type)}
                      lessClicked={() => props.ingredientRemoved(ctrl.type)}/>)
    }
    {
      props.isAuthenticated
        ? <button disabled={!props.purchasable}
                  onClick={props.orderClicked}
                  className={styles.OrderButton}>ORDER NOW</button>
        : <label>SIGN UP TO ORDER</label>
    }
  </div>
);

BuildControl.propTypes = {
  purchasable: PropTypes.bool,
  price: PropTypes.number,
  disabledInfo: PropTypes.arrayOf(PropTypes.bool),

  orderClicked: PropTypes.func,
  ingredientAdded: PropTypes.func,
  ingredientRemoved: PropTypes.func,
};

export default BuildControls;
