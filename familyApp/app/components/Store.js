
import AsyncStorage	 from 'react-native';

  

export const showData=async()=>{
    try{
      let userInfo=await AsyncStorage.getItem('userinfo')
      //alert('the email save is: ' + userInfo)
      return userInfo;
    }
    catch(error){
      alert(error)
    }
  }



