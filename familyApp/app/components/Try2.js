import React from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import Dialog from "react-native-dialog";
 
export default class DialogTester extends React.Component {
   constructor(){
    //super for ES6
    super();
  this.state = {
    dialogVisible: false
  };
 }
  showDialog() {
    this.setState({ dialogVisible: true });
  };
 
  handleCancel  () {
    this.setState({ dialogVisible: false });
  };
 
  handleDelete  () {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    this.setState({ dialogVisible: false });
  };
 //error in dialog ..
  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.showDialog.bind(this)}>
          <Text>Show Dialog</Text>
        </TouchableOpacity>
        <Dialog visible={true}>
          <Dialog.Title>Account delete</Dialog.Title>
          <Dialog.Description>
            Do you want to delete this account? You cannot undo this action.
          </Dialog.Description>
          <Dialog.Button label="Cancel" onPress={this.handleCancel.bind(this)} />
          <Dialog.Button label="Delete" onPress={this.handleDelete.bind(this)} />
        </Dialog>
      </View>
    );
  }
}