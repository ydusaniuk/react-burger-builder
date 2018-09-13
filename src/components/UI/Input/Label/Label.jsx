import React from 'react';

import styles from './Label.css';
import { Link } from 'react-router-dom';

const Label = (props) => {
  if (!props.children) return null;

  if (props.outerLink) {
    return (
      <div className={styles.LabelGroup}>
        <label className={styles.Label} htmlFor={props.id}>{props.children}</label>
        <Link className={[styles.Label, styles.Link].join(' ')}
              to={props.outerLink.to}
              onClick={props.outerLink.onClick}>
          {props.outerLink.label}
        </Link>
      </div>
    )
  }

  return (
    <label className={styles.Label} htmlFor={props.id}>{props.children}</label>
  );
};

export default Label;
