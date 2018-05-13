import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {StackNavigator} from 'react-navigation';
import Login from './app/components/Login';
import Profile from './app/components/Profile'
 

const Application=  StackNavigator({
  Home: { screen: Login },
},{

    navigationOptions: {
       header: false,
      }

});

export default class App extends React.Component {
  render() {
    return (
      <Application/>
      // <View>
      // <Text>fdsgdsfdsfsfsfdsf      </Text>
      // <Text>fdsgdsfdsfsfsfdsf      </Text>
      // <Text>gdsfdsfsfsfdsf      </Text>
      // </View>

    );
  }
}

