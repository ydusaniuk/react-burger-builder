import React from 'react';
import PropTypes from 'prop-types';

import Input from '../Input/Input';
import Button from '../Button/Button';

import { checkValidity } from '../../../shared/validation.utility';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      controls: props.controls,
    }
  }

  mapControlsToArray = () => {
    const controls = [];

    for (let prop in this.state.controls) {
      controls.push({
        key: prop,
        ...this.state.controls[prop],
      });
    }

    return controls;
  };

  getMappedData = () => {
    const result = {};

    for (let prop in this.state.controls) {
      result[prop] = this.state.controls[prop].value;
    }

    return result;
  };

  isFormValid = () => {
    return this.mapControlsToArray()
      .filter((ctrl) => ctrl.validation)
      .every(ctrl => ctrl.validation.isValid);
  };

  inputChangedHandler = ({ target }, inputKey) => {
    this.setState((prevState) => {
      let control = {
        ...prevState.controls[inputKey],
        value: target.value,
      };

      if (control.validation) {
        control = {
          ...control,
          validation: {
            ...control.validation,
            touched: true,
            isValid: checkValidity(target.value, control.validation),
          }
        }
      }

      return {
        controls: {
          ...prevState.controls,
          [inputKey]: control,
        }
      };
    });
  };

  render() {
    const controls = this.mapControlsToArray();

    return (
      <form onSubmit={(e) => this.props.onSubmit(e, this.getMappedData())}>
        {
          controls.map((control) =>
            <Input key={control.key}
                   {...control}
                   onChange={(e) => this.inputChangedHandler(e, control.key)}/>)
        }
        <Button type="Success"
                disabled={!this.isFormValid()}>
          {this.props.submitLabel}
        </Button>
      </form>
    );
  }
}

Form.propTypes = {
  controls: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
  submitLabel: PropTypes.string,
};

Form.defaultProps = {
  submitLabel: 'Submit',
};

export default Form;
