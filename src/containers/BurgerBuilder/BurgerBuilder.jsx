import React from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';

import { Burger } from '../../components/Burger/Burger';
import { BuildControls } from '../../components/Burger/BuildControls/BuildControls';
import { Modal } from '../../components/UI/Modal/Modal';
import { OrderSummary } from '../../components/Burger/OrderSummary/OrderSummary';
import { axiosOrders } from '../../axios-orders';
import { Spinner } from '../../components/UI/Spinner/Spinner';
import { withErrorHandler } from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions';

class BurgerBuilder extends React.Component {
  state = {
    purchasing: false,
    loading: false,
  };

  isPurchasable = () => {
    const sum = Object.keys(this.props.ingredients)
      .map(key => this.props.ingredients[key])
      .reduce((sum, el) => sum + el, 0);

    return sum > 0;
  };

  purchaseUpdatedHandler = (purchasing) =>
    this.setState({ purchasing });

  purchaseContinueHandler = () =>
    this.props.history.push('/checkout');

  componentDidMount() {
    // axiosOrders.get('/ingredients.json')
    //   .then(res => {
    //     this.setState({
    //       ingredients: res.data
    //     })
    //   }).catch(() => {});
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
            this.state.loading
              ? <Spinner/>
              : this.props.ingredients &&
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
                             purchasable={this.isPurchasable()}/>
            </React.Fragment>
        }
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingredient => dispatch(burgerBuilderActions.addIngredient(ingredient)),
    onIngredientRemoved: ingredient => dispatch(burgerBuilderActions.removeIngredient(ingredient)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axiosOrders));
