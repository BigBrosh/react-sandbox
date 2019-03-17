import NavBar from './NavBar';
import { withStyles } from '@material-ui/core';
import styles from './styles';
import { connect } from 'react-redux';
import toggleSidebar from '../../actions/sidebar/toggleSidebar';

import { compose } from 'recompose';

const enhance = compose(
  connect(
    null,
    { toggleSidebar }
  ),
  withStyles(styles)
);

export default enhance(NavBar);