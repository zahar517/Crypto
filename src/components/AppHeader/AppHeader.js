import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { 
  getUserInfo,
  getUserInfoIsLoading,
  getUserInfoError
} from '../../reducers/user';
import { getBtcPurchase, getEthPurchase } from '../../reducers/currency';
import { fetchUserInfoRequest } from '../../actions/user';
import { logout } from '../../actions/auth';
import './AppHeader.css';
import Logo from './Logo-white.svg';

export class AppHeader extends PureComponent {
  static propTypes = {
    user: PropTypes.object,
    error: PropTypes.string,
    userIsLoading: PropTypes.bool.isRequired,
    fetchUserInfoRequest: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  };

  static defaultProps = {
    userIsLoading: false,
    fetchUserInfoRequest: () => null,
    logout: () => null,
  }
  
  componentDidMount() {
    this.props.fetchUserInfoRequest();
  }

  handleLogout = () => this.props.logout();
  render() {
    const { userIsLoading, user, error, eth, btc } = this.props;

    return (
      <div className="header">
        <div className="header__logo">
          <img src={ Logo } alt="logo" />
        </div>
        <div className="header__links">
          <NavLink activeClassName="selected" to="/trade/btc" >
            BTC<br />{ btc }
          </NavLink>
          <NavLink activeClassName="selected" to="/trade/eth">
            ETH<br />{ eth }
          </NavLink>
        </div>
        <div className="header__user">
          { userIsLoading && <div className="user__spinner">Идет загрузка ...</div> }
          { error && <div className="user__error">{ error }</div> }
          { user &&
            <div className="user__email">{ user.email }</div>
          }
          <button onClick={ this.handleLogout }>Logout</button>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(
  state => ({
    user: getUserInfo(state),
    userIsLoading: getUserInfoIsLoading(state),
    error: getUserInfoError(state),
    btc: getBtcPurchase(state),
    eth: getEthPurchase(state),
  }),
  {
    fetchUserInfoRequest,
    logout
  }
)(AppHeader));
