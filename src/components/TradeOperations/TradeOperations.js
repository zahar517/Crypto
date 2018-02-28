import React, {PureComponent} from 'react';
import {compose, mapProps} from 'recompose';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {getCurrentCurrencyPurchase, getCurrentCurrencySell, getSelectedCurrency} from '../../reducers/currency';
import {buyCurrencyRequest, sellCurrencyRequest} from '../../actions/currency';
import styled from 'styled-components';
import { getError, getIsLoading } from '../../reducers/wallet';

const enhance = compose(
  withRouter,
  connect(
    state => ({
      currentCurrentPurchase: getCurrentCurrencyPurchase(state),
      currentCurrentSell: getCurrentCurrencySell(state),
      selectedCurrency: getSelectedCurrency(state),
      error: getError(state),
      isLoading: getIsLoading(state),
    }),
    {
      buyCurrencyRequest,
      sellCurrencyRequest,
    },
  ),
  mapProps(
    ({
      buyCurrencyRequest,
      sellCurrencyRequest,
      selectedCurrency,
      currentCurrentPurchase,
      currentCurrentSell,
      error,
      isLoading
    }) => ({
      selectedCurrency,
      buyCurrencyRequest,
      sellCurrencyRequest,
      purchase: currentCurrentPurchase,
      sell: currentCurrentSell,
      error,
      isLoading
    }),
  ),
);

const Container = styled.article`
  text-align: left;
`;

const InputWrapper = styled.div`
  background-color: #f2f2f2;
  border-radius: 4px;
  display: inline-block;
  position: relative;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  background-color: transparent;
  border: none;
  text-align: right;
  width: 13rem;
  padding: 0.25rem;
  padding-right: 50px;
  font-size: 1rem;
`;

const Currency = styled.span`
  position: absolute;
  right: 8px;
  width: 38px;
  text-align: left;
  color: #adadad;
  top: 3px;
`;

const Button = styled.button`
  display: inline-block;
  width: 100px;
  color: #fff;
  padding: 0.25rem 1rem;
  margin-left: 1rem;
  &:disabled {
    cursor: wait;
  }
`;

const ButtonSell = Button.extend`
  background-color: #cb5f58;
  &:hover {
    background-color: #ba564f;
  }
`;
const ButtonPurchase = Button.extend`
  background-color: #69b3dc;
  &:hover {
    background-color: #63acd5;
  }
`;

class TradeOperations extends PureComponent {
  state = {
    inputFiat: 1,
    inputSell: this.props.sell,
    inputPurchase: this.props.purchase,
    currentInput: 'inputFiat',
  };

  componentWillReceiveProps(nextProps) {
    const {sell, purchase} = nextProps;
    const {currentInput} = this.state;
    this.changeInputs(currentInput, sell, purchase);
  }

  handleChange = event => {
    const {name, value} = event.target;
    const {sell, purchase} = this.props;

    this.setState(state => ({[name]: value}));
    if (isNaN(event.target.value) || event.target.value === '') return;
    else this.changeInputs(event.target.name, sell, purchase);
  };

  handleBlur = () => {
    this.setState({currentInput: 'inputFiat'});
  };

  handleFocus = event => {
    this.setState({currentInput: event.target.name});
  };

  handleSell = event => {
    const {selectedCurrency} = this.props;
    const {inputFiat} = this.state;
    this.props.sellCurrencyRequest({selectedCurrency, value: inputFiat});
  };

  handleBuy = event => {
    const {selectedCurrency} = this.props;
    const {inputFiat} = this.state;
    this.props.buyCurrencyRequest({selectedCurrency, value: inputFiat});
  };

  changeInputs(name, sell, purchase) {
    switch (name) {
      case 'inputFiat': {
        this.setState(({inputFiat}) => {
          const parsed = isNaN(inputFiat) ? 0 : parseFloat(inputFiat);
          return {
            inputSell: parsed * sell,
            inputPurchase: parsed * purchase,
          };
        });
        break;
      }
      case 'inputSell':
        this.setState(({inputSell}) => {
          const parsedSell = isNaN(inputSell) ? 0 : parseFloat(inputSell);
          const nextFiat = parsedSell / sell;
          return {
            inputFiat: nextFiat,
            inputPurchase: nextFiat * purchase,
          };
        });
        break;
      case 'inputPurchase':
        this.setState(({inputPurchase}) => {
          const parsedPurchase = isNaN(inputPurchase) ? 0 : parseFloat(inputPurchase);
          const nextFiat = parsedPurchase / purchase;
          return {
            inputFiat: nextFiat,
            inputSell: nextFiat * sell,
          };
        });
        break;
      default:
        break;
    }
  }

  render() {
    const {error, selectedCurrency, isLoading} = this.props;
    const {inputFiat, inputSell, inputPurchase} = this.state;
    return (
      <Container>
        <h2>Покупка/продажа</h2>
        <InputWrapper>
          <Input
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            name="inputFiat"
            value={inputFiat}
          />
          <Currency>{selectedCurrency.toUpperCase()}</Currency>
        </InputWrapper>
        <div>
          <InputWrapper>
            <Input
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              name="inputPurchase"
              value={inputPurchase}
            />
            <Currency>$</Currency>
          </InputWrapper>
          <ButtonSell onClick={this.handleSell} disabled={ isLoading }>Продать</ButtonSell>
        </div>
        <div>
          <InputWrapper>
            <Input
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              name="inputSell"
              value={inputSell}
            />
            <Currency>$</Currency>
          </InputWrapper>
          <ButtonPurchase onClick={this.handleBuy} disabled={ isLoading }>Купить</ButtonPurchase>
        </div>
        {error && <p style={{color: 'red'}}>{error}</p>}
      </Container>
    );
  }
}

export default enhance(TradeOperations);
