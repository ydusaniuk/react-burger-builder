import React from 'react';
import styles from './Input.css';

const Input = props => {
  let inputEl = null;
  const inputClasses = [styles.InputElement];

  if (props.validation) {
    if (props.validation.touched && !props.validation.isValid)
      inputClasses.push(styles.Invalid);
  }

  switch (props.elementType) {
    case 'textarea': {
      inputEl = <textarea className={inputClasses.join(' ')}
                          value={props.value}
                          onChange={props.onChange}
                          {...props.config}/>;
      break;
    }
    case 'select': {
      inputEl = <select className={inputClasses.join(' ')}
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
      inputEl = <input className={inputClasses.join(' ')}
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
