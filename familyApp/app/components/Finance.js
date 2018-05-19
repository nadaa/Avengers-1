//import react from react
import React from 'react';
//import element from reacr-native
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
//import table from react native table component
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
//import axios to make router works
import axios from 'axios';
//import Dialog from react native dialog
import Dialog from "react-native-dialog";
//import Bar from Bar component
import Bar from './Bar';

//export Home from the react componant
export default class Finance extends React.Component{
  //the constructor
  constructor(){
    //super for ES6
    super();
    //all the data save before to can show in the bar
    this.state={
      tableHead:  ['Name', 'Cost'],
      tableName: ['Water', 'Electricity', 'Shortage', 'Family Event'],
      tableCost:  [[12],     [30],            [40],         [50]    ],
      tableTotal:['Total',0],
      //for show Dialog Add
      AddDialogVisible: false,
    };
    //auto call function when render this scren
    this.calculateTotalMoney();
  }
  calculateTotalMoney(){
    var total=0;
    for (var i = 0; i < this.state.tableCost.length; i++) {
      total+=this.state.tableCost[i][0];
    }
    //cant use set state so we use this .state
    this.state.tableTotal[1]=total;
    // this.setState({tableTotal : ['Total',total]});
  }

  addToFinance(){
    //alert('Add To Finance');
    this.setState({ AddDialogVisible: true });
  };
  handleCancelAdd(){
    this.setState({ dialogVisible: false });
  };
  handleAdd(){
    this.setState({ dialogVisible: false });
  };





  editFromFinance(){
    alert('Edit From Finance');
  };
  removeFromFinance(){
    alert('Remove From Finance');
  };

  render() {
    //what return
    return (
      <View style={styles.allPage}>
      <Bar navigation={this.props.navigation}/>
        <View style={styles.tableView}>
          <Table style={styles.table}>
            <Row data={this.state.tableHead} style={styles.head} textStyle={styles.textHead}/>
            <TableWrapper style={styles.wrapper}>
              <Col data={this.state.tableName} style={styles.name} textStyle={styles.textName}/>
              <Rows data={this.state.tableCost} style={styles.cost} textStyle={styles.textCost} flexArr={[1]}/>
            </TableWrapper>
            <Row data={this.state.tableTotal} style={styles.total} textStyle={styles.textTotal}/>
          </Table>
        </View>
        <View style={styles.btnView}>
          <TouchableOpacity style={styles.btnAdd} onPress={this.addToFinance.bind(this)}>
            <Text style={styles.textBtnAdd}>Add</Text>
          </TouchableOpacity>

        <Dialog.Container visible={this.state.AddDialogVisible}>
          <Dialog.Title>Add To Finance</Dialog.Title>
          <Dialog.Description>
            Do you want to add to finance?
          </Dialog.Description>
          <Dialog.Button label="Cancel" onPress={this.handleCancelAdd.bind(this)}/>
          <Dialog.Button label="Add" onPress={this.handleAdd.bind(this)}/>
        </Dialog.Container>


          <TouchableOpacity style={styles.btnEdit} onPress={this.editFromFinance.bind(this)}>
            <Text style={styles.textBtnEdit}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnRemove} onPress={this.removeFromFinance.bind(this)}>
            <Text style={styles.textBtnRemove}>Remove</Text>
          </TouchableOpacity>
     
        </View>
     <TouchableOpacity style={styles.btnRemove} onPress={() =>this.props.navigation.navigate('Try')}>
            <Text style={styles.textBtnRemove}>Try2</Text>
          </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  allPage: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#2896d3',
    //marginBottom:35,
  },
  tableView: {
    flexDirection: 'column',
    backgroundColor: '#2896d3',
    // backgroundColor: '#0bf5fb',
  },
  table: {
    backgroundColor: '#6239BD',
    marginRight:10,
    marginLeft:10,
    marginTop:10,
    marginBottom:10,
  },
  wrapper: {
    flexDirection: 'row',
  },
  head: {
    height: 50,
    backgroundColor: '#123456',
  },
  textHead:{
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 40,
    color:'#3cff00',
  },
  name: {
     // backgroundColor: '#6239BD'
  },
  textName:{
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 25,
    color:'white',
  },
  cost: {
    // backgroundColor: '#6239BD',
  },
  textCost:{
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 25,
    color:'white',
  },
  total:{
    height: 40,
    backgroundColor: '#123456',
  },
  textTotal:{
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30,
    color:'red',
  },
  btnView: {
    backgroundColor: '#2896d3',
    flexDirection:'row',
    justifyContent:'center',
    alignItems: 'center',
  },
  btnAdd:{
    backgroundColor: '#3cff00',
    marginTop:10,
    padding:10,
  },
  textBtnAdd:{
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30,
    color:'black',
  },
  btnEdit:{
    backgroundColor: '#6239BD',
    marginTop:10,
    padding:10,
    marginLeft:10,
  },
  textBtnEdit:{
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30,
    color:'black',
  },
  btnRemove:{
    backgroundColor: 'red',
    marginTop:10,
    padding:10,
    marginLeft:10,
  },
  textBtnRemove:{
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30,
    color:'black',
  },
   container: {
    flex: 1,
    paddingBottom: 20,
  },
});


/*
  fectch1(){
    //return axios.get('http://192.168.1.82:3000')
    return fetch('http://192.168.1.82:3000')
      .then((response) => response.json())
        .then((responseJson) => {
          console.log("server done:",JSON.stringify(responseJson) )
           alert(JSON.stringify(responseJson));
        })
      .catch(function (error) {
       console.log(error);
      });
  }





// untill now I didint use it
// import HTML from react native render html to render html elemnt
import HTML from 'react-native-render-html';
// Dialog Component from react native dialog component to render pop elemnt
import { DialogComponent, SlideAnimation } from 'react-native-dialog-component';


*/
