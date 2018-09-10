import React from 'react';
import styles from './Order.css';

const Order = props => {
  const ingredients = [];

  for (let ig in props.ingredients) {
    ingredients.push({
      name: ig,
      amount: props.ingredients[ig],
    });
  }

  return (
    <div className={styles.Order}>
      <p>Ingredients: {
        ingredients.map(ig => <span className={styles.Ingredient}
                                    key={ig.name}>
          {ig.name} ({ig.amount})
        </span>)
      }</p>
      <p>Price: <strong>USD {Number(props.price).toFixed(2)}</strong></p>
    </div>
  );
};

export default Order;
