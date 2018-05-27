import React from 'react';
import {
 StyleSheet,
 Text, 
 View ,
 TextInput,
 KeyboardAvoidingView,
 TouchableOpacity,
 AsyncStorage,
 ScrollView,
 ImageBackground,
} from 'react-native';
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
   console.log('userinfo',userInfo)
    AsyncStorage.setItem('username',(userInfo.username));
    AsyncStorage.setItem('email',(userInfo.email));
    AsyncStorage.setItem('role',(userInfo.role));
    AsyncStorage.setItem('familyid',(userInfo.familyId));
    

  }

      
	
  sendLogin(){
     var that=this;
     //console.log('hi',role)
          const { navigate } = this.props.navigation;

            axios.post('http://192.168.0.84:3000/api/login', {
             //axios.post('http://10.0.2.2:3000/api/login',{

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
    


  render() {
    //jozaa
    const { navigate } = this.props.navigation;
    return (

      <ImageBackground
       source={{uri: 'data:image/jpeg;base64,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'}}
        style={styles.container}>

    <KeyboardAvoidingView behaviour='padding' style ={styles.wrapper}>
    <ScrollView contentContainerStyle={styles.contentContainer}>
   
    <TextInput
    	style={styles.textInput} 
    	placeholder='Email'
    	onChangeText={(email) => this.setState({email})}

    /> 
     <TextInput
      style={styles.textInput} 
      secureTextEntry={true}
      placeholder='Password'
      onChangeText={(password) => this.setState({password})}
      
    /> 
    <TouchableOpacity
      style={styles.btn}
      onPress={
         this.sendLogin.bind(this)
        //  navigate('Profile')
        }
    	>
    	<Text>LOGIN</Text>
    	</TouchableOpacity>
    	 <Text style={{color: 'white', paddingTop:20}}
        onPress={() =>  navigate('SignUp')}>
          create account for free -SignUp-
             </Text>
    </ScrollView>
    </KeyboardAvoidingView>

        </ImageBackground>

    );
  }
  
}

const styles = StyleSheet.create({
 contentContainer: {
    paddingVertical: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
    
  },
wrapper: {
  flex: 1,
},
container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  marginBottom: 60,
  color: '#fff',
  fontWeight: 'bold',
},
textInput: {
  alignSelf: 'stretch',
  padding: 16,
  marginBottom: 20,
  backgroundColor: '#fff',
},
btn: {
  alignSelf:'stretch',
  backgroundColor:'#01c853',
  padding:20,
  alignItems:'center',
}


})

