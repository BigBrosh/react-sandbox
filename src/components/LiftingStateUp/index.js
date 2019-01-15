import React, { Component } from 'react';

import Input from './Input';
import Sum from './Sum';

class LiftingStateUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num1: 0,
      num2: 0
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, id) {
    this.setState({
      [`num${id}`]: Number(e.target.value)
    });
  }

  render() {
    const { num1, num2 } = this.state;

    return (
      <div>
        <h2>Super Calculator</h2>

        <Input handleChange={(e) => this.handleChange(e, 1)}/>
        <Input handleChange={(e) => this.handleChange(e, 2)}/>

        <Sum
          num1={num1}
          num2={num2}
        />
      </div>
    );
  }
}

export default LiftingStateUp;