import React from 'react';
import { Burger } from '../../components/Burger/Burger';
import { BuildControls } from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.6,
  cheese: 0.4,
  meat: 1.3,
};

export class BurgerBuilder extends React.Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
  };

  isPurchasable = () => {
    const ingredients = {
      ...this.state.ingredients,
    };

    const sum = Object.keys(ingredients)
      .map(key => ingredients[key])
      .reduce((sum, el) => sum + el, 0);

    return sum > 0;
  };

  addIngredientHandler = type => {
    this.setState((prevState) => {
      return {
        ingredients: {
          ...prevState.ingredients,
          [type]: prevState.ingredients[type] + 1,
        },
        totalPrice: prevState.totalPrice + INGREDIENT_PRICES[type]
      }
    });
  };

  removeIngredientHandler = type => {
    if (this.state.ingredients[type] <= 0) return;

    this.setState((prevState) => {
      return {
        ingredients: {
          ...prevState.ingredients,
          [type]: prevState.ingredients[type] - 1,
        },
        totalPrice: prevState.totalPrice - INGREDIENT_PRICES[type]
      }
    });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <React.Fragment>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls price={this.state.totalPrice}
                       ingredientAdded={this.addIngredientHandler}
                       ingredientRemoved={this.removeIngredientHandler}
                       disabled={disabledInfo}
                       purchasable={this.isPurchasable()}/>
      </React.Fragment>
    )
  }
}
