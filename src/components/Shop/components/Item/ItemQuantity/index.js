import ItemQuantity from './ItemQuantity';
import { connect } from 'react-redux';

export default connect(
  (state) => ({
    basket: state.basket
  })
)(ItemQuantity);