import React, { Fragment, PureComponent } from 'react';
import { Pie } from '@vx/shape';
import { Group } from '@vx/group';
import mockData from './mockData';
import Legend from './components/Legend/Legend';
import Arc from './components/Arc';
import './styles/main.sass';

const usage = d => d.value;
const dataValues = Object.values(mockData);
const colors = ['#26a69a', '#37699f', '#1976d2', '#0288d1', '#0097a7'];

class PieChart extends PureComponent {
  state = {
    width: null,
    height: null,
  };

  componentDidMount() {
    this.calculateSizes();
    window.addEventListener('resize', this.calculateSizes);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.calculateSizes);
  }

  calculateSizes = () => {
    const maxWidth = 900;
    const innerWidth = this.wrap.clientWidth;
    const width = innerWidth > maxWidth ? maxWidth : innerWidth;
    const radius = this.getRadius(innerWidth);

    let height = width * (innerWidth > 600 ? 0.5 : 0.9);
    height = Math.min(height, radius + 120);

    this.setState({ width, height, radius });
  };

  getRadius = (innerWidth) => innerWidth > 600 ? 220 : 200;

  renderPie = (pie) => {
    return pie.arcs.map((arc, i) => (
      <Arc
        key={`${arc.data.label}-${i}`}
        colors={colors}
        arc={arc}
        pie={pie}
        index={i}
      />
    ));
  };

  render() {
    const { width, height, radius } = this.state;
    const centerY = height / 2;
    const centerX = width / 2;

    return (
      <div ref={node => this.wrap = node} className='pieChart'>
        <svg width={width} height={height}>
          {
            width && height && (
              <Fragment>
                <rect width={width} height={height} fill='transparent'/>
                <Group top={centerY} left={centerX}>
                  <Pie
                    data={dataValues}
                    pieValue={usage}
                    outerRadius={radius - 80}
                    innerRadius={radius - 120}
                    cornerRadius={3}
                    padAngle={0}
                  >
                    {this.renderPie}
                  </Pie>
                </Group>
              </Fragment>
            )
          }
        </svg>

        <Legend items={dataValues} colors={colors}/>
      </div>
    );
  }
}

export default PieChart;