import React from 'react';
import PropTypes from 'prop-types';

import styles from './BuildControl.css';

const BuildControl = props => (
  <div className={styles.BuildControl}>
    <div className={styles.Label}>{props.label}</div>

    <button className={styles.Less}
            onClick={props.lessClicked}
            disabled={props.lessDisabled}>Less</button>

    <button className={styles.More}
            onClick={props.moreClicked}>More</button>
  </div>
);

BuildControl.propTypes = {
  label: PropTypes.string.isRequired,
  lessDisabled: PropTypes.bool,
  lessClicked: PropTypes.func,
  moreClicked: PropTypes.func,
};

BuildControl.defaultProps = {
  lessDisabled: false,
};

export default BuildControl;
