import React from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';

import orderActions from '../../store/actions/order.actions';

import { axiosOrders } from '../../axios-orders';
import { withErrorHandler } from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends React.Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }

  render() {
    return (
      <div>
        {
          this.props.orders.map(order =>
            <Order key={order.id}
                   ingredients={order.ingredients}
                   price={order.price}/>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    token: state.auth.token,
    userId: state.auth.userId,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) => dispatch(orderActions.fetchOrders(token, userId)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axiosOrders));
