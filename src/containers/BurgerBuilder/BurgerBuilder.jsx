import React from 'react';
import { connect } from 'react-redux';

import { Modal } from '../../components/UI/Modal/Modal';
import { Burger } from '../../components/Burger/Burger';
import { Spinner } from '../../components/UI/Spinner/Spinner';
import { OrderSummary } from '../../components/Burger/OrderSummary/OrderSummary';
import { BuildControls } from '../../components/Burger/BuildControls/BuildControls';

import { axiosOrders } from '../../axios-orders';
import { withErrorHandler } from '../../hoc/withErrorHandler/withErrorHandler';

import * as actions from '../../store/actions';
import burgerBuilderActions from '../../store/actions/burgerBuilder.actions';

export class BurgerBuilder extends React.Component {
  state = {
    purchasing: false,
  };

  isPurchasable = () => {
    const sum = Object.keys(this.props.ingredients)
      .map(key => this.props.ingredients[key])
      .reduce((sum, el) => sum + el, 0);

    return sum > 0;
  };

  purchaseUpdatedHandler = (purchasing) =>
    this.setState({ purchasing });

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  render() {
    const disabledInfo = {
      ...this.props.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <React.Fragment>
        <Modal visible={this.state.purchasing} onClosed={() => this.purchaseUpdatedHandler(false)}>
          {
            this.props.ingredients &&
            <OrderSummary ingredients={this.props.ingredients}
                          totalPrice={this.props.totalPrice}
                          cancelClicked={() => this.purchaseUpdatedHandler(false)}
                          continueClicked={this.purchaseContinueHandler}/>
          }
        </Modal>
        {
          this.props.ingredients === null
            ? <Spinner/>
            : <React.Fragment>
              <Burger ingredients={this.props.ingredients}/>
              <BuildControls price={this.props.totalPrice}
                             disabledInfo={disabledInfo}
                             orderClicked={() => this.purchaseUpdatedHandler(true)}
                             ingredientAdded={this.props.onIngredientAdded}
                             ingredientRemoved={this.props.onIngredientRemoved}
                             purchasable={this.isPurchasable()}
                             isAuthenticated={this.props.isAuthenticated}/>
            </React.Fragment>
        }
        {
          this.props.error && (<h1>Can't load ingredients</h1>)
        }
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingredient => dispatch(burgerBuilderActions.addIngredient(ingredient)),
    onIngredientRemoved: ingredient => dispatch(burgerBuilderActions.removeIngredient(ingredient)),
    onInitIngredients: () => dispatch(burgerBuilderActions.setIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axiosOrders));
