import React, { Fragment } from 'react';
import { AreaClosed, Line, Bar } from '@vx/shape';
import { curveLinear } from '@vx/curve';
import { Group } from '@vx/group';
import { GridRows, GridColumns } from '@vx/grid';
import { scaleTime, scaleLinear } from '@vx/scale';
import { withTooltip, Tooltip } from '@vx/tooltip';
import { localPoint } from '@vx/event';
import { bisector } from 'd3-array';
import { timeFormat } from 'd3-time-format';
import { AxisLeft, AxisBottom } from '@vx/axis';

const res = {
  start: 1381814054000,
  participantsLabel: 'Registrations Started',
  ticketSoldLabel: 'Tickets sold',
  participantsForDay: [
    { x: 1381705200000, y: 10 },
    { x: 1381791600000, y: 1 },
    { x: 1381878000000, y: 0 },
    { x: 1381964400000, y: 0 },
    { x: 1382050800000, y: 0 },
    { x: 1382137200000, y: 7 },
    { x: 1382223600000, y: 0 },
    { x: 1382310000000, y: 0 },
    { x: 1382396400000, y: 12 },
    { x: 1382482800000, y: 0 },
    { x: 1382569200000, y: 0 },
    { x: 1382655600000, y: 0 },
    { x: 1382742000000, y: 20 },
    { x: 1382828400000, y: 0 },
    { x: 1382914800000, y: 0 },
    { x: 1383001200000, y: 0 },
    { x: 1383087600000, y: 0 },
    { x: 1383174000000, y: 0 },
    { x: 1383260400000, y: 0 },
    { x: 1383346800000, y: 0 },
    { x: 1383433200000, y: 0 },
    { x: 1383523200000, y: 0 },
    { x: 1383609600000, y: 0 },
    { x: 1383696000000, y: 0 },
    { x: 1383782400000, y: 0 },
    { x: 1383868800000, y: 0 },
    { x: 1383955200000, y: 0 },
    { x: 1384041600000, y: 0 },
    { x: 1384128000000, y: 0 },
    { x: 1384214400000, y: 0 },
    { x: 1384300800000, y: 0 },
    { x: 1384387200000, y: 6 },
    { x: 1384473600000, y: 0 },
    { x: 1384560000000, y: 0 },
    { x: 1384646400000, y: 0 },
    { x: 1384732800000, y: 0 },
    { x: 1384819200000, y: 0 },
    { x: 1384905600000, y: 0 },
    { x: 1384992000000, y: 0 },
    { x: 1385078400000, y: 30 },
    { x: 1385164800000, y: 0 },
    { x: 1385251200000, y: 0 },
    { x: 1385337600000, y: 0 },
    { x: 1385424000000, y: 0 },
    { x: 1385510400000, y: 0 },
    { x: 1385596800000, y: 0 },
    { x: 1385683200000, y: 0 },
    { x: 1385769600000, y: 0 },
    { x: 1385856000000, y: 0 },
    { x: 1385942400000, y: 0 },
    { x: 1386028800000, y: 0 },
    { x: 1386115200000, y: 0 },
    { x: 1386201600000, y: 0 },
    { x: 1386288000000, y: 0 },
    { x: 1386374400000, y: 0 },
    { x: 1386460800000, y: 0 },
    { x: 1386547200000, y: 0 },
    { x: 1386633600000, y: 0 },
    { x: 1386720000000, y: 0 },
    { x: 1386806400000, y: 0 },
    { x: 1386892800000, y: 0 },
    { x: 1386979200000, y: 0 },
    { x: 1387065600000, y: 0 },
    { x: 1387152000000, y: 0 },
    { x: 1387238400000, y: 0 },
    { x: 1387324800000, y: 0 },
    { x: 1387411200000, y: 0 },
    { x: 1387497600000, y: 0 },
    { x: 1387584000000, y: 0 },
    { x: 1387670400000, y: 50 }
  ],
  ticketsForDay: [
    { x: 1381705200000, y: 2 },
    { x: 1381791600000, y: 6 },
    { x: 1381878000000, y: 0 },
    { x: 1381964400000, y: 0 },
    { x: 1382050800000, y: 0 },
    { x: 1382137200000, y: 0 },
    { x: 1382223600000, y: 0 },
    { x: 1382310000000, y: 0 },
    { x: 1382396400000, y: 20 },
    { x: 1382482800000, y: 0 },
    { x: 1382569200000, y: 0 },
    { x: 1382655600000, y: 7 },
    { x: 1382742000000, y: 12 },
    { x: 1382828400000, y: 0 },
    { x: 1382914800000, y: 0 },
    { x: 1383001200000, y: 0 },
    { x: 1383087600000, y: 0 },
    { x: 1383174000000, y: 0 },
    { x: 1383260400000, y: 0 },
    { x: 1383346800000, y: 0 },
    { x: 1383433200000, y: 0 },
    { x: 1383523200000, y: 0 },
    { x: 1383609600000, y: 0 },
    { x: 1383696000000, y: 0 },
    { x: 1383782400000, y: 0 },
    { x: 1383868800000, y: 24 },
    { x: 1383955200000, y: 0 },
    { x: 1384041600000, y: 0 },
    { x: 1384128000000, y: 0 },
    { x: 1384214400000, y: 0 },
    { x: 1384300800000, y: 0 },
    { x: 1384387200000, y: 6 },
    { x: 1384473600000, y: 0 },
    { x: 1384560000000, y: 0 },
    { x: 1384646400000, y: 0 },
    { x: 1384732800000, y: 0 },
    { x: 1384819200000, y: 0 },
    { x: 1384905600000, y: 0 },
    { x: 1384992000000, y: 0 },
    { x: 1385078400000, y: 0 },
    { x: 1385164800000, y: 0 },
    { x: 1385251200000, y: 0 },
    { x: 1385337600000, y: 0 },
    { x: 1385424000000, y: 0 },
    { x: 1385510400000, y: 0 },
    { x: 1385596800000, y: 25 },
    { x: 1385683200000, y: 0 },
    { x: 1385769600000, y: 40 },
    { x: 1385856000000, y: 5 },
    { x: 1385942400000, y: 3 },
    { x: 1386028800000, y: 10 },
    { x: 1386115200000, y: 12 },
    { x: 1386201600000, y: 0 },
    { x: 1386288000000, y: 0 },
    { x: 1386374400000, y: 0 },
    { x: 1386460800000, y: 0 },
    { x: 1386547200000, y: 0 },
    { x: 1386633600000, y: 0 },
    { x: 1386720000000, y: 60 },
    { x: 1386806400000, y: 0 },
    { x: 1386892800000, y: 0 },
    { x: 1386979200000, y: 0 },
    { x: 1387065600000, y: 0 },
    { x: 1387152000000, y: 0 },
    { x: 1387238400000, y: 0 },
    { x: 1387324800000, y: 0 },
    { x: 1387411200000, y: 0 },
    { x: 1387497600000, y: 0 },
    { x: 1387584000000, y: 0 },
    { x: 1387670400000, y: 0 }
  ]
};

