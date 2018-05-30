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
//import DrawerKids from './DrawerKids';
// import Drawer from './Drawer';
export default class Login extends React.Component {
  constructor(props){
    super(props);
    this.state={
      email:'nada@gmail.com',
      password:'123',
    }
  }
  saveData(userInfo){
    AsyncStorage.setItem('username',(userInfo.username));
    AsyncStorage.setItem('email',(userInfo.email));
    AsyncStorage.setItem('role',(userInfo.role));
    AsyncStorage.setItem('familyid',(userInfo.familyId));
  }
 sendLogin(){
     var that=this;
    const { navigate } = this.props.navigation;

            axios.post(global.ip+'/login',{
             user:this.state
         })
         .then(async function (response) {
          alert(response.data.msg)
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

    return( 
      <ImageBackground
      source={{uri: 'https://images.pexels.com/photos/1018137/pexels-photo-1018137.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'}}
      style={styles.container}>
    <KeyboardAvoidingView behaviour='padding' style ={styles.wrapper}>
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <TextInput
    	style={styles.textInput} 
      value={this.state.email}
    	placeholder='Email'
    	onChangeText={(email) => this.setState({email})}
      /> 
     <TextInput
      style={styles.textInput} 
      value={this.state.password}
      secureTextEntry={true}
      placeholder='Password'
      onChangeText={(password) => this.setState({password})}
      /> 
    <TouchableOpacity
      style={styles.btn}
      onPress={()=> this.sendLogin()}
    	>
    	<Text>LOGIN</Text>
    	</TouchableOpacity>
    	 <Text style={{color: 'black', paddingTop:20,fontSize: 15}}
        //const { navigate } =;
        onPress={() =>  navigate('SignUp')}>
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
    justifyContent: 'center',
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
  marginBottom: 60,
  color: '#fff',
  fontWeight: 'bold',
},
textInput: {
  alignSelf: 'stretch',
  padding: 16,
  marginBottom: 20,
  backgroundColor: '#fff',
  fontSize: 20,
},
btn: {
  alignSelf:'stretch',
  backgroundColor:'#ffcde6',
  padding:20,
  alignItems:'center',
}
})

