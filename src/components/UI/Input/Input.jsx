import React from 'react';
import styles from './Input.css';

const Input = props => {
  let inputEl = null;

  switch (props.elementType) {
    case 'textarea': {
      inputEl = <textarea className={styles.InputElement}
                          value={props.value}
                          onChange={props.onChange}
                          {...props.config}/>;
      break;
    }
    case 'select': {
      inputEl = <select className={styles.InputElement}
                        value={props.value}
                        onChange={props.onChange}>
        {
          props.config.options.map(opt =>
            <option key={opt.value} value={opt.value}>{opt.displayValue}</option>
          )
        }
      </select>;
      break;
    }
    case 'input':
    default: {
      inputEl = <input className={styles.InputElement}
                       value={props.value}
                       onChange={props.onChange}
                       {...props.config}/>;
      break;
    }
  }

  return (
    <div className={styles.Input}>
      <label className={styles.Label}>{props.label}</label>
      {inputEl}
    </div>
  )
};

export default Input;
