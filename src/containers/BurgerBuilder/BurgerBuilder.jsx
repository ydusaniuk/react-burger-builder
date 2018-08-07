import React from 'react';
import { Burger } from '../../components/Burger/Burger';
import { BuildControls } from '../../components/Burger/BuildControls/BuildControls';
import { Modal } from '../../components/UI/Modal/Modal';
import { OrderSummary } from '../../components/Burger/OrderSummary/OrderSummary';
import { axiosOrders } from '../../axios-orders';
import { Spinner } from '../../components/UI/Spinner/Spinner';

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
    purchasing: false,
    loading: false,
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

  purchaseHandler = () =>
    this.setState(() => {
      return {
        purchasing: true,
      }
    });

  purchaseCanceledHandler = () =>
    this.setState(() => {
      return {
        purchasing: false,
      }
    });

  purchaseContinueHandler = () => {
    this.setState({loading: true});

    axiosOrders
      .post('/orders.json', {
        ingredients: this.state.ingredients,
        price: this.state.totalPrice,
        customer: {
          name: 'Yaroslav Dusaniuk',
          address: {
            street: 'test',
            zipCode: '21000',
            contry: 'Ukraine',
          },
          email: 'yaroslav.dusaniuk@gmail.com',
        },
        deliveryMethod: 'urgent',
      })
      .then(res => this.setState({loading: false, purchasing: false}))
      .catch(err => this.setState({loading: false, purchasing: false}))
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
        <Modal visible={this.state.purchasing} onClosed={this.purchaseCanceledHandler}>
          {
            this.state.loading
              ? <Spinner/>
              : <OrderSummary ingredients={this.state.ingredients}
                              totalPrice={this.state.totalPrice}
                              cancelClicked={this.purchaseCanceledHandler}
                              continueClicked={this.purchaseContinueHandler}/>
          }
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls price={this.state.totalPrice}
                       disabledInfo={disabledInfo}
                       orderClicked={this.purchaseHandler}
                       ingredientAdded={this.addIngredientHandler}
                       ingredientRemoved={this.removeIngredientHandler}
                       purchasable={this.isPurchasable()}/>
      </React.Fragment>
    )
  }
}
