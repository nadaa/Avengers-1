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
 ScrollView
} from 'react-native';

import {createStackNavigator } from 'react-navigation';
import axios from 'axios';    
import DatePicker from 'react-native-datepicker';
import {Select, Option} from "react-native-chooser";
import Bar from './Bar';
import ShortageNote from './ShortageNote';



export default class Shortage extends React.Component {
	constructor(props){
        super(props);

        this.state=
        {
        needArray:[],
        needText:'',
        }
        this.getData.bind(this)
    }


  render() {
   let notes=this.state.needArray.map((val,key)=>{
      return <ShortageNote key={key} keyval={key} val={val} deleteMethod ={()=>this.deleteMethod(key)} />
    })
    return (
  <View style={styles.container}>
       
      <View style={styles.header}>
          <Text style={styles.headerText}>Shortage</Text>
      </View>


            <ScrollView style={styles.scrollContainer}>
                  {notes}
            </ScrollView>


      <View style={styles.footer}>
                      <TouchableOpacity style={styles.addButton} onPress={this.addNeed.bind(this)}>
                        <Text style={styles.addButtonText}>+</Text>
                      </TouchableOpacity>
                          <TextInput 
                          onChangeText={(needText) => this.setState({needText})} value={this.state.needText}
                          style={styles.textInput} 
                          placeholder='> need' 
                          placeholderTextColor='white' >
                           </TextInput>
                  </View>

  </View>
    );
  }
  async getData(){
    //axios.get('http://192.168.0.84:3000/api/shortage')
    var familyId=await AsyncStorage.getItem('familyid');
    console.log(familyId);
    axios.post(global.ip+'/getshortage',{familyId:familyId}) 
    .then((response) =>{
      console.log(response);
      
        this.setState({needArray:response.data.needs})
        console.log('needArray',this.state.needArray)
        
    })
    .catch((error) =>{
      console.log(error);
      alert(error);
    });
  }
  componentDidMount(){
    this.getData()
}

  // axios.get(`http://10.0.2.2:3000/api/getkids/${familyId}`)
  // //axios.get(`http://192.168.1.86:3000/api/getkids/${familyId}`)
  //   .then((response) =>{
  //     this.setState({kids:response.data});
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });



   
   async addNeed(){
      const {navigate}=this.props.navigation;
     var that=this;
     var familyId = await AsyncStorage.getItem('familyid')
     
    if(this.state.needText){
      //var d=new Date()
     
     axios.post(global.ip+'/shortage', 
    // axios.post('http://10.0.2.2:3000/api/shortage',
      {
        need:this.state.needText,
        familyId:familyId,
      })
     //console.log('need')
    .then(function (response) {
      if(response.data.msg==='success'){
        alert('success')
        that.getData();
      
      }
      else if(response.data.msg==='error'){
        alert("error");
      }
    })
    .catch(function (error) {
      console.log(error);
      alert(error);
    });

      this.setState({needText:''})
    }
  }
  async deleteMethod(key){
    this.state.needArray.splice(key,1)
    this.setState({needArray:this.state.needArray})
   var familyId = await AsyncStorage.getItem('familyid');
     
    axios.post(global.ip+'/deleteshortage', 
      {
        need:this.state.needText,
        familyId:familyId,
        key:key
      })
  
    .then(function (response) {
      if(response.data.msg==='success'){
        this.getData();
      
      }
      else if(response.data.msg==='error'){
        alert("error");
      }
    })
    .catch(function (error) {
      console.log(error);
      alert(error);
    });

      this.setState({needText:''})
  }
}

const styles = StyleSheet.create({

container:{
     flex:1,
},
header:{
      backgroundColor:'#65737e',
      alignItems:'center',
      justifyContent:'center',
      borderBottomWidth:  10,
      borderBottomColor:'#ddd',

},

headerText:{
      color:'white',
      fontSize:40,
      padding:10,
      justifyContent:'center',

},

scrollContainer:{
      flex:1,
      marginBottom:100,
},

footer:{
      position:'absolute',
      alignItems:'center',
      bottom:0,
      left:0,
      right:0,
},
addButton:{
      width:90,
      height:90,
      borderRadius:70,
      borderColor:'#ccc',
      alignItems:'center',
      zIndex:10,
      elevation:8,
      marginBottom:-45,
      backgroundColor:'#65737e', 
},
addButtonText:{
      color:'#fff',
      fontSize:55,
      justifyContent:'center',
},
textInput:{
      alignSelf:'stretch',
      color:'#fff',
      padding:40,
      paddingTop:40,
      backgroundColor:'#c0c5ce',
      borderTopWidth:2,
      borderTopColor:'#c0c5ce',


}

})  

