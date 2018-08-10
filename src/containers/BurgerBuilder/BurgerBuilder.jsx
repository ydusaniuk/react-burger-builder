import React from 'react';
import { Burger } from '../../components/Burger/Burger';
import { BuildControls } from '../../components/Burger/BuildControls/BuildControls';
import { Modal } from '../../components/UI/Modal/Modal';
import { OrderSummary } from '../../components/Burger/OrderSummary/OrderSummary';
import { axiosOrders } from '../../axios-orders';
import { Spinner } from '../../components/UI/Spinner/Spinner';
import { withErrorHandler } from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.6,
  cheese: 0.4,
  meat: 1.3,
};

class BurgerBuilder extends React.Component {
  state = {
    ingredients: null,
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
    const queryParams = [];
    for(let ing in this.state.ingredients) {
      queryParams.push(`${encodeURIComponent(ing)}=${encodeURIComponent(this.state.ingredients[ing])}`)
    }
    queryParams.push('price=' + this.state.totalPrice);

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryParams.join('&'),
    });
  };

  componentDidMount() {
    axiosOrders.get('/ingredients.json')
      .then(res => {
        this.setState({
          ingredients: res.data
        })
      }).catch(() => {});
  }

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
              : this.state.ingredients &&
              <OrderSummary ingredients={this.state.ingredients}
                            totalPrice={this.state.totalPrice}
                            cancelClicked={this.purchaseCanceledHandler}
                            continueClicked={this.purchaseContinueHandler}/>
          }
        </Modal>
        {
          this.state.ingredients === null
            ? <Spinner/>
            : <React.Fragment>
              <Burger ingredients={this.state.ingredients}/>
              <BuildControls price={this.state.totalPrice}
                             disabledInfo={disabledInfo}
                             orderClicked={this.purchaseHandler}
                             ingredientAdded={this.addIngredientHandler}
                             ingredientRemoved={this.removeIngredientHandler}
                             purchasable={this.isPurchasable()}/>
            </React.Fragment>
        }
      </React.Fragment>
    )
  }
}

export default withErrorHandler(BurgerBuilder, axiosOrders);
