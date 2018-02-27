import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { fetchWalletRequest } from '../../actions/wallet';
import { 
  getCoins,
  getIsLoading,
} from '../../reducers/wallet';
import PropTypes from 'prop-types';
import './Wallet.css';

export class Coins extends PureComponent {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    coins: PropTypes.object.isRequired,
    fetchWalletRequest: PropTypes.func.isRequired
  };

  static defaultProps = {
    isLoading: false,
    coins: {},
    fetchWalletRequest: () => null
  };

  componentDidMount() {
    this.props.fetchWalletRequest();
  }

  render() {
    const { coins, isLoading } = this.props;

    return (
      <div className="wallet">
        <h2>Ваш счет</h2>
        <div className="coin__container">
          <div className="coin__input">
            { isLoading ? '...' : coins.usd }
          </div>
          <p className="coin__currency">$</p>
        </div>
        <div className="coin__container">
          <div className="coin__input">
            { isLoading ? '...' : coins.btc }
          </div>
          <p className="coin__currency">BTC</p>
        </div>
        <div className="coin__container">
          <div className="coin__input">
            { isLoading ? '...' : coins.eth }
          </div>
          <p className="coin__currency">ETH</p>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    isLoading: getIsLoading(state),
    coins: getCoins(state),
  }),
  {
    fetchWalletRequest
  }
)(Coins);
