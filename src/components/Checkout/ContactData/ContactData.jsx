import React from 'react';
import { connect } from 'react-redux';

import Form from '../../UI/Form/Form';
import Panel from '../../UI/Panel/Panel';

import orderActions from '../../../store/actions/order.actions';

import { axiosOrders } from '../../../axios-orders';
import { withErrorHandler } from '../../../hoc/withErrorHandler/withErrorHandler';

import styles from './ContactData.css';
import panelStyles from '../../UI/Panel/Panel.css';

class ContactData extends React.Component {
  controls = {
    name: {
      type: 'input',
      elementType: 'text',
      label: 'Your name',
      value: '',

      validation: {
        isValid: false,
        touched: false,
        required: true,
      },
    },
    street: {
      type: 'input',
      elementType: 'text',
      label: 'Street',
      value: '',

      validation: {
        isValid: false,
        touched: false,
        required: true,
      },
    },
    zipCode: {
      type: 'input',
      elementType: 'text',
      label: 'ZIP Code',
      hint: 'Code should have length of 5 characters',
      value: '',

      validation: {
        isValid: false,
        touched: false,
        required: true,
        length: 5,
      },
    },
    country: {
      type: 'input',
      elementType: 'text',
      label: 'Country',
      value: '',

      validation: {
        isValid: false,
        touched: false,
        required: true,
      },
    },
    email: {
      type: 'input',
      elementType: 'email',
      label: 'E-Mail',
      value: '',

      validation: {
        isValid: false,
        touched: false,
        required: true,
      },
    },
    deliveryMethod: {
      type: 'select',
      label: 'Delivery method',
      hint: 'It could affect the cost of delivery',
      options: [
        { value: 'fastest', displayValue: 'Fastest' },
        { value: 'cheapest', displayValue: 'Cheapest' },
      ],
      value: 'fastest',
    }
  };

  submitOrderHandler = (e, data) => {
    e.preventDefault();

    const orderData = {
      ingredients: this.props.ingredients,
      userId: this.props.userId,
      price: this.props.price,
      orderData: data,
    };

    this.props.onOrderBurger(orderData, this.props.token);
  };

  render() {
    return (
      <div className={styles.ContactData}>
        <Panel>
          <label className={panelStyles.PanelTitle}>Enter your Contact Data</label>
          <Form controls={this.controls} onSubmit={this.submitOrderHandler} submitLabel="Order"/>
        </Panel>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    token: state.auth.token,
    userId: state.auth.userId,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (data, token) => dispatch(orderActions.purchaseBurger(data, token)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axiosOrders));
