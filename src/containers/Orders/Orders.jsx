import React from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import { axiosOrders } from '../../axios-orders';
import { withErrorHandler } from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';
import { Spinner } from '../../components/UI/Spinner/Spinner';

class Orders extends React.Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token);
  }

  render() {
    return (
      <div>
        {
          this.props.loading
            ? <Spinner/>
            : (
              this.props.orders.map(order =>
                <Order key={order.id}
                       ingredients={order.ingredients}
                       price={order.price}/>
              ))
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token) => dispatch(actions.fetchOrders(token)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axiosOrders));
