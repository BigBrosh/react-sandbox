import React, { Component } from 'react';

import cartIcon from '../../images/cartIcon.svg';
import cartIconAdded from '../../images/cartIcon_added.svg';
import favorite from '../../images/favorite.svg';
import notFavorite from '../../images/not_favorite.svg';

class ItemActions extends Component {
  isFavorite = (id) => {
    const { favorites } = this.props.shop;
    return favorites.find(item => item.id === id) !== undefined;
  };

  inCart = (id) => {
    const { cart } = this.props.shop;
    return cart.find(item => item.id === id) !== undefined;
  };

  renderCartButton = () => {
    const { id } = this.props;
    const inCart = this.inCart(id);

    if (inCart) {
      return (
        <button onClick={() => console.log(id)}>
          <img src={cartIconAdded} alt="cart icon added"/>
        </button>
      );
    } else {
      return (
        <button onClick={() => console.log(id)}>
          <img src={cartIcon} alt="cart icon"/>
        </button>
      );
    }
  };

  renderFavButton = () => {
    const { id, addToFavorites, removeFromFavorites } = this.props;
    const isFavorite = this.isFavorite(id);

    if (isFavorite) {
      return (
        <button onClick={() => removeFromFavorites(id)}>
          <img src={favorite} alt="cart icon"/>
        </button>
      );
    } else {
      return (
        <button onClick={() => addToFavorites(id)}>
          <img src={notFavorite} alt="cart icon"/>
        </button>
      );
    }
  };

  render() {
    return (
      <div className='item_actions'>
        {this.renderCartButton()}
        {this.renderFavButton()}
      </div>
    );
  }
}

export default ItemActions;