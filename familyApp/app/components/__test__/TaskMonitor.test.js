import React from 'react';
import TaskMonitor from '../TaskMonitor';
import renderer from 'react-test-renderer';
import { shallow, mount, render } from 'enzyme';

// describe what we are testing
describe('TaskMonitor Component', () => {
 
 // make our assertion and what we expect to happen 
 it('should render without throwing an error', () => {
   expect(shallow(<TaskMonitor />).exists(<form className='login'></form>)).toBe(true)
 })
})