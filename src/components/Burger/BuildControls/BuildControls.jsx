import React from 'react';
import styles from './BuildControls.css';
import { BuildControl } from './BuildControl/BuildControl';

const CONTROLS = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'},
];

export const BuildControls = props => (
  <div className={styles.BuildControls}>
    {
      CONTROLS.map(ctrl =>
        <BuildControl key={ctrl.label}
                      label={ctrl.label}
                      disabled={props.disabled[ctrl.type]}
                      moreClicked={() => props.ingredientAdded(ctrl.type)}
                      lessClicked={() => props.ingredientRemoved(ctrl.type)}/>
      )
    }
  </div>
);
