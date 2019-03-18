import React, { Component } from 'react';

class Button extends Component {
  state = {
    isHovered: false
  };

  hover = () => this.setState({ isHovered: true });
  leave = () => this.setState({ isHovered: false });

  render() {
    const { isHovered } = this.state;
    const text = isHovered ? 'Woo hoo' : 'Nvm, I\'ll wait';

    return (
      <button
        onMouseOver={this.hover}
        onMouseLeave={this.leave}
      >
        {text}
      </button>
    );
  }
}

export default Button;