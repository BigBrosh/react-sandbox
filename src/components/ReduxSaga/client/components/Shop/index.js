import { connect } from 'react-redux';

import Shop from './Shop';
import fetchItems from '../../actions/shop/fetchItems';

export default connect(
  (state) => ({
    items: state.shop.items
  }),
  { fetchItems }
)(Shop);