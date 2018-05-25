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
import ShortageNote from './ShortageNote'
export default class Shortage extends React.Component {
	constructor(props){
        super(props);

        this.state=
        {
        needArray:[],
        needText:'',
        }
    }


  render() {
   let notes=this.state.needArray.map((val,key)=>{
      return <ShortageNote key={key} keyval={key} val={val} deleteMethod ={()=>this.deleteNote(key)} />
    })
    return (
  <View style={styles.container}>
        <Bar navigation={this.props.navigation}/>

      <View style={styles.header}>
          <Text style={styles.headerText}>Shortage</Text>
      </View>


            <View style={styles.scrollContainer}>
                  {notes}
            </View>


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
  addNeed(){
    if(this.state.needText){
      var d=new Date()
      this.state.needArray.push({'date':d.getFullYear()+'/'+(d.getMonth()+1)+'/'+d.getDate(),'note':this.state.needText});
      this.setState({needArray:this.state.needArray})
      this.setState({needText:''})
    }
  }
  deleteNote(key){
    this.state.needArray.splice(key,1)
    this.setState({needArray:this.state.needArray})
  }


 
}

const styles = StyleSheet.create({

container:{
     flex:1,
},
header:{
      backgroundColor:'#E91E63',
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
      backgroundColor:'#E91E63', 
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
  backgroundColor:'#252525',
  borderTopWidth:2,
  borderTopColor:'#ededed',


}

})  

