import React from 'react';

const Sum = (props) => {
  const num1 = props.num1 || 0;
  const num2 = props.num2 || 0;

  return (
    <div>{num1 + num2}</div>
  );
};

export default Sum;