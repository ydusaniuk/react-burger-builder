import React from 'react';
import { withRouter } from 'react-router-dom';
import styles from './ContactData.css';
import { axiosOrders } from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import { Spinner } from '../../../components/UI/Spinner/Spinner';

class ContactData extends React.Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false,
  };

  submitOrderHandler = (e) => {
    e.preventDefault();
    this.setState({loading: true});

    axiosOrders
      .post('/orders.json', {
        ingredients: this.props.ingredients,
        price: this.props.totalPrice,
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
      .then(res => {
        this.setState({loading: false});
        this.props.history.push('/');
      })
      .catch(err => this.setState({loading: false}))
  };

  render() {
    return (
      <div className={styles.ContactData}>
        {
          this.state.loading ? <Spinner/>
            : <React.Fragment>
              <h4>Enter your Contact Data</h4>
              <form>
                <input className={styles.Input} type="text" name="name" placeholder="Your name"/>
                <input className={styles.Input} type="email" name="email" placeholder="Email"/>
                <input className={styles.Input} type="text" name="street" placeholder="Street"/>
                <input className={styles.Input} type="text" name="postal code" placeholder="ZIP code"/>
                <Button type="Success" clicked={this.submitOrderHandler}>Order</Button>
              </form>
            </React.Fragment>
        }
      </div>
    );
  }
}

export default withRouter(ContactData);
