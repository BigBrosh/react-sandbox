import React from 'react';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import { Link } from 'react-router-dom';
import { basket_p } from '../../routes';

const ProductQuantity = ({ basket, classes }) => {
  const quantity = basket.reduce((reducer, product) => {
    return reducer + product.quantity;
  }, 0);

  return (
    <Link to={basket_p}>
      <IconButton color="inherit">
        <Badge badgeContent={quantity} color='secondary'>
          <ShoppingCart className={classes.icon}/>
        </Badge>
      </IconButton>
    </Link>
  );
};

export default ProductQuantity;