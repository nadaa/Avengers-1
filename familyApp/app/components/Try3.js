import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
 import Drawer from 'react-native-drawer'

export default class Application extends React.Component {  
  closeControlPanel(){
    this._drawer.close()
  };
  openControlPanel(){
    this._drawer.open()
  };
  render () {
    return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        content={ 
          <View>
            <Text >Menu</Text>
            <Text >Menu2</Text>
            <TouchableOpacity
              onPress={this.closeControlPanel.bind(this)} >
              <Text >closeControlPanel</Text> 
            </TouchableOpacity>
          </View>
        }
        type="displace"
        //overlay / displace / static
        tapToClose={true}
        openDrawerOffset={0.5}
        >
        <TouchableOpacity
              onPress={this.openControlPanel.bind(this)} >
              <Text >openControlPanel</Text> 
        </TouchableOpacity>
        <TouchableOpacity
              onPress={this.closeControlPanel.bind(this)} >
              <Text >closeControlPanel</Text> 
        </TouchableOpacity>
          
      </Drawer>
    )
  }
}


               