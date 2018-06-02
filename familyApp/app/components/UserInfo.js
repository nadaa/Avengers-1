import React from 'react';
import { StyleSheet, Text, View ,TextInput, KeyboardAvoidingView, TouchableOpacity, Button, AsyncStorage, Picker, ScrollView, ImageBackground } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { createStackNavigator } from 'react-navigation';
import Login from './Login';
import axios from 'axios';    
import Bar from './Bar';
// import Drawer from './Drawer';
// 
import Icon0 from 'react-native-vector-icons/Ionicons'; 

export default class UserInfo extends React.Component {
 static navigationOptions = {
   drawerIcon: () => (
     <Icon0 style={{color:'green'}} name="ios-information-circle-outline" size={20}/>
   ),
 }
  constructor(props){
    super(props);
    this.state={
      jobtitle:'',
      workaddress:'',
      worknumber:'',
      worktime:'',
      salary:'',
      familyId:'',
      marriageDate:'',
    }
  }
  sendInfo(){
    axios.post(global.ip+'/userinfo',{user:this.state})
    .then(function (response) {
      if(response.data.msg==="success"){
        alert('success')
      }
      else if(response.data.msg==='error'){
        alert('error')
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  render() {
    // const { navigate } = this.props.navigation;
    return(
      
          <KeyboardAwareScrollView behaviour='padding' style ={styles.wrapper}>
            <Bar navigation={this.props.navigation}/>
            <ScrollView contentContainerStyle={styles.contentContainer}>
              <TextInput
                ref={input =>{this.textInput =input}}
                value={this.state.jobtitle}
                style={styles.textInput}  
                placeholder='💼 jobtitle'
                onChangeText={(text) => this.setState({jobtitle: text})}
              /> 
              <TextInput
                value={this.state.workaddress}
                style={styles.textInput} 
                placeholder='📋 workaddress'
                onChangeText={(text) => this.setState({workaddress: text})}
              /> 
              <TextInput
                style={styles.textInput} 
                placeholder='📒 worknumber'
                value={this.state.worknumber}
                onChangeText={(text) => this.setState({worknumber: text})}
              /> 
              <TextInput
                style={styles.textInput} 
                placeholder='🕰 worktime'
                value={this.state.worktime}
                onChangeText={(text) => this.setState({worktime: text})}
              /> 
               <TextInput
                style={styles.textInput} 
                placeholder='💰 salary'
                value={this.state.salary}
                onChangeText={(text) => this.setState({salary: text})}
              /> 
               <TextInput
                style={styles.textInput} 
                placeholder='👨‍👩‍👧 familyId'
                value={this.state.familyId}
                onChangeText={(text) => this.setState({familyId: text})}
              /> 
              <TextInput
                style={styles.textInput} 
                placeholder='💑 marriageDate'
                value={this.state.marriageDate}
                onChangeText={(text) => this.setState({marriageDate: text})}
              />
              <TouchableOpacity
                style={styles.btn}
                onPress={this.sendInfo.bind(this)}
              >
                <Text>Fill in</Text>
              </TouchableOpacity>    
            </ScrollView>
          </KeyboardAwareScrollView>
      
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 23,
  },
  header: {
    fontSize: 24,
    marginBottom: 60,
    color: '#fff',
    fontWeight: 'bold',
  },
  textInput: {
    alignSelf: 'stretch',
    padding: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
    marginLeft:40,
    marginRight:40,
  },
  datepicker: {
    width:295,
    height:60,
    alignSelf: 'stretch',
    padding: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  rolepicker: {
    alignSelf: 'stretch',
    padding: 16,
    marginBottom: 20,
    backgroundColor: '#fff',   
  },
  btn: {
    alignSelf:'stretch',
    backgroundColor:'#1d9600',
    padding:20,
    alignItems:'center',
    marginLeft:40,
    marginRight:40,
  },
  contentContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',  
  }
})