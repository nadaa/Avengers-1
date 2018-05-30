import React, {Component} from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity, Text} from 'react-native';
import axios from 'axios';  
import { createStackNavigator } from 'react-navigation';
import SignUp from './SignUp';
import Bar from './Bar'
export default class LoginForm extends Component {

  constructor(props){
    super(props);
    this.state={
      email:'nada@gmail.com',
      password:'123',
    }
  }

  saveData(userInfo){
    console.log('userinfo',userInfo)
    AsyncStorage.setItem('username',(userInfo.username));
    AsyncStorage.setItem('email',(userInfo.email));
    AsyncStorage.setItem('role',(userInfo.role));
    AsyncStorage.setItem('familyid',(userInfo.familyId));
  }
  sendLogin(){
    var that=this;
    const { navigate } = this.props.navigation;

            //axios.post('http://192.168.0.84:3000/api/login', {
             //axios.post('http://192.168.1.86:3000/api/login',{
              axios.post(global.ip+'/login',{

                user:this.state
              })
              .then(async function (response) {
                that.saveData(response.data.user);
                var role= await AsyncStorage.getItem('role');

                if(response.data.msg==="success login"){
                  if(role==='Mother'||role==='Father'){
                    navigate('Drawer')
                  }else if(role==='Child'){
                    navigate('DrawerKids')
                  }


                }
                else if(response.data.msg==="the password is not correct"){
                  alert("the password is not correct")
                }
                else if(response.data.msg==="no account"){
                  alert('You Have No Account')
                  navigate('SignUp')

                }
              })
              .catch(function (error) {
                console.log(error);
              });
             };

             render(){
              <Bar navigation={this.props.navigation}/>

              return (
                <View style={styles.container}>

                <TextInput
                placeholder= "username or email"
                placeholdertextColor="rgba(255,255,255,0.7)"
                returnKeyType="next"
                onSubmitEditing={() => this.passwordInput.focus()}
                keyboardType="email-address"
                autoCapitalize = 'none'
                underlineColorAndroid="transparent"
                value={this.state.email}
                autoCorrect={false}
                onChangeText={(email) => this.setState({email})}
                style={styles.input}
                />

                <TextInput
                placeholder= "password"
                placeholdertextColor="rgba(255,255,255,0.7)"
                returnKeyType="go"
                secureTextEntry
                underlineColorAndroid="transparent"
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
                style={styles.input}
                ref={(input) => this.passwordInput = input}
                />

                <TouchableOpacity style={styles.buttonContainer}
                onPress={
                  this.sendLogin.bind(this)
                }
                >
                <Text style={styles.buttonText}> LOGIN </Text>
                </TouchableOpacity>

                <Text style={styles.textStyle}

                onPress={() =>  this.props.navigation('SignUp')}>

                Sign Up

                </Text>

                </View>

                );
             }
         }

         const styles = StyleSheet.create({
          container: {
            padding : 20,
            marginBottom: 20

          },

          input:{
            height: 40,
            backgroundColor : 'rgba(255,255,255,0.2)',
            marginBottom: 20,
            color: '#FFF',
            paddingHorizontal: 10
          },

          buttonContainer:{
            backgroundColor: '#0be881',
            paddingVertical: 15
          },
          buttonText: {
            textAlign: 'center',
            color: "#FFFFFF",
            fontWeight: '700',
            fontSize: 18,

          },
          textStyle:{
            textAlign: 'center',
            color: "#FFFFFF",
            fontWeight: '700',
            fontSize: 20,
            paddingTop: 60
          },
         });