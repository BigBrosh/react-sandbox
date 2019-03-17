import Shop from './Shop';
import { connect } from 'react-redux';

export default connect(
  (state) => ({
    items: state.items
  })
)(Shop);