import React from 'react';
import PropTypes from 'prop-types';
import styles from './CheckoutSummary.css';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const CheckoutSummary = props => (
  <div className={styles.CheckoutSummary}>
    <h1>We hope it tastes well!</h1>
    <div style={{ width: '100%', margin: 'auto' }}>
      <Burger ingredients={props.ingredients}/>
    </div>
    <Button type="Danger"
            clicked={props.onCancel}>Cancel</Button>
    <Button type="Success"
            clicked={props.onContinue}>Continue</Button>
  </div>
);

CheckoutSummary.propTypes = {
  ingredients: PropTypes.object.isRequired,
  onCancel: PropTypes.func,
  onContinue: PropTypes.func,
};

export default CheckoutSummary;
