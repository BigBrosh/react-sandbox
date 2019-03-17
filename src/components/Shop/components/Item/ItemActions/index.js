import ItemActions from './ItemActions';
import { connect } from 'react-redux';
import addToBasket from '../../../actions/basket/addToBasket';
import { withRouter } from 'react-router';
import { compose } from 'recompose';

const enhance = compose(
  connect(
    (state) => ({
      basket: state.basket
    }),
    { addToBasket }
  ),
  withRouter
);

export default enhance(ItemActions);