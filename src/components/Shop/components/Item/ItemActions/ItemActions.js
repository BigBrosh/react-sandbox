import React from 'react';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import ItemQuantity from '../ItemQuantity';
import { basket_p } from '../../../routes';

class ItemActions extends React.Component {
  state = {
    inBasket: false
  };

  componentDidMount() {
    const { item, basket } = this.props;

    this.setState({
      inBasket: basket.some(product => {
        return product.item.id === item.id;
      })
    });
  }

  moveToBasket = () => {
    const { item, addToBasket } = this.props;

    addToBasket(item)();

    this.setState({
      inBasket: true
    });
  };

  buyButton = () => {
    if (!this.state.inBasket) {
      return (
        <Button
          size="small"
          color="primary"
          onClick={this.moveToBasket}
        >
          Buy
        </Button>
      );
    }

    return (
      <Button
        size="small"
        color="primary"
      >
        In Basket
      </Button>
    );
  };

  render() {
    return (
      <CardActions>
        {
          this.props.history.location.pathname === basket_p
            && <ItemQuantity id={this.props.item.id}/>
        }
        {this.buyButton()}
      </CardActions>
    );
  }
}

export default ItemActions;