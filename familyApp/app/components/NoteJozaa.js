//dont delete this because it is the code for ata base jozaa
//IP Adress Jozaa: 192.168.1.82



//first the mother
1- function run automaticlly when user login in
2- get the type of user from data base (by the email)
3- put type inside the state

//second the progress
1- function run automaticlly when user login in
2- get the all tasks of user from data base (by the email)
3- calculate how many task state cchecl over all tasks
4- return this number  in percenteg

//third ranked
1- function run automaticlly when user login in
2- get the progress for all family child (by email + fimilly id + child)
3- compare each progress b other
4- if the same give the compare for how many task have
5- if the same give who eamil lenght smallest

//finance
1- function run automaticlly when user login in
2- get the how money this family have (by email + fimilly id + money)
3- subtract the input from output

need to save the table in data base and the cost to can render it



//proplem
1- menue button
2- tasks button
3- router me and waed






///note

neeed







myby

//dont know why dont wwork
 //  axios.get('http://facebook.github.io/react-native/movies.json')
 // .then(function (response) {
 //   console.log(response);
 //   alert('JSON.stringify(response.movies[0])');
 // })
 // .catch(function (error) {
 //   console.log(error);
 // });




done

/*fetch wrok trying
fectch1(){
  return fetch('http://facebook.github.io/react-native/movies.json')
    .then((response) => response.json())
    .then((responseJson) => {
      alert(JSON.stringify(responseJson.movies[0]));
    })
    .catch((error) => {
      console.error(error);
    });
}
*/




app.js--------------------------
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator} from 'react-navigation';
import Login from './app/components/Login';
import Profile from './app/components/Profile';
import SignUp from './app/components/SignUp';

/*jozaa comment this 
const Application=  createStackNavigator({
  Home: { screen: Profile },
  SignUp: { screen: SignUp },
  Login: { screen: Profile },
  Profile: { screen: Profile },
  Login:{screen: Login}

},{

    navigationOptions: {
       header: false,
      }

});
*/
export default class App extends React.Component {
  render() {
    return (
      //jozaa coomment this
      //<Application/>
      <Profile/>
      

    );
  }
}


------------------------------------------