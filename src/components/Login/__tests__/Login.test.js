import React from 'react';
import { shallow } from 'enzyme';
import { Login } from '../Login';
import Particles from 'react-particles-js';

describe('Login Component tests', () => {
  it('contains logo, form, footer, particles', () => {
    const login = shallow(<Login />);

    expect(login.find('.login__logo')).toHaveLength(1);
    expect(login.find('.login__form')).toHaveLength(1);
    expect(login.find('.login__footer')).toHaveLength(1);
    expect(login.find(Particles)).toHaveLength(1);
  })
});
