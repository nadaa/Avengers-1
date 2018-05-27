import React from 'react';
import Bar from '../Bar';
import renderer from 'react-test-renderer';
import { shallow, mount, render } from 'enzyme';

// describe what we are testing
describe('Bar Component', () => {
 
 // make our assertion and what we expect to happen 
 it('should render without throwing an error', () => {
   expect(shallow(<Bar />).exists(<form className='login'></form>)).toBe(true)
 })
})