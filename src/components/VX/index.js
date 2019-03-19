import VX from './VX';
import { compose } from 'recompose';

import { withTooltip } from '@vx/tooltip';
import withPickerUtils from './HOC/withPickerUtils';

const enhance = compose(
  withPickerUtils,
  withTooltip
);

export default enhance(VX);