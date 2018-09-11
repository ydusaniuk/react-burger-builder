import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import { Spinner } from '../../../components/UI/Spinner/Spinner';

import orderActions from '../../../store/actions/order.actions';

import { axiosOrders } from '../../../axios-orders';
import { checkValidity } from '../../../shared/validation.utility';

import { withErrorHandler } from '../../../hoc/withErrorHandler/withErrorHandler';

import styles from './ContactData.css';

class ContactData extends React.Component {
  state = {
    orderForm: [
      {
        key: 'name',
        value: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your name',
          },
          elementValue: '',
          validation: {
            isValid: false,
            touched: false,
            required: true,
          },
        }
      },
      {
        key: 'street',
        value: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Street',
          },
          elementValue: '',
          validation: {
            isValid: false,
            touched: false,
            required: true,
          },
        }
      },
      {
        key: 'zipCode',
        value: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'ZIP Code',
          },
          elementValue: '',
          validation: {
            isValid: false,
            touched: false,
            required: true,
            length: 5,
          },
        }
      },
      {
        key: 'country',
        value: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Country',
          },
          elementValue: '',
          validation: {
            isValid: false,
            touched: false,
            required: true,
          },
        }
      },
      {
        key: 'email',
        value: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'E-Mail',
          },
          elementValue: '',
          validation: {
            isValid: false,
            touched: false,
            required: true,
          },
        }
      },
      {
        key: 'deliveryMethod',
        value: {
          elementType: 'select',
          elementConfig: {
            options: [
              { value: 'fastest', displayValue: 'Fastest' },
              { value: 'cheapest', displayValue: 'Cheapest' },
            ]
          },
          elementValue: 'fastest',
        }
      },
    ],
  };

  isFormValid = () => {
    return this.state.orderForm
      .filter(({ value }) => value.validation)
      .every(({ value }) => value.validation.isValid);
  };

  submitOrderHandler = (e) => {
    e.preventDefault();


    const formData = {};
    this.state.orderForm.forEach(({ key, value }) =>
      formData[key] = value.elementValue
    );

    const orderData = {
      ingredients: this.props.ingredients,
      userId: this.props.userId,
      price: this.props.price,
      orderData: formData,
    };

    this.props.onOrderBurger(orderData, this.props.token);
  };

  inputChangedHandler = ({ target }, inputKey) =>
    this.setState((prevState) => {
      const orderForm = _.cloneDeep(prevState.orderForm);

      const input = orderForm.find(p => p.key === inputKey).value;
      input.elementValue = target.value;

      if (input.validation) {
        input.validation.isValid = checkValidity(target.value, input.validation);
        input.validation.touched = true;
      }

      return ({ orderForm });
    });

  render() {
    return (
      <div className={styles.ContactData}>
        {
          this.props.loading ? <Spinner/>
            : <React.Fragment>
              <h4>Enter your Contact Data</h4>
              <form onSubmit={this.submitOrderHandler}>
                {
                  this.state.orderForm.map(({ key, value }) => {
                    return <Input key={key}
                                  elementType={value.elementType}
                                  config={value.elementConfig}
                                  value={value.elementValue}
                                  validation={value.validation}
                                  onChange={(e) => this.inputChangedHandler(e, key)}/>
                  })
                }
                <Button type="Success" disabled={!this.isFormValid()}>Order</Button>
              </form>
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
