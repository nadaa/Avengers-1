import React from 'react';
import { Text, Dimensions, TouchableOpacity, View, AsyncStorage,StyleSheet } from "react-native";
import Dialog from "react-native-dialog";
import Bar from './Bar'
const window = Dimensions.get('window');

const ShowOrHide={
  true:'allPage',
  false:'hiddenContainer'
}
const roleUser={
  'Father':true,
  'Mother':true,
  'Child':false
}

export default class Try extends React.Component {
  constructor(){
    //super for ES6
    super();
    this.state = {
      role:'Child',
    };
  }

  render() {
    return (
<View >
  <View >
    <Bar navigation={this.props.navigation}/>
  </View>

  <View style={styles.allPage}>
    <Text style={styles.textDialogTitleAdd}>Show for all</Text>
  </View>

  <View style={styles.allPage}>
    <Text style={styles.textDialogTitleAdd}>the User is: {this.state.role}</Text>
  </View>
    
  <View style={styles[ShowOrHide[roleUser[this.state.role]]]}>
    <Text style={styles.textDialogTitleAdd}>Only show if you are Father Or Mother</Text>
  </View>

  <View style={styles[ShowOrHide[!roleUser[this.state.role]]]}>
    <Text style={styles.textDialogTitleAdd}>Only show if you are Child</Text>
  </View>

  

</View>
    );
  }
}
const styles = StyleSheet.create({
  allPage: {
    // flex: 1,
    flexDirection: 'column',
    backgroundColor: 'red',
    //marginBottom:35,
    marginTop:10,
  },
  textDialogTitleAdd:{
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30,
    color:'blue',//green
  },
  hiddenContainer: {
    top: window.height,
    bottom: -window.height,
    right: window.width,
    left: window.width,
    marginTop:20,
  }
});