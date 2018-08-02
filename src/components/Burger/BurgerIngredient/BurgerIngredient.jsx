import React from 'react';
import PropTypes from 'prop-types';

import styles from './BurgerIngredient.css';

export class BurgerIngredient extends React.Component {
  render() {
      switch (this.props.type) {
        case 'bread-bottom':
          return <div className={styles.BreadBottom}/>;

        case 'bread-top':
          return  (
            <div className={styles.BreadTop}>
              <div className={styles.Seeds1}/>
              <div className={styles.Seeds2}/>
            </div>
          );

        case 'meat':
          return  <div className={styles.Meat}/>;

        case 'cheese':
          return <div className={styles.Cheese}/>;

        case 'salad':
          return  <div className={styles.Salad}/>;

        case 'bacon':
          return  <div className={styles.Bacon}/>;

        default:
          return null;
      }
  }
}

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired,
};
