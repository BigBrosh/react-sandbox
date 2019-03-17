import React, { Component } from 'react';
import Item from '../Item';

class Shop extends Component {
  async componentDidMount() {
    this.props.fetchItems();
  }

  renderItems = () => {
    const { items } = this.props;

    return items.map(item => (
      <Item data={item} key={`item_${item.id}`}/>
    ));
  };

  render() {
    return (
      <div>
        <h2>Shop</h2>
        <div>
          {this.renderItems()}
        </div>
      </div>
    );
  }
}

export default Shop;