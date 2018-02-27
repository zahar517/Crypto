import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { selectBtc, selectEth } from '../../actions/currency';
import AppHeader from '../AppHeader';
import TradeOperations from '../TradeOperations';
import Wallet from '../Wallet';
import Chart from '../Chart';
import AppFooter from '../AppFooter';
import './UserPage.css';

export class UserPage extends PureComponent {
  static propTypes = {
    selectBtc: PropTypes.func.isRequired,
    selectEth: PropTypes.func.isRequired,
  };

  static defaultProps = {
    selectBtc: () => null,
    selectEth: () => null,
  };

  constructor(props) {
    super(props);

    if (props.match.params.currency === 'btc') {
      props.selectBtc();
    } else {
      props.selectEth();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.currency === this.props.match.params.currency) return;
    if (nextProps.match.params.currency === 'btc') {
      nextProps.selectBtc();
    } else {
      nextProps.selectEth();
    }
  }

  render() {
    return (
      <div className="app">
        <header className="app__header">
          <AppHeader />
        </header>
        <main className="app__main">
          <div className="main__top">
            <div className="main__wallet">
              <Wallet />
            </div>
            <div className="main__trade">
              <TradeOperations />
            </div>
          </div>
          <Chart />
        </main>
        <footer className="app__footer">
          <AppFooter />
        </footer>
      </div>
    );
  }
}

export default connect(
  null,
  {
    selectBtc,
    selectEth
  }
)(UserPage);
