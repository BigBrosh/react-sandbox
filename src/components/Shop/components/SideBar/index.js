import SideBar from './SideBar';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import connect from 'react-redux/es/connect/connect';
import toggleSidebar from '../../actions/sidebar/toggleSidebar';
import { withRouter } from 'react-router';

const enhance = compose(
  connect(
    (state) => ({
      isOpen: state.sidebar.isOpen
    }),
    { toggleSidebar }
  ),
  withStyles(styles),
  withRouter
);

export default enhance(SideBar);