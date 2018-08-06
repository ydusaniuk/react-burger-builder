import React from 'react';
import PropTypes from 'prop-types';
import styles from './BuildControl.css';

export class BuildControl extends React.Component {
  render() {
    const {label, lessDisabled, lessClicked, moreClicked} = this.props;

    return (
      <div className={styles.BuildControl}>
        <div className={styles.Label}>{label}</div>
        <button className={styles.Less}
                onClick={lessClicked}
                disabled={lessDisabled}>
          Less
        </button>
        <button className={styles.More}
                onClick={moreClicked}>
          More
        </button>
      </div>
    );
  }
}

BuildControl.propTypes = {
  label: PropTypes.string.isRequired,
  lessDisabled: PropTypes.bool,
  lessClicked: PropTypes.func,
  moreClicked: PropTypes.func,
};

BuildControl.defaultProps = {
  lessDisabled: false,
};
