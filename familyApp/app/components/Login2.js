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
        navigate('Drawer');
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
    //let userEmail1=this.state.email;
    var that=this
    var allData
    //alert('you call the function with email: ' + this.state.userEmailSave )
    axios.post('http://192.168.0.89:3000/getData', {email:this.state.email})
      .then(function (res) {
        //console.log(res.data)
        allData=res.data
        AsyncStorage.setItem('username',allData.username)
        AsyncStorage.setItem('email',allData.email)
        AsyncStorage.setItem('bdate',allData.bdate)
        AsyncStorage.setItem('role',allData.role)
        AsyncStorage.setItem('familyId',allData.familyId)
        //alert('you want to save: ' + JSON.stringify(allData))
      })
      .catch(function (err) {
        //console.log(err);
        alert(err);
    });
    //alert('the type is: ')    
  }
  showData=async()=>{
    try{
      let role=await AsyncStorage.getItem('role')
      alert('the role is: ' + JSON.stringify(role))
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



