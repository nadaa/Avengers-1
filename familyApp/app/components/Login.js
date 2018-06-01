import React from 'react';
import { StyleSheet, Text,  View , TextInput, Image, KeyboardAvoidingView, TouchableOpacity, AsyncStorage, ScrollView, ImageBackground,} from 'react-native';
import axios from 'axios';  
import { createStackNavigator } from 'react-navigation';
import SignUp from './SignUp';
import DrawerKids from './DrawerKids';
import Drawer from './Drawer';

export default class Login extends React.Component {
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:'',
    }
  }
  saveData(userInfo){
    AsyncStorage.setItem('username',(userInfo.username));
    AsyncStorage.setItem('email',(userInfo.email));
    AsyncStorage.setItem('role',(userInfo.role));
    AsyncStorage.setItem('familyId',(userInfo.familyId));
  }
  sendLogin(){
    var that=this;
    const { navigate } = this.props.navigation;
    axios.post(global.ip+'/login',{user:this.state})
        .then(async function (response) {
          //alert(response.data.msg)
          that.saveData(response.data.user);
          var role= await AsyncStorage.getItem('role');
          if(response.data.msg==="success login"){
            if(role==='Mother'||role==='Father'){
              navigate('Drawer')
            }else if(role==='Child'){
              navigate('DrawerKids')
            }
          }else if(response.data.msg==="the password is not correct"){
            alert("the password is not correct")
          }else if(response.data.msg==="no account"){
            alert('You Have No Account');
            navigate('SignUp');
          }
          })
        .catch(function (error) {
          console.log(error);
        });
  };
  render(){
    const { navigate } = this.props.navigation;
    return( 
      <ImageBackground

        source={{uri: 'http://tekino.co/wp-content/uploads/2017/11/light-orange-color-abstract-background-smooth-in-light-orange-color-photo-by-light-orange-colored-poop.jpg'}}
        style={styles.container}>
        <View>
          <Image 
          source={require('../images/15.png')}
          style={{width: 300, height: 250,justifyContent: 'center',marginTop:120, opacity:1}}/>
          </View>
        <KeyboardAvoidingView behaviour='padding' style ={styles.wrapper}>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <TextInput
          	  style={styles.textInput} 
              value={this.state.email}
          	  placeholder='✉️   Email'
          	  onChangeText={(email) => this.setState({email})}
            /> 
            <TextInput
              style={styles.textInput} 
              value={this.state.password}
              secureTextEntry={true}
              placeholder='🔐   Password'
              onChangeText={(password) => this.setState({password})}
            /> 
            <TouchableOpacity
              style={styles.btn}
              onPress={()=> this.sendLogin()}
          	>
          	  <Text>Login</Text>
            </TouchableOpacity>
          	<Text style={{color: 'black', paddingTop:20,fontSize: 15}} onPress={() =>  navigate('SignUp')}>
              Create Account 
            </Text>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    )
  }
}
const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20,
    flex: 1,
    alignItems: 'center',
    marginTop:20,
  },
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#2896d3',
    paddingLeft: 40,
    paddingRight: 40,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 23,
  },
  header: {
    fontSize: 24,
    marginBottom: 15,
    color: '#fff',
    fontWeight: 'bold',
  },
  textInput: {
    alignSelf: 'stretch',
    padding: 16,
    marginBottom: 10,
    backgroundColor: '#fff',
    fontSize: 15,
    borderColor: 'green',
    borderWidth: 1,
  },
  btn: {
    alignSelf:'stretch',
    backgroundColor:'white',
    padding:10,
    alignItems:'center',
    marginTop:30,
    borderColor: 'green',
    borderWidth: 1,
    
  }
})

