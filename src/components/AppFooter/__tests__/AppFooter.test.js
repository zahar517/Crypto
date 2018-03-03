import React from 'react';
import AppFooter from '../../AppFooter';
import { shallow } from 'enzyme';
import Logo from '../../Logo';

describe('AppFooter Component tests', () => {
  it('contains Logo', () => {
    const appFooter = shallow(<AppFooter />);

    expect(appFooter.find(Logo)).toHaveLength(1);
  });
});
