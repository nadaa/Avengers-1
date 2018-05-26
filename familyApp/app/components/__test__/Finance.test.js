import React from 'react';
import Finance from '../Finance';
import renderer from 'react-test-renderer';
import { shallow, mount, render } from 'enzyme';

// describe what we are testing
describe('Finance Component', () => {
 
 // make our assertion and what we expect to happen 
 it('should render without throwing an error', () => {
   expect(shallow(<Finance />).exists(<form className='login'></form>)).toBe(true)
 })
})