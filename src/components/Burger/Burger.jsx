import React from 'react';
import styles from './Burger.css';
import { BurgerIngredient } from './BurgerIngredient/BurgerIngredient';

export const Burger = props => {
  return(
    <div className={styles.Burger}>
      <BurgerIngredient type='bread-top'/>
      <BurgerIngredient type='cheese'/>
      <BurgerIngredient type='meat'/>
      <BurgerIngredient type='bread-bottom'/>
    </div>
  )
};
