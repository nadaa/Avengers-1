import React from 'react';
import { AppRegistery,  StyleSheet, Text,  View , TextInput, TouchableOpacity } from 'react-native';
import {createStackNavigator } from 'react-navigation';
import Login from './Login';
import axios from 'axios';    
import DatePicker from 'react-native-datepicker';
import {Select, Option} from "react-native-chooser";
import Bar from './Bar';

export default class ShortageNote extends React.Component {
  render(){
    return(
      <View key={this.props.keyval} style={styles.note}>
        <Text style={styles.noteText}>{this.props.val.date}</Text> 
        <Text style={styles.noteText}>{this.props.val}</Text> 
        <TouchableOpacity onPress={this.props.deleteMethod} style={styles.noteDelete}>
          <Text style={styles.noteDeleteText}>D</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  note:{
    position:'relative',
    padding:20,
    paddingRight:20,
    borderBottomWidth:2,
    borderBottomColor:'#ededed',
  },
  noteText:{
    paddingLeft:20,
    borderLeftWidth:10,
    borderLeftColor:'#E91E63'
  },
  noteDelete:{
    position:'absolute',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#c5e7bb',
    padding:10,
    top:10,
    bottom:10,
    right:10,
  },
  noteDeleteText:{
    color:'white',
  },
})  

