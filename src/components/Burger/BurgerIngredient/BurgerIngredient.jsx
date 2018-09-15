import React from 'react';
import PropTypes from 'prop-types';

import styles from './BurgerIngredient.css';

const BurgerIngredient = props => {
  switch (props.type) {
    case 'bread-top':
      return (
        <div className={styles.BreadTop}>
          <div className={styles.Seeds1}/>
          <div className={styles.Seeds2}/>
        </div>
      );

    case 'bread-bottom':
      return <div className={styles.BreadBottom}/>;

    case 'meat':
      return <div className={styles.Meat}/>;

    case 'cheese':
      return <div className={styles.Cheese}/>;

    case 'salad':
      return <div className={styles.Salad}/>;

    case 'bacon':
      return <div className={styles.Bacon}/>;

    default:
      return null;
  }
};

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired,
};

export default BurgerIngredient;
