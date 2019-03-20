import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Arc extends PureComponent {
  render() {
    const { arc, pie, colors, i } = this.props;

    const [centroidX, centroidY] = pie.path.centroid(arc);
    const { startAngle, endAngle } = arc;
    const hasSpaceForLabel = endAngle - startAngle >= 0.1;
    const percent = Math.round((Math.abs(endAngle - startAngle) / (Math.PI * 2)) * 100);

    return (
      <g className='part'>
        <path d={pie.path(arc)} fill={colors[i]}/>
        {
          hasSpaceForLabel && (
            <text
              fill='#fff'
              x={centroidX}
              y={centroidY}
              dy='.33em'
              fontSize={9}
              textAnchor='middle'
            >
              {`${percent}%`}
            </text>
          )
        }
      </g>
    );
  }
}

Arc.propTypes = {
  arc: PropTypes.object.isRequired,
  pie: PropTypes.object.isRequired,
  colors: PropTypes.array.isRequired,
  i: PropTypes.number.isRequired
};

export default Arc;