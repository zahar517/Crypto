import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  getUserInfo,
  getUserInfoIsLoading,
  getUserInfoError,
} from "../../reducers/user";
import { getBtcPurchase, getEthPurchase } from "../../reducers/currency";
import { fetchUserInfoRequest } from "../../actions/user";
import { logout } from "../../actions/auth";
import Logo from "../Logo";
import Button from "../Button";

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #222;
  color: #aaa;
  @media (max-width: 720px) {
    flex-flow: row wrap;
  }
`;

export const HeaderLogo = styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: 720px) {
    width: 100%;
  }
`;

export const HeaderLinks = styled.nav`
  align-self: stretch;
  margin: 0 1rem;
  display: flex;
  justify-content: center;
  @media (max-width: 720px) {
    width: 100%;
  }
`;

const StyledLink = styled(NavLink)`
  padding: 1rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #aaa;
  text-align: center;
  background: #555;
  & + & {
    margin-left: 1rem;
  }
  &.selected {
    color: #fff;
    cursor: default;
    ponter-events: none;
  }
`;

export const HeaderUser = styled.div`
  margin: 1rem;
  margin-left: 0;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  @media (max-width: 720px) {
    margin-left: 1rem;
    width: 100%;
  }
`;

export const HeaderButton = Button.extend`
  margin-top: 0.5rem;
`;

export class AppHeader extends PureComponent {
  static propTypes = {
    user: PropTypes.object,
    error: PropTypes.string,
    userIsLoading: PropTypes.bool.isRequired,
    btc: PropTypes.number.isRequired,
    eth: PropTypes.number.isRequired,
    fetchUserInfoRequest: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  };

  static defaultProps = {
    userIsLoading: false,
    btc: 0,
    eth: 0,
    fetchUserInfoRequest: () => null,
    logout: () => null,
  };

  componentDidMount() {
    this.props.fetchUserInfoRequest();
  }

  handleLogout = () => this.props.logout();

  render() {
    const { userIsLoading, user, error, eth, btc } = this.props;

    return (
      <Header>
        <HeaderLogo>
          <Logo />
        </HeaderLogo>
        <HeaderLinks>
          <StyledLink activeClassName="selected" to="/trade/btc">
            BTC<br />
            {btc.toFixed(2)}
          </StyledLink>
          <StyledLink activeClassName="selected" to="/trade/eth">
            ETH<br />
            {eth.toFixed(2)}
          </StyledLink>
        </HeaderLinks>
        <HeaderUser>
          {userIsLoading && <div className="user__spinner">Загружаем ...</div>}
          {error && <div className="user__error">{error}</div>}
          {user && <div className="user__email">{user.email}</div>}
          <HeaderButton onClick={this.handleLogout}>Logout</HeaderButton>
        </HeaderUser>
      </Header>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      user: getUserInfo(state),
      userIsLoading: getUserInfoIsLoading(state),
      error: getUserInfoError(state),
      btc: getBtcPurchase(state),
      eth: getEthPurchase(state),
    }),
    {
      fetchUserInfoRequest,
      logout,
    }
  )(AppHeader)
);
