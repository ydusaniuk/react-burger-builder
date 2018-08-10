import React from 'react';
import PropTypes from 'prop-types';
import styles from './CheckoutSummary.css';

import { Burger } from '../../Burger/Burger';
import { Button } from '../../UI/Button/Button';

class CheckoutSummary extends React.Component {
  render() {
    return (
      <div className={styles.CheckoutSummary}>
        <h1>We hope it tastes well!</h1>
        <div style={{width: '100%', margin: 'auto'}}>
          <Burger ingredients={this.props.ingredients}/>
        </div>
        <Button type="Danger"
                clicked={() => {}}>
          Cancel
        </Button>
        <Button type="Success"
                clicked={() => {}}>
          Continue
        </Button>
      </div>
    );
  }
}

CheckoutSummary.propTypes = {
  ingredients: PropTypes.object.isRequired,
};

export default CheckoutSummary;
