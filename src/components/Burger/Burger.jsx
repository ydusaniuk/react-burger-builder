import React from 'react';
import PropTypes from 'prop-types';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

import styles from './Burger.css';

const Burger = props => (
  <div className={styles.Burger}>
    <BurgerIngredient type='bread-top'/>
    {
      Object
        .keys(props.ingredients || {})
        .map(key => [...Array(props.ingredients[key])]
          .map((_, i) => <BurgerIngredient key={key + i} type={key}/>)
        )
        .reduce((arr, el) => arr.concat(el), [])
    }
    <BurgerIngredient type='bread-bottom'/>
  </div>
);

Burger.propTypes = {
  ingredients: PropTypes.object,
};

export default Burger;
