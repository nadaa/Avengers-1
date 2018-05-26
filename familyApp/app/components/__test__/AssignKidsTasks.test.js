import React from 'react';
import AssignKidsTasks from '../AssignKidsTasks';
import renderer from 'react-test-renderer';
import { shallow, mount, render } from 'enzyme';

// jest.mock('Animated', () => {
//   const ActualAnimated = require.requireActual('Animated')
//   return {
//     ...ActualAnimated,
//     timing: (value, config) => ({
//       start: callback => {
//         value.setValue(config.toValue)
//         if (callback) {
//           callback()
//         }
//       },
//     }),
//   }
// })

// describe what we are testing
describe('AssignKidsTasks Component', () => {
 
 // make our assertion and what we expect to happen 
 it('should render without throwing an error', () => {
   expect(shallow(<AssignKidsTasks />).exists(<form className='login'></form>)).toBe(true)
 })
})