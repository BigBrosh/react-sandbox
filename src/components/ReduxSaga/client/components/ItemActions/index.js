import { connect } from 'react-redux';
import ItemActions from './ItemActions';

import addToFavorites from '../../actions/shop/addToFavorites';
import removeFromFavorites from '../../actions/shop/removeFromFavorites';

export default connect(
  (state) => ({
    shop: state.shop
  }),
  { addToFavorites, removeFromFavorites }
)(ItemActions);