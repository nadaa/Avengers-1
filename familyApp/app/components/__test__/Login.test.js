import React from 'react';
import Login from '../Login';
import renderer from 'react-test-renderer';
import { shallow, mount, render } from 'enzyme';



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