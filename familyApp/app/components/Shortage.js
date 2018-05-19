import React from 'react';
import { View, Text, TouchableOpacity,StyleSheet,TextInput,Image} from 'react-native';
import {Select, Option} from "react-native-chooser";
import Bar from './Bar'
export default class Shortage extends React.Component {
// constructor(props){
//         super(props);

//         this.state={
//         	room:
//            [ Kitchen:'',
//               Bedroom: '',
//               Bathroom:'',
//               Livingroom: '',
//               Backyard: ''
//        ]
//         }
//     }

  //   onSelect(value, label) {
  //   this.setState({room : value});
  // }

	render() {
		return (
			<View  style={styles.Bar}>
			<Bar navigation={this.props.navigation}/>

			
       <Image
          style={{width: 100, height: 100}}
          source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrHSQlAr78TL-25Yg-VtTOfWakwkf-T1HbluIP5vdhFD0UGGnk8w' }}
        />
			 <View style={styles.rolepicker}>
        <Select
            // onSelect = {this.onSelect.bind(this)}
            // defaultText  = {this.state.room}
            textStyle = {{}}
            
          >
          <Option value = 'Kitchen'>Kitchen</Option>
          <Option value = 'Bedroom'>Bedroom</Option>
          <Option value = 'Bathroom'>Bathroom</Option>
          <Option value = 'Livingroom'>Livingroom</Option>
           <Option value = 'Backyard'>Backyard</Option>
            

        </Select>
        <TextInput
    	style={styles.textInput} 
    	placeholder='what do you need '
      
    /> 
     
      </View>
      </View>
			);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#2896d3',
		paddingLeft: 40,
		paddingRight: 40,
	},
	textInput: {
		alignSelf: 'stretch',
		padding: 16,
		marginBottom: 20,
		backgroundColor: '#fff',
	    textAlign: 'center',
		 height: 100,
		 borderWidth: 2,
		 borderColor: '#000000',
		 borderRadius: 5 ,
		 backgroundColor : "#FFFFFF",
		 marginTop:30,
 		marginLeft:20,
 		marginRight:20,
},

	textStyle: {
		alignSelf: 'center',
		fontSize: 16,
		fontWeight: 'bold',
	},

	btn: {
		alignSelf: 'stretch',
		backgroundColor: '#01c853',
		alignItems: 'center',
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#007aff',
		justifyContent: 'center',
		height: 60,
		marginLeft: 5,
		marginRight: 5,
		marginTop: 15,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 20 },
		shadowOpacity: 0.2,
		elevation: 2,
		position: 'relative'
	},

	viewStyle: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 60,
		paddingTop: 15,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 20 },
		shadowOpacity: 0.2,
		elevation: 2,
		position: 'relative'
	},
	header: {
	fontSize: 24,
	marginBottom: 60,
	color: '#fff',
	fontWeight: 'bold',
},
rolepicker: {
    alignSelf: 'stretch',
    alignItems: 'center',
    
    backgroundColor: '#fff',
    marginTop:300,
   
},
Bar:{
marginTop : 50,
},

});
