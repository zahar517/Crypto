import React from 'react';
import AppFooter from '../../AppFooter';
import { shallow } from 'enzyme';
import { FooterLogo } from '../AppFooter';
import Logo from '../../AppHeader/Logo-white.svg';

describe('AppFooter Component tests', () => {
  it('contains Logo', () => {
    const appFooter = shallow(<AppFooter />);

    expect(appFooter.find(FooterLogo).html()).toMatch(Logo);
  });
});
