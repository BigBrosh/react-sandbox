import React, { PureComponent } from 'react';

import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';

export default (Component) => {
  return class extends PureComponent {
    render() {
      return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Component/>
        </MuiPickersUtilsProvider>
      );
    }
  };
};