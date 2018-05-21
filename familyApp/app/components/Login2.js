import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, AsyncStorage} from 'react-native';
import axios from 'axios';  
import SignUp from './SignUp';
import Drawer from './Drawer';
export default class Login2 extends React.Component {
  constructor(props){
    super(props);
    this.state={
      email:'alex@yahoo.com',
      password:'1234567',
    }
  }
  sendLogin(){
    this.saveData()
    const {navigate}=this.props.navigation;
    axios.post('http://192.168.0.89:3000/login2', {user:this.state})
    .then(function (response) {
      if(response.data.msg==="success login"){
        var email=response.data.email
        //alert(response.data.msg + ' with email: ' + response.data.email);
        navigate('Drawer',{ email });
      }else if(response.data.msg==="the password is not correct"){
        alert("the password is not correct please inser it correct");
      }else if(response.data.msg==="no account"){
        alert('You dont have an account please make one then login');
        navigate('SignUp');
      }
    })
    .catch(function (error) {
      console.log(error);
      alert(error);
    });
  };

  saveData(){
    let userEmail1=this.state.email;
    AsyncStorage.setItem('userEmail',userEmail1)
    //alert('you want to save: ' + userEmail1)
  }
  showData=async()=>{
    try{
      let userEmail3=await AsyncStorage.getItem('userEmail')
      alert('the email save is: ' + userEmail3)
    }
    catch(error){
      alert(error)
    }
  } 
  render() {
    const { navigate } = this.props.navigation;
    return (
  <View style={styles.container}>
    <Text style={styles.header}> LOGIN </Text>

    <TextInput style={styles.textInput} 
    placeholder='Email'
    value={this.state.email} 
    onChangeText={(email)=>this.setState({email})}/> 

    <TextInput style={styles.textInput} 
    placeholder='Password'
    value={this.state.password} 
    onChangeText={(password)=>this.setState({password})}/>

    <TouchableOpacity style={styles.btn} 
    onPress={this.sendLogin.bind(this)}>
    <Text>LOGIN</Text></TouchableOpacity>

    <TouchableOpacity style={styles.btn} 
    onPress={this.saveData.bind(this)}>
    <Text>SAVE</Text></TouchableOpacity>

    <TouchableOpacity style={styles.btn} 
    onPress={this.showData}>
    <Text>SHOW</Text></TouchableOpacity>
  </View>
      );
    }
}
const styles = StyleSheet.create({
  wrapper: {flex: 1},
  container: {flex: 1,alignItems: 'center',justifyContent: 'center',
  backgroundColor: '#123456',paddingLeft: 40,paddingRight: 40},
  header: {fontSize: 30,marginBottom: 60,color: '#fff',fontWeight: 'bold'},
  textInput: {alignSelf: 'stretch',padding: 16,marginBottom: 20,backgroundColor: '#fff'},
  btn: {alignSelf:'stretch',backgroundColor:'#01c853',padding:20,alignItems:'center'}
})



