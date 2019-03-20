import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';

class Arc extends PureComponent {
  state = {
    isHovered: false,
    percentDouble: null,
    hasSpaceForLabel: false,
    percentToDisplay: null
  };

  componentDidMount() {
    this.updatePercentage();
    this.updateSpaceForLabel();
  }

  updatePercentage = () => {
    const { arc: { startAngle, endAngle } } = this.props;
    const percent = (Math.abs(endAngle - startAngle) / (Math.PI * 2)) * 100;
    const percentToDisplay = Math.round(percent);
    const percentDouble = +percent.toFixed(2).replace(/^.00/, '');

    this.setState({ percentToDisplay, percentDouble });
  };

  updateSpaceForLabel = () => {
    const { arc: { startAngle, endAngle } } = this.props;
    const hasSpaceForLabel = endAngle - startAngle >= 0.1;

    this.setState({ hasSpaceForLabel });
  };

  renderPercentage = () => {
    const { percentToDisplay, hasSpaceForLabel } = this.state;

    if (!(hasSpaceForLabel && percentToDisplay)) {
      return null;
    }

    const { arc, pie } = this.props;
    const [centroidX, centroidY] = pie.path.centroid(arc);

    return (
      <text
        fill='#fff'
        x={centroidX}
        y={centroidY}
        dy='.33em'
        fontSize={10}
        textAnchor='middle'
      >
        {`${percentToDisplay}%`}
      </text>
    );
  };

  renderFullInformation = () => {
    const { percentDouble, isHovered } = this.state;

    if (!isHovered) {
      return null;
    }

    const {
      arc: { data },
      colors, index
    } = this.props;

    return (
      <text
        fill={colors[index]}
        x={0} y={0}
        dy='.33em'
        fontSize={12}
        textAnchor='middle'
      >
        <tspan x="0" dy='0'>{data.name}: {data.value}</tspan>
        <tspan x="0" dy='14'>({percentDouble}%)</tspan>
      </text>
    );
  };

  onHover = () => this.setState({ isHovered: true });
  onMouseOut = () => this.setState({ isHovered: false });

  render() {
    const { arc, pie, colors, index } = this.props;

    return (
      <Fragment>
        <g
          className='part'
          onMouseOver={this.onHover}
          onMouseLeave={this.onMouseOut}
        >
          <path d={pie.path(arc)} fill={colors[index]}/>
          {this.renderPercentage()}
          {this.renderFullInformation()}
        </g>
      </Fragment>
    );
  }
}

Arc.propTypes = {
  arc: PropTypes.object.isRequired,
  pie: PropTypes.object.isRequired,
  colors: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired
};

export default Arc;