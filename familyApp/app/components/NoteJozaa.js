//dont delete this because it is the code for ata base jozaa
must finish today
Paid For
waed and nada: when login remove the stack navigate + scrool view
must end:22/5

hussen: tasks 
must end:22/5

// all screen work bar 
import Bar from './Bar'
<Bar navigation={this.props.navigation}/>

// all screen work async storage and take what they want from the user
import {  AsyncStorage} from 'react-native';
showData=async()=>{
    try{
      let userEmail3=await AsyncStorage.getItem('userEmail')
      alert('the email save is: ' + userEmail3)
    }
    catch(error){
      alert(error)
    }
  }

//IP Adress Jozaa: 
192.168.1.82:3000
192.168.0.89:3000

Drawer     //When finish delet this
Bar     //When finish delet this

//second the progress
1- function run automaticlly when user login in
2- get the all tasks of user from data base (by the email)
3- calculate how many task state cchecl over all tasks
4- return this number  in percenteg

//third ranked
1- function run automaticlly when user login in
2- get the progress for all family child (by email + fimilly id + child)
3- compare each progress b other
4- if the same give the compare for how many task have
5- if the same give who eamil lenght smallest

//finance
1- function run automaticlly when user login in
2- get the how money this family have (by email + fimilly id + money)
3- subtract the input from output
need to save the table in data base and the cost to can render it
