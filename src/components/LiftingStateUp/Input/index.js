import React from 'react';

const Input = (props) => (
  <input
    type="text"
    onChange={props.handleChange}
  />
);

export default Input;