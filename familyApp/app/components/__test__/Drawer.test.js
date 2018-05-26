import React from 'react';
import Drawer from '../Drawer';
import renderer from 'react-test-renderer';
import { shallow, mount, render } from 'enzyme';

// describe what we are testing
describe('Drawer Component', () => {
 
 // make our assertion and what we expect to happen 
 it('should render without throwing an error', () => {
   expect(shallow(<Drawer />).exists(<form className='login'></form>)).toBe(true)
 })
})