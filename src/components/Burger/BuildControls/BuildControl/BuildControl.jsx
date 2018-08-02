import React from 'react';
import styles from './BuildControl.css';

export const BuildControl = props => (
  <div className={styles.BuildControl}>
    <div className={styles.Label}>{props.label}</div>
    <button className={styles.Less}
            onClick={props.lessClicked}
            disabled={props.disabled}>
      Less
    </button>
    <button className={styles.More}
            onClick={props.moreClicked}>
      More
    </button>
  </div>
);
