import React from 'react';
import AppFooter from '../../AppFooter';
import { shallow } from 'enzyme';
import Logo from '../../AppHeader/Logo-white.svg';

describe('AppFooter Component tests', () => {
  it('contains div with class footer', () => {
    const appFooter = shallow(<AppFooter />);

    expect(appFooter.find('.footer')).toHaveLength(1);
  });

  it('contains Logo', () => {
    const appFooter = shallow(<AppFooter />);

    expect(appFooter.find('.footer__logo img').html()).toMatch(Logo);
  });
});
