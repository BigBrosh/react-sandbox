import React, { PureComponent } from 'react';
import { Wrap } from './styledComponents';

class ContentWrap extends PureComponent {
  render() {
    const { children } = this.props;

    return (
      <Wrap>
        {children}
      </Wrap>
    );
  }
}

export default ContentWrap;