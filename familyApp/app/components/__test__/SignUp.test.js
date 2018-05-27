import React from 'react';
import SignUp from '../SignUp';
import renderer from 'react-test-renderer';
import { shallow, mount, render } from 'enzyme';

// describe what we are testing
describe('SignUp Component', () => {
 
 // make our assertion and what we expect to happen 
 it('should render without throwing an error', () => {
   expect(shallow(<SignUp />).exists(<form className='login'></form>)).toBe(true)
 })
})