import React, { Component } from 'react';
import { shop } from './api';

export default class extends Component {
  async componentDidMount() {
    const items = await shop.listItems();
    console.log({ items });
  }

  render() {
    return (
      <div>
        Redux saga
      </div>
    );
  }
}