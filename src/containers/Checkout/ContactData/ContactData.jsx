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

  inputChangedHandler = ({target}, inputKey) =>
    this.setState((prevState) => {
      const orderForm = _.cloneDeep(prevState.orderForm);

      const input = orderForm.find(p => p.key === inputKey);
      input.value.elementValue = target.value;
      console.log(input);
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
                                  onChange={(e) => this.inputChangedHandler(e, key)}/>
                  })
                }
                <Button type="Success">Order</Button>
              </form>
            </React.Fragment>
        }
      </div>
    );
  }
}

export default withRouter(ContactData);
