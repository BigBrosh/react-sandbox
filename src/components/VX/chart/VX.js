import React, { Fragment } from 'react';
import { AreaClosed, Line, Bar } from '@vx/shape';
import { curveLinear } from '@vx/curve';
import { Group } from '@vx/group';
import { GridRows, GridColumns } from '@vx/grid';
import { scaleTime, scaleLinear } from '@vx/scale';
import { Tooltip } from '@vx/tooltip';
import { localPoint } from '@vx/event';
import { bisector } from 'd3-array';
import { timeFormat } from 'd3-time-format';
import { AxisLeft, AxisBottom } from '@vx/axis';
import DatePicker from './components/DatePicker';
import mockData from './mockData';

const res = mockData;

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

const memoize = (func, name) => {
  if (!memo[name]) {
    memo[name] = func();
  }

  return memo[name];
};

const [minDate, maxDate] = extent(basicArrayForScale, xStock);

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
    chart2Label: res.ticketSoldLabel,
    dateMin: minDate,
    dateMax: maxDate,
    xMax: null,
    yMax: null,
    xScale: null,
    yScale: null
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

    this.setState(
      {
        width, height,
        ticksY: window.innerWidth > 600 ? 8 : 6,
        ticksX: window.innerWidth > 600 ? 10 : 4
      },
      this.calculateSizeRestrictions
    );
  };

  calculateSizeRestrictions = () => {
    const { margin, width, height } = this.state;
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    this.setState({ xMax, yMax }, () => {
      this.updateArrayForScale();
    });
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

  handleDateChange = (type) => (date) => {
    this.setState({
      [`date${type}`]: date
    }, () => {
      this.updateArrayForScale();
      this.updateDataForToolTip();
    });
  };

  renderDatePickerMin = () => {
    return (
      <DatePicker
        value={this.state.dateMin}
        handleChange={this.handleDateChange}
        dateType='Min'
        minDate={minDate}
        maxDate={this.state.dateMax}
      />
    );
  };

  renderDatePickerMax = () => {
    return (
      <DatePicker
        value={this.state.dateMax}
        handleChange={this.handleDateChange}
        dateType='Max'
        minDate={this.state.dateMin}
        maxDate={maxDate}
      />
    );
  };

  renderDatePickers = () => {
    return (
      <div>
        {this.renderDatePickerMin()}
        {this.renderDatePickerMax()}
      </div>
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
      {this.renderDatePickers()}
    </Fragment>
  );

  updateDataForToolTip = () => {
    let chart1;
    let chart2;
    const participants = this.cutArrayByDateRestrictions(res.participantsForDay, 'participants');
    const tickets = this.cutArrayByDateRestrictions(res.ticketsForDay, 'tickets');

    if (this.state.showTotal) {
      chart1 = memoize(
        () => calculateTotal(participants),
        this.withDateRestrictions('calculateChart1')
      );

      chart2 = memoize(
        () => calculateTotal(tickets),
        this.withDateRestrictions('calculateChart2')
      );
    } else {
      chart1 = participants;
      chart2 = tickets;
    }

    this.setState({
      dataForToolTip: { chart1, chart2 }
    });
  };

  cutArrayByDateRestrictions = (array, type) => {
    const { dateMin, dateMax } = this.state;

    return memoize(() => {
      return array.filter(({ x }) => {
        return x >= dateMin && x <= dateMax;
      });
    }, this.withDateRestrictions(`cuttingArray${type}`));
  };

  withDateRestrictions = (string) => {
    const { dateMin, dateMax } = this.state;
    return `${string} from: ${dateMin} to: ${dateMax}`;
  };

  updateArrayForScale = () => {
    let arrayForScale = [];
    const { showTotal, chart1, chart2, margin, xMax, yMax } = this.state;
    const participants = this.cutArrayByDateRestrictions(res.participantsForDay, 'participants');
    const tickets = this.cutArrayByDateRestrictions(res.ticketsForDay, 'tickets');

    if (showTotal) {
      if (chart1 && chart2) {
        arrayForScale = memoize(() => [
          ...calculateTotal(participants),
          ...calculateTotal(tickets)
        ], this.withDateRestrictions('totalArrayForScale'));
      } else {
        arrayForScale = chart1 ?
          memoize(
            () => calculateTotal(participants),
            this.withDateRestrictions('calculateChart1')
          ) :
          memoize(
            () => calculateTotal(tickets),
            this.withDateRestrictions('calculateChart2')
          );
      }
    } else {
      if (chart1 && chart2) {
        arrayForScale = memoize(() => [
          ...participants,
          ...tickets
        ], this.withDateRestrictions('arrayForScale'));
      } else {
        arrayForScale = chart1 ?
          participants :
          tickets;
      }
    }

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

    this.setState({ arrayForScale, xScale, yScale });
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
      xMax, yMax,
      ticksY, ticksX,
      margin,
      xScale, yScale,
      chart1, chart1Label,
      chart2, chart2Label,
      dataForToolTip
    } = this.state;

    const {
      hideTooltip,
      tooltipData,
      tooltipLeft
    } = this.props;
    if (width < 10) return null;

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
              {
                xScale && (
                  <>
                    <rect x={margin.left} y={margin.top} width={xMax} height={yMax} fill="#017bb9"/>
                    <defs>
                      <linearGradient id='gradient' x1='0%' y1='0%' x2='0%' y2='100%'>
                        <stop offset='0%' stopColor='#FFFFFF' stopOpacity={1}/>
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
                  </>
                )
              }
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

export default Area;