// util
const formatDate = timeFormat('%m/%d/%Y');
const min = (arr, fn) => Math.min(...arr.map(fn));
const max = (arr, fn) => Math.max(...arr.map(fn));
const extent = (arr, fn) => [min(arr, fn), max(arr, fn)];
const calculateTotal = (array) => {
  let sum = 0;

  return array.map(item => {
    sum += item.y;

    return {
      ...item,
      y: sum
    };
  });
};

// accessors
const xStock = d => new Date(d.x);
const yStock = d => d.y;
const bisectDate = bisector(d => new Date(d.x)).left;
const basicArrayForScale = [...res.participantsForDay, ...res.ticketsForDay];

const memo = {
  arrayForScale: basicArrayForScale
};

class Area extends React.Component {
  state = {
    width: 200,
    height: 200,
    ticksY: 10,
    ticksX: 10,
    arrayForScale: basicArrayForScale,
    dataForToolTip: {
      chart1: res.participantsForDay,
      chart2: res.ticketsForDay
    },
    margin: {
      top: 10,
      right: 20,
      bottom: 30,
      left: 40
    },
    showTotal: false,
    chart1: true,
    chart1Label: res.participantsLabel,
    chart2: true,
    chart2Label: res.ticketSoldLabel
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
    let height;

    if (innerWidth > 600) {
      height = width / 2;
    } else {
      height = width * 0.9;
    }

    this.setState({
      width, height,
      ticksY: window.innerWidth > 600 ? 8 : 6,
      ticksX: window.innerWidth > 600 ? 10 : 4
    });
  };

  memoize = (func, name) => {
    if (!memo[name]) {
      memo[name] = func();
    }

    return memo[name];
  };

  turnOnChart = (id) => {
    this.setState({
      [`chart${id}`]: true
    }, () => {
      this.updateArrayForScale();
    });
  };

  turnOffChart = (id) => {
    this.setState(({ chart1, chart2 }) => {
      if (chart1 && chart2) {
        return {
          [`chart${id}`]: false
        };
      }
    }, () => {
      this.updateArrayForScale();
    });
  };

  toggleChart = (id) => () => {
    if (this.state[`chart${id}`]) {
      this.turnOffChart(id);
    } else {
      this.turnOnChart(id);
    }
  };

