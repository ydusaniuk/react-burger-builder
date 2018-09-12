import React from 'react';
import { connect } from 'react-redux';

import { Spinner } from '../../../components/UI/Spinner/Spinner';
import Form from '../../../components/UI/Form/Form';

import orderActions from '../../../store/actions/order.actions';

import { axiosOrders } from '../../../axios-orders';
import { withErrorHandler } from '../../../hoc/withErrorHandler/withErrorHandler';

import styles from './ContactData.css';

class ContactData extends React.Component {
  controls = {
    name: {
      type: 'input',
      elementType: 'text',
      placeholder: 'Your name',
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
      placeholder: 'Street',
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
      placeholder: 'ZIP Code',
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
      placeholder: 'Country',
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
      placeholder: 'E-Mail',
      value: '',

      validation: {
        isValid: false,
        touched: false,
        required: true,
      },
    },
    deliveryMethod: {
      type: 'select',
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
        {
          this.props.loading ? <Spinner/>
            : <React.Fragment>
              <h4>Enter your Contact Data</h4>
              <Form controls={this.controls} onSubmit={this.submitOrderHandler} submitLabel="Order"/>
            </React.Fragment>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
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
