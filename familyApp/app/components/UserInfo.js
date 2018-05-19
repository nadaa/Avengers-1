import React from 'react';
import {
 StyleSheet,
 Text, 
 View ,
 TextInput,
 KeyboardAvoidingView,
 TouchableOpacity,
 Button,
 AsyncStorage,
 Picker,
} from 'react-native';

import {createStackNavigator } from 'react-navigation';
import Login from './Login';
import axios from 'axios';    
import Bar from './Bar';


export default class UserInfo extends React.Component {

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



	componentDidMount(){
		this._loadInitialState().done();
	}



    //store user info in the device
	_loadInitialState = async () => {
		var value = await AsyncStorage.getItem('user');
		if(value !== null){
			this.props.navigation.navigate('Profile')
		}
	}



// validateEmail (text) {
//     var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
//     if(reg.test(text) === false)
//     {return false;
//       }
//     else {
//       return true;
//     }
// }


sendInfo(){
//const { navigate } = this.props.navigation;
//this ip 192.168.1.86 for waed pc pleas comment it if you want to change it 
axios.post('http://192.168.1.86:3000/api/userinfo', {
    user:this.state
   })
   .then(function (response) {
    
     if(response.data.msg==="success"){
          alert('success')
     }
     else if(response.data.msg==='error'){
           alert('error')
      }
     }

   )
   .catch(function (error) {
     console.log(error);
   });
  }


	
  render() {
  	const { navigate } = this.props.navigation;
    return (
    <KeyboardAvoidingView behaviour='padding' style ={styles.wrapper}>
    <Bar navigation={this.props.navigation}/>

    <View style={styles.container}>
    <Text style={styles.header}>{/* jozaa change this  SIGNUP*/} User Information </Text>

    <TextInput
    ref={input =>{this.textInput =input}}
     value={this.state.jobtitle}
    	style={styles.textInput}  
    	placeholder='jobtitle'
    	onChangeText={(text) => this.setState({jobtitle: text})}
    /> 
     <TextInput
        value={this.state.workaddress}
    	style={styles.textInput} 
    	placeholder='workaddress'
    	onChangeText={(text) => this.setState({workaddress: text})}
    /> 
     <TextInput
    	style={styles.textInput} 
    	placeholder='worknumber'
        value={this.state.worknumber}
        onChangeText={(text) => this.setState({worknumber: text})}
    /> 
   
      <TextInput
    	style={styles.textInput} 
    	placeholder='worktime'
        value={this.state.worktime}
        onChangeText={(text) => this.setState({worktime: text})}
    /> 
     <TextInput
    	style={styles.textInput} 
    	placeholder='salary'
        value={this.state.salary}
        onChangeText={(text) => this.setState({salary: text})}
    /> 
     <TextInput
    	style={styles.textInput} 
    	placeholder='familyId'
        value={this.state.familyId}
        onChangeText={(text) => this.setState({familyId: text})}
    /> 
     <TextInput
    	style={styles.textInput} 
    	placeholder='marriageDate'
        value={this.state.marriageDate}
        onChangeText={(text) => this.setState({marriageDate: text})}
    /> 



   

    <TouchableOpacity
    	style={styles.btn}
      //this is fixed now by waed 
    	onPress={
    		this.sendInfo.bind(this)
        }
        
    	>
    	<Text>Fill in</Text>
    	</TouchableOpacity>
        
    </View>
    </KeyboardAvoidingView>
    );
  }


 
}

const styles = StyleSheet.create({
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
    


    

    // height:100,
},

btn: {
	alignSelf:'stretch',
	backgroundColor:'#01c853',
	padding:20,
	alignItems:'center',
}

})

