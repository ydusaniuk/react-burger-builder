import React from 'react';
import { withRouter } from 'react-router-dom';
import styles from './ContactData.css';
import { axiosOrders } from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import { Spinner } from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import _ from 'lodash';

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
              {value: 'fastest', displayValue: 'Fastest'},
              {value: 'cheapest', displayValue: 'Cheapest'},
            ]
          },
          elementValue: '',
        }
      },
    ],
    loading: false,
  };

  isFormValid = () => {
    return this.state.orderForm
      .filter(({value}) => value.validation)
      .every(({value}) => value.validation.isValid);
  };

  submitOrderHandler = (e) => {
    e.preventDefault();
    this.setState({loading: true});

    const formData = {};
    this.state.orderForm.forEach(({key, value}) =>
      formData[key] = value.elementValue
    );

    axiosOrders
      .post('/orders.json', {
        ingredients: this.props.ingredients,
        price: this.props.totalPrice,
        orderData: formData,
      })
      .then(res => {
        this.setState({loading: false});
        this.props.history.push('/');
      })
      .catch(err => this.setState({loading: false}))
  };

  checkValidity = (value, rules) => {
    let isValid = true;

    if (isValid && rules.required)
      isValid = value.trim() !== '';

    if (isValid && rules.length)
      isValid = value.trim().length === rules.length;

    if (isValid && rules.minLength)
      isValid = value.trim().length >= rules.minLength;

    if (isValid && rules.maxLength)
      isValid = value.trim().length <= rules.maxLength;

    return isValid;
  };

  inputChangedHandler = ({target}, inputKey) =>
    this.setState((prevState) => {
      const orderForm = _.cloneDeep(prevState.orderForm);

      const input = orderForm.find(p => p.key === inputKey).value;
      input.elementValue = target.value;

      if (input.validation) {
        input.validation.isValid = this.checkValidity(target.value, input.validation);
        input.validation.touched = true;
      }

      return ({orderForm});
    });

  render() {
    return (
      <div className={styles.ContactData}>
        {
          this.state.loading ? <Spinner/>
            : <React.Fragment>
              <h4>Enter your Contact Data</h4>
              <form onSubmit={this.submitOrderHandler}>
                {
                  this.state.orderForm.map(({key, value}) => {
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

export default withRouter(ContactData);
