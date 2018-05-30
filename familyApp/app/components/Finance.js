//import react from react
import React from 'react';
//import element from reacr-native
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Picker, AsyncStorage, Dimensions} from 'react-native';
//import table from react native table component
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
//import axios to make router works
import axios from 'axios';
//import Dialog from react native dialog
import Dialog from "react-native-dialog";
//import Bar from Bar component
import Bar from './Bar';
const window = Dimensions.get('window');

const ShowOrHide={
  true:'btnView',
  false:'hiddenContainer'
}
const roleUser={
  'Father':true,
  'Mother':true,
  'Child':false
}
//export Home from the react componant
export default class Finance extends React.Component{
  //the constructor
  constructor(){
    //super for ES6
    super();
    this.state={
      tableHead:  ['Category', 'Cost'],
      tableName: [],
      tableCost:  [],
      tableTotal:['Total',0],
      addDialogVisible:false,
      editDialogVisible:false,
      deleteDialogVisible:false,
      addEditName:'',
      addEditCost:'',
      editName:'',
      deletetName:'',
      id:'',
      role:'Child',
      show:true,
    };
  }
  //auto call function when render this scren
  componentWillMount(){
    this.showId() 
  }
  showId=async()=>{
    try{
      let id=await AsyncStorage.getItem('familyId')
      this.setState({id:id})
      //alert('the email save is: ' + userEmail3)
      this.getFinanceData()
    }
    catch(error){
      alert(error)
    }
  } 
  getFinanceData(){
    var that=this
    //alert('FRONT END GET');
    console.log('FRONT END GET')
    axios.post(global.ip+'/getFinanceData', {state:this.state})
    .then(function (res) {
      that.setState({tableName:res.data.category})
      that.setState({tableCost:res.data.cost})
      that.calculateTotalMoney();
      //console.log('sucess get the data from data base')
      //alert(JSON.stringify(that.state.tableName))
    })
    .catch(function (err) {
      console.log(err);
      alert(err)
    });
  }
  editFinanceData(){
    console.log('FRONT END EDIT')
    axios.post(global.ip+'/editFinanceData', {state:this.state})
    .then(function (res) {
      //alert(res.request._response)
    })
    .catch(function (err) {
      console.log(err);
      alert("Failed to add or edit or delete")
    });
  }
  calculateTotalMoney(){
    var total=0;
    for (var i = 0; i < this.state.tableCost.length; i++) {
      total+=this.state.tableCost[i][0];
    }
    this.setState({tableTotal : ['Total',total]});
  }
  handleCancelAdd(){
    this.state.addEditName='';
    this.state.addEditCost='';
    this.setState({ addDialogVisible: false });
  };
  handleAdd(){
    if (this.state.tableName.length>7) {
      alert('There is so much exist ... please delete first to can add');
    }else{
      //need to work on it
      if(this.state.addEditName.length===0){
        alert('Please insert the name');
      } else if(this.state.addEditCost.length===0){
        alert('Please insert the cost');
      } else {
        this.state.tableName.push([this.state.addEditName]);
        this.state.tableCost.push([JSON.parse(this.state.addEditCost)]);
        this.calculateTotalMoney();
        this.state.addEditName='';
        this.state.addEditCost='';
        this.editFinanceData()
        this.setState({ addDialogVisible: false });
      }
    }
  };
  addToFinance(){
    //alert('Add To Finance');
    this.setState({ addDialogVisible: true });
  };
  onAddEditName(name){
    if(name.length>0){
      name=name[0].toUpperCase()+name.slice(1,name.length);
    }
    this.setState({addEditName: name});
  }
  onAddEditCost(value) {
     //all this function to be sure the input is a valid number
    let newNumber = '';
    let numbers = '0123456789';
    for (var i = 0; i < value.length; i++) {
      if (numbers.indexOf(value[i]) > -1) {
        newNumber = newNumber + value[i]; 
      }
    }
    this.setState({addEditCost: newNumber});
  }
  handleCancelEdit(){
    this.state.addEditName='';
    this.state.addEditCost='';
    this.setState({ editDialogVisible: false });
  };
  handleEdit(){
    var index=0;
    if(this.state.addEditName.length===0){
      alert('Please insert the name');
    } else if(this.state.addEditCost.length===0){
      alert('Please insert the cost');
    } else {
      for (var i = 0; i < this.state.tableName.length; i++) {
        if (this.state.tableName[i][0]===this.state.editName){
          index=i;
        }
      }
      this.state.tableName[index].splice(0,1,this.state.addEditName);
      this.state.tableCost[index].splice(0,1,JSON.parse(this.state.addEditCost));
      this.calculateTotalMoney();
      this.state.editName='';
      this.state.addEditCost='';
      this.state.addEditName='';
      index=0;
      this.editFinanceData()
      this.setState({ editDialogVisible: false });
    }
  };
  editFromFinance(){
    this.setState({ editDialogVisible: true });
  };
  handleCancelDelete(){
    this.setState({ deleteDialogVisible: false });
  };
  handleDelete(){
    if (this.state.tableName.length===0) {
      alert('There is nothing to delete');
    }else{
      var index=0;
      for (var i = 0; i < this.state.tableName.length; i++) {
        if (this.state.tableName[i][0]===this.state.deleteName){
          index=i;
        } 
      }
      this.state.tableName.splice(index,1);
      this.state.tableCost.splice(index,1);
      this.calculateTotalMoney();
      this.state.deleteName='';
      index=0;
      this.editFinanceData()
      this.setState({ deleteDialogVisible: false });
    }
  };
  deleteFromFinance(){
    this.setState({ deleteDialogVisible: true });
  };
  render() {
    //what return
    return (
      <View style={styles.allPage}>
      <Bar navigation={this.props.navigation}/>
        <View style={styles.tableView}>
          <Table style={styles.table}>
            <Row data={this.state.tableHead} style={styles.head} textStyle={styles.textHead} flexArr={[2, 1.3]}/>
            <TableWrapper style={styles.wrapper} >
              <Rows data={this.state.tableName} style={styles.name} textStyle={styles.textName} flexArr={[2]}/>
              <Rows data={this.state.tableCost} style={styles.cost} textStyle={styles.textCost} flexArr={[1.3]}/>
            </TableWrapper>
            <Row data={this.state.tableTotal} style={styles.total} textStyle={styles.textTotal} flexArr={[2,1.3]}/>
          </Table>
        </View>

        <View style={styles[ShowOrHide[roleUser[this.state.role]]]}>
          <TouchableOpacity style={styles.btnAdd} onPress={this.addToFinance.bind(this)}>
            <Text style={styles.textBtnAdd}>Add</Text>
          </TouchableOpacity>
          <Dialog.Container visible={this.state.addDialogVisible}>
            <Dialog.Title style={styles.textDialogTitleAdd}>Add To Finance</Dialog.Title>
            <Dialog.Description style={styles.textDialogDes}>
              Insert the name and cost to add it
            </Dialog.Description>
            <View style={styles.textInputDialogView}>
              <TextInput placeholder='Category' style={styles.textInput} maxLength={15}
              onChangeText={(name)=> this.onAddEditName(name)} value={this.state.addEditName}></TextInput>
              <TextInput placeholder='Cost' style={styles.textInput} maxLength={6} keyboardType='numeric' 
              onChangeText={(value)=> this.onAddEditCost(value)} value={this.state.addEditCost} ></TextInput>
            </View>
            <View style={styles.btnDialogView}>
              <Dialog.Button style={styles.btnDialogCancel} label="Cancel" onPress={this.handleCancelAdd.bind(this)}/>
              <Dialog.Button style={styles.btnDialogAdd} label="Add" onPress={this.handleAdd.bind(this)}  />
            </View>
          </Dialog.Container>

          <TouchableOpacity style={styles.btnEdit} onPress={this.editFromFinance.bind(this)}>
            <Text style={styles.textBtnEdit}>Edit</Text>
          </TouchableOpacity>
           <Dialog.Container visible={this.state.editDialogVisible}>
            <Dialog.Title style={styles.textDialogTitleEdit}>Edit From Finance</Dialog.Title>
            <Dialog.Description style={styles.textDialogDes}>
              Choose the name then insert the name and cost to edit it
            </Dialog.Description>
            <View style={styles.textInputDialogView}>
              <Picker
                selectedValue={this.state.editName}
                onValueChange={(value,index) => this.setState({ editName:value })}
                style={{ width: 160 }}
                mode="dropdown" //mode="dialog"
                >
                {this.state.tableName.map((name,index)=>{
                  return (<Picker.Item label={name[0]} value={name[0]} key={index}/>) 
                })}
              </Picker>
              <TextInput placeholder='Category' style={styles.textInput} maxLength={15}
              onChangeText={(name)=> this.onAddEditName(name)} value={this.state.addEditName}></TextInput>
              <TextInput placeholder='Cost' style={styles.textInput} maxLength={6} keyboardType='numeric' 
              onChangeText={(value)=> this.onAddEditCost(value)} value={this.state.addEditCost} ></TextInput>
            </View>
            <View style={styles.btnDialogView}>
              <Dialog.Button style={styles.btnDialogCancel} label="Cancel" onPress={this.handleCancelEdit.bind(this)}/>
              <Dialog.Button style={styles.btnDialogEdit} label="Edit" onPress={this.handleEdit.bind(this)}  />
            </View>
          </Dialog.Container>

          <TouchableOpacity style={styles.btnDelete} onPress={this.deleteFromFinance.bind(this)}>
            <Text style={styles.textBtnDelete}>Delete</Text>
          </TouchableOpacity>
            <Dialog.Container visible={this.state.deleteDialogVisible}>
              <Dialog.Title style={styles.textDialogTitleDelete}>Delete From Finance</Dialog.Title>
              <Dialog.Description style={styles.textDialogDes}>
                Choose the name to delete it
              </Dialog.Description>
              <View style={styles.textInputDialogView}>
                <Picker
                  selectedValue={this.state.deleteName}
                  onValueChange={(value,index) => this.setState({ deleteName:value })}
                  style={{ width: 160 }}
                  mode="dropdown" //mode="dialog"
                  >
                  {this.state.tableName.map((name,index)=>{
                    return (<Picker.Item label={name[0]} value={name[0]} key={index}/>) 
                  })}
                </Picker>
              </View>
              <View style={styles.btnDialogView}>
                <Dialog.Button style={styles.btnDialogCancel} label="Cancel" onPress={this.handleCancelDelete.bind(this)}/>
                <Dialog.Button style={styles.btnDialogDelete} label="Delete" onPress={this.handleDelete.bind(this)}  />
              </View>
            </Dialog.Container>
        </View>
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
  btnDelete:{
    backgroundColor: 'red',
    marginTop:10,
    padding:10,
    marginLeft:10,
  },
  textBtnDelete:{
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30,
    color:'black',
  },
  btnDialogView: {
    flexDirection:'row',
    justifyContent:'center',
    alignItems: 'center',
  },
  btnDialogCancel: {
    fontSize: 20,
    color:'black',
    fontWeight: 'bold',

  },
  btnDialogAdd: {
    fontSize: 20,
    color:'#3cff00',//green
    fontWeight: 'bold',
  },
  btnDialogEdit: {
    fontSize: 20,
    color:'#6239BD',//purple
    fontWeight: 'bold',
  },
  btnDialogDelete: {
    fontSize: 20,
    color:'red',//purple
    fontWeight: 'bold',
  },
  textDialogTitleAdd:{
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30,
    color:'#3cff00',//green
  },
   textDialogTitleEdit:{
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30,
    color:'#6239BD',//purple
  },
   textDialogTitleDelete:{
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30,
    color:'red',
  },
  textDialogDes:{
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
    color:'black',
  },
  textInputDialogView: {
    flexDirection:'column',
    justifyContent:'center',
    alignItems: 'center',
  },
  textInput: {
    alignSelf: 'stretch',
    padding: 16,
  },
  hiddenContainer: {
    top: window.height,
    bottom: -window.height,
    // right: window.width,
    // left: window.width,
    // marginTop:20,
  }
});