  toggleShowTotal = (showTotal) => () => {
    this.setState(
      { showTotal },
      () => {
        this.updateArrayForScale();
        this.updateDataForToolTip();
      }
    );
  };

  renderToggleChartButtons = () => {
    const {
      chart1Label,
      chart2Label
    } = this.state;

    return (
      <div>
        <button onClick={this.toggleChart(1)}>{chart1Label}</button>
        <button onClick={this.toggleChart(2)}>{chart2Label}</button>
      </div>
    );
  };

  renderToggleShowTotalButtons = () => (
    <div>
      <button onClick={this.toggleShowTotal(false)}>By day</button>
      <button onClick={this.toggleShowTotal(true)}>Total</button>
    </div>
  );

  renderControl = () => (
    <Fragment>
      {this.renderToggleChartButtons()}
      {this.renderToggleShowTotalButtons()}
    </Fragment>
  );

  updateDataForToolTip = () => {
    let chart1;
    let chart2;

    if (this.state.showTotal) {
      chart1 = this.memoize(
        () => calculateTotal(res.participantsForDay),
        'calculateChart1'
      );

      chart2 = this.memoize(
        () => calculateTotal(res.ticketsForDay),
        'calculateChart2'
      );
    } else {
      chart1 = res.participantsForDay;
      chart2 = res.ticketsForDay;
    }

    this.setState({
      dataForToolTip: { chart1, chart2 }
    });
  };

  updateArrayForScale = () => {
    const { showTotal, chart1, chart2 } = this.state;
    let arrayForScale = [];

    if (showTotal) {
      if (chart1 && chart2) {
        arrayForScale = this.memoize(() => [
          ...calculateTotal(res.participantsForDay),
          ...calculateTotal(res.ticketsForDay)
        ], 'totalArrayForScale');
      } else {
        arrayForScale = chart1 ?
          this.memoize(
            () => calculateTotal(res.participantsForDay),
            'calculateChart1'
          ) :
          this.memoize(
            () => calculateTotal(res.ticketsForDay),
            'calculateChart2'
          );
      }
    } else {
      if (chart1 && chart2) {
        arrayForScale = this.memoize(() => [
          ...res.participantsForDay,
          ...res.ticketsForDay
        ], 'arrayForScale');
      } else {
        arrayForScale = chart1 ?
          res.participantsForDay :
          res.ticketsForDay;
      }
    }

    this.setState({ arrayForScale });
  };

  handleTooltip = ({ event, data, xStock, xScale, yScale }) => {
    const { showTooltip } = this.props;
    const { x } = localPoint(event);
    const x0 = xScale.invert(x);

    const index1 = bisectDate(data.chart1, x0, 1);
    const d01 = data.chart1[index1 - 1];
    const d11 = data.chart1[index1];

    const index2 = bisectDate(data.chart2, x0, 1);
    const d02 = data.chart2[index2 - 1];
    const d12 = data.chart2[index2];

    let d1 = d01;
    let d2 = d02;

    if (d11 && d11.x) {
      d1 = x0 - xStock(d01) > xStock(d11) - x0 ? d11 : d01;
    }

    if (d12 && d12.x) {
      d2 = x0 - xStock(d02) > xStock(d12) - x0 ? d12 : d02;
    }

    showTooltip({
      tooltipData: {
        d1,
        d2,
        tooltipTop1: yScale(d1.y),
        tooltipTop2: yScale(d2.y),
      },
      tooltipLeft: x
    });
  };

