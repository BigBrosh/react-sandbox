import { connect } from 'react-redux';
import { compose } from 'recompose';
import ProductQuantity from './ProductQuantity';
import { withStyles } from '@material-ui/core';
import styles from './styles';

const enhance = compose(
  connect(
    (state) => ({
      basket: state.basket
    })
  ),
  withStyles(styles)
);

export default enhance(ProductQuantity);