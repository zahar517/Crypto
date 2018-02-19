import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../LoginPage';
import Particles from 'react-particles-js';

describe('Login Component tests', () => {
  it('contains logo, form, footer, particles', () => {
    const loginPage = shallow(<LoginPage />);

    expect(loginPage.find('.login__logo')).toHaveLength(1);
    expect(loginPage.find('.login__form')).toHaveLength(1);
    expect(loginPage.find('.login__footer')).toHaveLength(1);
    expect(loginPage.find(Particles)).toHaveLength(1);
  })
});
