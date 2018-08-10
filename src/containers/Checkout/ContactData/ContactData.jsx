import React from 'react';
import styles from './ContactData.css';

import Button from '../../../components/UI/Button/Button';

class ContactData extends React.Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
  };

  render() {
    return (
      <div className={styles.ContactData}>
        <h4>Enter your Contact Data</h4>
        <form>
          <input className={styles.Input} type="text" name="name" placeholder="Your name"/>
          <input className={styles.Input} type="email" name="email" placeholder="Email"/>
          <input className={styles.Input} type="text" name="street" placeholder="Street"/>
          <input className={styles.Input} type="text" name="postal code" placeholder="ZIP code"/>
          <Button type="Success">Order</Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
