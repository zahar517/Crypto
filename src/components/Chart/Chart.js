import {LineChart} from 'react-easy-chart';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { getCurrentCurrencyQuotes, getOffset } from '../../reducers/currency';
import { selectOffset } from '../../actions/currency';
import PropTypes from 'prop-types';
import './Chart.css';

const offsets = {
  '2h': '2ч',
  '4h': '4ч',
  '8h': '8ч',
  '1d': '1д',
  '7d': '7д',
};

export class Chart extends PureComponent {
  static propTypes = {
    quotes: PropTypes.array.isRequired
  };

  static defaultProps = {
    quotes: []
  };

  constructor(props) {
    super(props);
    this.state = {
      sell: props.quotes.map(el => [ el.mts, el.sell ]),
      purchase: props.quotes.map(el => [ el.mts, el.purchase ])
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      sell: nextProps.quotes.map(el => [ el.mts, el.sell ]),
      purchase: nextProps.quotes.map(el => [ el.mts, el.purchase ])
    });
  }

  handleChartButtonsClick = event => {
    const offset = event.target.getAttribute('data-offset');

    if (offset) {
      this.props.selectOffset(offset);
    }
  }

  render() {
    const { sell, purchase } = this.state;
    const { offset } = this.props;

    return (
      <div className="chart">
        <div className="chart__buttons" onClick={ this.handleChartButtonsClick }>
          {
            Object.keys(offsets).map(key => (
              <button key={ key } data-offset={ key } className={ (offset === key) ? "selected" : undefined }>{ offsets[key] }</button>
            ))
          }
        </div>
        <LineChart
          lineColors={['blue', 'red']}
          axes
          grid
          verticalGrid
          interpolate={'cardinal'}
          xType={'time'}
          datePattern={'%d-%m %H:%M'}
          width={750}
          height={400}
          style={{
            '.axis path': {
              stroke: '#EDF0F1',
            },
          }}
          data={[
            sell.map(([date, value]) => ({x: moment(date).format('DD-MM HH:mm'), y: value})),
            purchase.map(([date, value]) => ({x: moment(date).format('DD-MM HH:mm'), y: value})),
          ]}
        />
      </div>
    );
  }
}

export default connect(
  state => (
    {
      quotes: getCurrentCurrencyQuotes(state),
      offset: getOffset(state)
    }
  ),
  {
    selectOffset
  }
)(Chart);
