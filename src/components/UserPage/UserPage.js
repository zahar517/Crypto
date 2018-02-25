import React, { PureComponent } from 'react';
import TradeOperations from '../TradeOperations';
import { connect } from 'react-redux';
import { 
  getUserInfo,
  getUserInfoIsLoading,
  getUserInfoError
} from '../../reducers/user';
import { userInfoRequest } from '../../actions/user';
import PropTypes from 'prop-types';

export class UserPage extends PureComponent {
  static propTypes = {
    user: PropTypes.object,
    error: PropTypes.object,
    userIsLoading: PropTypes.bool.isRequired,
    userInfoRequest: PropTypes.func.isRequired
  };

  static defaultProps = {
    userIsLoading: false,
    userInfoRequest: () => null
  }

  handleClick = () => this.props.userInfoRequest();
  
  componentDidMount() {
    // this.props.userInfoRequest();
  }

  render() {
    const { userIsLoading, user, error} = this.props;

    return (
      <main>
        <div>
          User info
          { userIsLoading && <div className="user__spinner">'Идет загрузка ...'</div> }
          { error && <div className="user__error">Не удалось загрузить</div> }
          { user &&
            <div className="user__email">{ user.email }</div>
          }
          <button onClick={ this.handleClick }>Click me</button>
        </div>
        <TradeOperations />
      </main>
    );
  }
}

export default connect(
  state => ({
    user: getUserInfo(state),
    userIsLoading: getUserInfoIsLoading(state),
    error: getUserInfoError(state)
  }),
  {
    userInfoRequest
  }
)(UserPage);
