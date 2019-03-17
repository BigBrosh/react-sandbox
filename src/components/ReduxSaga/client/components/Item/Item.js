import React from 'react';

import ItemActions from '../ItemActions';
import './styles.sass';

const displayPrice = (price) => `${price / 100}$`;

export default ({ data }) => {
  const { id, name, image, price } = data;

  return (
    <div className='item'>
      <div className="image_wrap">
        <img src={image} alt={name}/>
      </div>
      <div className="title">
        {name}
      </div>
      <div className="price">
        {displayPrice(price)}
      </div>
      <ItemActions id={id}/>
    </div>
  );
};