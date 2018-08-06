import React from 'react';
import PropTypes from 'prop-types';
import styles from './BuildControls.css';
import { BuildControl } from './BuildControl/BuildControl';

const CONTROLS = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'},
];

export class BuildControls extends React.Component {
  render() {
    return (
      <div className={styles.BuildControls}>
        <p>Price: <strong>{this.props.price.toFixed(2)}</strong></p>
        {
          CONTROLS.map(ctrl =>
            <BuildControl key={ctrl.label}
                          label={ctrl.label}
                          lessDisabled={this.props.disabledInfo[ctrl.type]}
                          moreClicked={() => this.props.ingredientAdded(ctrl.type)}
                          lessClicked={() => this.props.ingredientRemoved(ctrl.type)}/>
          )
        }
        <button disabled={!this.props.purchasable}
                onClick={this.props.orderClicked}
                className={styles.OrderButton}>
          ORDER NOW
        </button>
      </div>
    );
  }
}

BuildControl.propTypes = {
  purchasable: PropTypes.bool,
  price: PropTypes.number,
  disabledInfo: PropTypes.arrayOf(PropTypes.bool),

  orderClicked: PropTypes.func,
  ingredientAdded: PropTypes.func,
  ingredientRemoved: PropTypes.func,
};
