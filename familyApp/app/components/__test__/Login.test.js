import React from 'react';
import Login from '../Login';
import renderer from 'react-test-renderer';
import { shallow, mount, render } from 'enzyme';

jest.mock('Animated', () => {
  const ActualAnimated = require.requireActual('Animated')
  return {
    ...ActualAnimated,
    timing: (value, config) => ({
      start: callback => {
        value.setValue(config.toValue)
        if (callback) {
          callback()
        }
      },
    }),
  }
})

// describe what we are testing
describe('Login Component', () => {
 
 // make our assertion and what we expect to happen 
 it('should render without throwing an error', () => {
   expect(shallow(<Login />).exists(<form className='login'></form>)).toBe(true)
 })
})

// it('should display a text input to fill question', () => {
// 	const wrapper = shallow(<Login />);
// 	expect(wrapper.find('input[type="text"]').length).toBe(1);
// });


// const login = shallow(<Login />);

// describe("Login", () => {
//   it("renders correctly", () => {
//     expect(login).toMatchSnapshot();
//   });
// });


// describe('<Login />', () => {
// 	it('renders three <Login /> components', () => {
// 		const wrapper = shallow(<Login />);
// 		expect(wrapper.find(Login)).to.have.length(5);
// 	});

// });


// import React from 'react';
// import Login from '../components/Login';
// import renderer from 'react-test-renderer';






// it('should have handleClick method', () => {
// 	const wrapper = shallow(<Login />); 
// 	wrapper.instance().handleClick()
// });



// test('renders without crashing', () => {
// 	const tree = renderer.create(<Login />).toJSON();
// 	expect(tree).toMatchSnapshot();
// });
test('1 equal 1', () => {
	expect(1).toEqual(1);
});