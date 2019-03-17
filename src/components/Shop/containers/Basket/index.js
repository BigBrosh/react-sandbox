import Basket from './Basket';
import { connect } from 'react-redux';

export default connect(
  (state) => ({
    basket: state.basket
  })
)(Basket);