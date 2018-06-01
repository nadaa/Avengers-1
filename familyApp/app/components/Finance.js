import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Picker, AsyncStorage, Dimensions, Image} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import axios from 'axios';
import Dialog from "react-native-dialog";
import Bar from './Bar';
import Icon0 from 'react-native-vector-icons/FontAwesome';

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
export default class Finance extends React.Component{
  static navigationOptions = {
   drawerIcon: () => (
     <Icon0 style={{color:'green'}} name="money" size={20}/>
   ),
 };
  constructor(){
    super();
    this.state={
      tableHead:['Category', 'Cost'],
      tableName:[],
      tableCost:[],
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
  componentWillMount(){
    this.showId() 
  }
  showId=async()=>{
    try{
      let id=await AsyncStorage.getItem('familyId')
      this.setState({id:id})
      let role=await AsyncStorage.getItem('role')
      this.setState({role:role})
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
    axios.post(global.ip+'/getfinancedata', {state:this.state})
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
    axios.post(global.ip+'/editfinancedata', {state:this.state})
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
    if (this.state.tableName.length>7){
      alert('There is so much exist ... please delete first to can add');
    }else{
      //need to work on it
      if(this.state.addEditName.length===0){
        alert('Please insert the name');
      }else if(this.state.addEditCost.length===0){
        alert('Please insert the cost');
      }else {
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
         <Image 
          source={{uri:'https://media.giphy.com/media/IQJdKZmrS6BLW/source.gif'}}
          style={{width: 300, height: 320,justifyContent: 'center',marginTop:120, opacity:1}}/>
       
      </View>
    );
  }
}
const styles = StyleSheet.create({
  allPage: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  tableView: {
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  table: {
    backgroundColor: '#8cd078',
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
    backgroundColor: '#8cd078',
  },
  textHead:{
    fontWeight: 'bold',
    textAlign: 'center',
    color:'#3cff00',
  },
  name: {
  },
  textName:{
    fontWeight: 'bold',
    textAlign: 'center',
    color:'white',
  },
  cost: {
  },
  textCost:{
    fontWeight: 'bold',
    textAlign: 'center',
    color:'white',
  },
  total:{
    height: 40,
    backgroundColor: '#8cd078',
  },
  textTotal:{
    fontWeight: 'bold',
    textAlign: 'center',
    //fontSize: 30,
    color:'white',
  },
  btnView: {
    backgroundColor: 'white',
    flexDirection:'row',
    justifyContent:'center',
    alignItems: 'center',
  },
  btnAdd:{
   backgroundColor: '#40b21e',
    marginTop:10,
    padding:10,
  },
  textBtnAdd:{
    fontWeight: 'bold',
    textAlign: 'center',
    //fontSize: 30,
    color:'white',
  },
  btnEdit:{
    backgroundColor: '#40b21e',
    marginTop:10,
    padding:10,
    marginLeft:10,
  },
  textBtnEdit:{
    fontWeight: 'bold',
    textAlign: 'center',
    color:'white',
  },
  btnDelete:{
    backgroundColor: '#40b21e',
    marginTop:10,
    padding:10,
    marginLeft:10,
  },
  textBtnDelete:{
    fontWeight: 'bold',
    textAlign: 'center',
    
    color:'white',
  },
  btnDialogView: {
    flexDirection:'row',
    justifyContent:'center',
    alignItems: 'center',
  },
  btnDialogCancel: {
    color:'white',
    fontWeight: 'bold',

  },
  btnDialogAdd: {
    color:'#3cff00',//green
    fontWeight: 'bold',
  },
  btnDialogEdit: {
    //fontSize: 20,
    color:'#6239BD',//purple
    fontWeight: 'bold',
  },
  btnDialogDelete: {
    color:'red',//purple
    fontWeight: 'bold',
  },
  textDialogTitleAdd:{
    fontWeight: 'bold',
    textAlign: 'center',
    color:'#3cff00',//green
  },
   textDialogTitleEdit:{
    fontWeight: 'bold',
    textAlign: 'center',
    color:'#6239BD',//purple
  },
   textDialogTitleDelete:{
    fontWeight: 'bold',
    textAlign: 'center',
    color:'red',
  },
  textDialogDes:{
    fontWeight: 'bold',
    textAlign: 'center',
    color:'white',
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
  }
});