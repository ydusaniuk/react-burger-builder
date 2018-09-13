import React from 'react';

import styles from './Panel.css';

const Panel = (props) => (
  <div className={styles.Panel}>
    {props.children}
  </div>
);

export default Panel;