  render() {
    const {
      width, height,
      ticksY, ticksX,
      margin,
      arrayForScale,
      chart1, chart1Label,
      chart2, chart2Label,
      dataForToolTip
    } = this.state;

    const {
      hideTooltip,
      tooltipData,
      tooltipLeft,
      events
    } = this.props;
    if (width < 10) return null;

    // bounds
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    // scales
    const xScale = scaleTime({
      range: [margin.left, xMax + margin.right * 2],
      domain: extent(arrayForScale, xStock)
    });

    const yScale = scaleLinear({
      range: [yMax, 0],
      domain: [0, max(arrayForScale, yStock) * 1.5],
      nice: true
    });

    const isInsideChart = margin.left < tooltipLeft && tooltipLeft < xMax + margin.right * 2;

    return (
      <div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            width: '100%'
          }}
          ref={node => this.wrap = node}
        >
          <div style={{ position: 'relative' }}>
            <svg width={width} height={height}>
              <rect x={margin.left} y={margin.top} width={xMax} height={yMax} fill="#017bb9"/>
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0.2}/>
                </linearGradient>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#000" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#000" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <Group top={margin.top}>
                <GridRows
                  lineStyle={{ pointerEvents: 'none' }}
                  scale={yScale}
                  width={xMax + margin.right * 2}
                  strokeDasharray="2,2"
                  stroke="rgba(255,255,255,0.3)"
                />
                <GridColumns
                  lineStyle={{ pointerEvents: 'none' }}
                  scale={xScale}
                  height={yMax}
                  strokeDasharray="2,2"
                  stroke="rgba(255,255,255,0.3)"
                />
                {
                  chart1 && (
                    <AreaClosed
                      data={dataForToolTip.chart1}
                      x={d => xScale(xStock(d))}
                      y={d => yScale(yStock(d))}
                      yScale={yScale}
                      strokeWidth={1}
                      stroke={'url(#gradient)'}
                      fill={'url(#gradient)'}
                      curve={curveLinear}
                    />
                  )
                }
                {
                  chart2 && (
                    <AreaClosed
                      data={dataForToolTip.chart2}
                      x={d => xScale(xStock(d))}
                      y={d => yScale(yStock(d))}
                      yScale={yScale}
                      strokeWidth={1}
                      stroke={'url(#gradient2)'}
                      fill={'url(#gradient2)'}
                      curve={curveLinear}
                    />
                  )
                }
                <Bar
                  x={margin.left}
                  y={0}
                  width={xMax}
                  height={height}
                  fill="transparent"
                  rx={14}
                  onTouchStart={event =>
                    this.handleTooltip({
                      event,
                      xStock,
                      xScale,
                      yScale,
                      data: dataForToolTip
                    })
                  }
                  onTouchMove={event =>
                    this.handleTooltip({
                      event,
                      xStock,
                      xScale,
                      yScale,
                      data: dataForToolTip
                    })
                  }
                  onMouseMove={event =>
                    this.handleTooltip({
                      event,
                      xStock,
                      xScale,
                      yScale,
                      data: dataForToolTip
                    })
                  }
                  onMouseLeave={hideTooltip}
                />
                <AxisLeft
                  scale={yScale}
                  numTicks={ticksY}
                  top={0}
                  left={margin.left}
                  hideZero
                  label="Axis Left Label"
                />
                <AxisBottom
                  top={yMax}
                  scale={xScale}
                  numTicks={ticksX}
                />
                {
                  tooltipData
                  && isInsideChart
                  && (
                    <g>
                      <Line
                        from={{ x: tooltipLeft, y: 0 }}
                        to={{ x: tooltipLeft, y: yMax }}
                        stroke="rgba(92, 119, 235, 1.000)"
                        strokeWidth={2}
                        style={{ pointerEvents: 'none' }}
                        strokeDasharray="2,2"
                      />
                      {
                        chart1 && (
                          <>
                            <circle
                              cx={tooltipLeft}
                              cy={tooltipData.tooltipTop1 + 1}
                              r={4}
                              fill="black"
                              fillOpacity={0.1}
                              stroke="black"
                              strokeOpacity={0.1}
                              strokeWidth={2}
                              style={{ pointerEvents: 'none' }}
                            />
                            <circle
                              cx={tooltipLeft}
                              cy={tooltipData.tooltipTop1}
                              r={4}
                              fill="rgba(92, 119, 235, 1.000)"
                              stroke="white"
                              strokeWidth={2}
                              style={{ pointerEvents: 'none' }}
                            />
                          </>
                        )
                      }
                      {
                        chart2 && (
                          <>
                            <circle
                              cx={tooltipLeft}
                              cy={tooltipData.tooltipTop2 + 1}
                              r={4}
                              fill="black"
                              fillOpacity={0.1}
                              stroke="black"
                              strokeOpacity={0.1}
                              strokeWidth={2}
                              style={{ pointerEvents: 'none' }}
                            />

                            <circle
                              cx={tooltipLeft}
                              cy={tooltipData.tooltipTop2}
                              r={4}
                              fill="rgba(92, 119, 235, 1.000)"
                              stroke="white"
                              strokeWidth={2}
                              style={{ pointerEvents: 'none' }}
                            />
                          </>
                        )
                      }
                    </g>
                  )}
              </Group>
            </svg>
            {tooltipData && isInsideChart && (
              <Tooltip
                style={{
                  position: 'absolute',
                  top: margin.top + 10,
                  right: margin.right + 10,
                  backgroundColor: 'rgba(92, 119, 235, 1.000)',
                  color: 'white',
                  textAlign: 'left'
                }}
              >
                {chart1 && <p>{chart1Label}: {yStock(tooltipData.d1)}</p>}
                {chart2 && <p>{chart2Label}: {yStock(tooltipData.d2)}</p>}
                {formatDate(xStock(tooltipData.d1))}
              </Tooltip>
            )}
          </div>
        </div>

        {this.renderControl()}
      </div>
    );
  }
}

export default withTooltip(Area);