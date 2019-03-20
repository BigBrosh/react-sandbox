import React, { PureComponent } from 'react';

class Legend extends PureComponent {
  renderLegendItems = () => {
    const { items, colors } = this.props;

    return items.map((item, index) => {
      const { name } = item;

      return (
        <div className='legend_item' key={name}>
          {name}
          <div
            className='legend_color'
            style={{ background: colors[index] }}
          />
        </div>
      );
    });
  };

  render() {
    return (
      <div className='legend'>
        {this.renderLegendItems()}
      </div>
    );
  }
}

export default Legend;