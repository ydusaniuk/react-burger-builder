import React from 'react';
import styles from './Burger.css';
import { BurgerIngredient } from './BurgerIngredient/BurgerIngredient';

export const Burger = props => {
  const ingredients = Object
    .keys(props.ingredients)
    .map(key => [...Array(props.ingredients[key])]
      .map((_, i) => <BurgerIngredient key={key + i} type={key}/>)
    )
    .reduce((arr, el) => arr.concat(el), []);

  return (
    <div className={styles.Burger}>
      <BurgerIngredient type='bread-top'/>
      {
        ingredients.length > 0
          ? ingredients
          : <p>Please start adding ingredients!</p>
      }
      <BurgerIngredient type='bread-bottom'/>
    </div>
  )
};
