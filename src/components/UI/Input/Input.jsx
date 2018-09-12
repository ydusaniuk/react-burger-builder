import React from 'react';

import styles from './Input.css';

class Input extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.value !== nextProps.value;
  }

  createInputElement = (inputClasses) => {
    switch (this.props.type) {
      case 'textarea':
        return <textarea id={this.props.id}
                         className={inputClasses}
                         value={this.props.value}
                         onChange={this.props.onChange}
                         placeholder={this.props.placeholder}/>;

      case 'select':
        return <select id={this.props.id}
                       className={inputClasses}
                       value={this.props.value}
                       onChange={this.props.onChange}>
          {
            this.props.options.map(opt =>
              <option key={opt.value} value={opt.value}>{opt.displayValue}</option>
            )
          }
        </select>;

      case 'input':
      default: {
        return <input id={this.props.id}
                      className={inputClasses}
                      value={this.props.value}
                      onChange={this.props.onChange}
                      type={this.props.elementType}
                      placeholder={this.props.placeholder}/>;
      }
    }
  };

  render() {
    const inputClasses = [styles.InputElement];
    if (this.props.validation) {
      if (this.props.validation.touched && !this.props.validation.isValid)
        inputClasses.push(styles.Invalid);
    }

    let inputEl = this.createInputElement(inputClasses.join(' '));

    return (
      <div className={styles.Input}>
        {this.props.label && <label className={styles.Label} htmlFor={this.props.id}>{this.props.label}</label>}
        {inputEl}
        {this.props.hint && <p className={styles.Hint}>{this.props.hint}</p>}
      </div>
    )
  }
}

export default Input;
