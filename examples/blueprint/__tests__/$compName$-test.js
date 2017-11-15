import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

const $compName$ = require('../src/$compName$');

describe('$compName$', function () {
  it('exists', () => {
    let component = shallow(<$compName$ />);

    expect(component).toMatchSnapshot();
  });
});
