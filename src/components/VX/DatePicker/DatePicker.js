import React, { PureComponent } from 'react';
import { InlineDatePicker } from 'material-ui-pickers';

class DatePicker extends PureComponent {
  handleChange = (date) => {
    const { handleChange, dateType } = this.props;
    handleChange(dateType)(date);
  };

  render() {
    return (
      <InlineDatePicker
        keyboard
        clearable
        margin='dense'
        variant="outlined"
        format='MM/dd/yyyy'
        onChange={this.handleChange}
        mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
        {...this.props}
      />
    );
  }
}
// TODO: filter props providing to dom element

export default DatePicker;