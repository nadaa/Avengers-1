import React from 'react';
import {StyleSheet, Text, View, AsyncStorage } from 'react-native';
import {Header} from 'react-native-elements';
import axios from 'axios';
import TaskMonitor from './TaskMonitor';
import UserInfo from './UserInfo';


import Icon0 from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon5 from 'react-native-vector-icons/MaterialIcons';
import Icon6 from 'react-native-vector-icons/Octicons';
import Icon7 from 'react-native-vector-icons/Foundation';
import Icon8 from 'react-native-vector-icons/SimpleLineIcons' ; 

const userRole={
  'Mother':'female',
  'Father':'male',
  'Child':'child',
}

export default class Bar extends React.Component{
  constructor(){
    super();
    this.state={
      role:'Mother',
      // userProgress:'100',
      //userRanking:'2',
      // restMoney:'1500',
    };
    this.callOrder(this.setUserRole.bind(this))
  }
  callOrder(cb){
    cb()
  }
  setUserRole=async()=>{
    try{
      let role=await AsyncStorage.getItem('role')
      this.setState({role:role})
    }
    catch(error){
      alert(error)
    }
  }
  render(){
    return(
      <View style={styles.allPage}>
        <View style={styles.barView}>
          <Header
            backgroundColor='#1d9600'
            innerContainerStyles={styles.innerContainer}
            outerContainerStyles={styles.outerContainer}

            leftComponent={
              <View  style={styles.leftComponent}>
                <Icon0 onPress={()=>this.props.navigation.openDrawer()} style={{color:'white'}} name="bars" size={35}/>
                <Text onPress={()=>this.props.navigation.openDrawer()} style={styles.textUnderIcon}>Menu</Text>
              </View>
            }

            centerComponent={
              <View style={styles.centerComponentView}>
                <View  style={styles.centerComponent}>
                  <Icon0 onPress={() =>this.state.role==='Father'||this.state.role==='Mother'?this.props.navigation.navigate('User Information'):null} name={userRole[this.state.role]} size={35} color="white"/>
                  <Text onPress={() =>this.state.role==='Father'||this.state.role==='Mother'?this.props.navigation.navigate('User Information'):null} style={styles.textUnderIcon}>
                    {this.state.role}
                  </Text>
                </View>

               {/* 
               <View style={styles.centerComponent}>
                  <Text style={styles.textIconDone}>{this.props.p}%</Text>
                  <Text style={styles.textUnderIcon}>
                    Progress
                  </Text>
                </View>
                <View style={styles.centerComponent}>
                  <Text onPress={() =>this.props.navigation.navigate('Finance')} style={styles.textIconMoney}>{this.state.restMoney}</Text>
                  <Text onPress={() =>this.props.navigation.navigate('Finance')} style={styles.textUnderIcon}>
                    Money
                  </Text>
                </View>
                */}
                <View style={styles.lastCenterComponent}>
                  <Icon6 onPress={() => this.state.role==='Father'||this.state.role==='Mother'?this.props.navigation.navigate('Task Monitor'):this.props.navigation.navigate('TasksDisplay')}  style={{color:'white'}} 
                  name="checklist" size={35}/>
                <Text onPress={() =>this.state.role==='Father'||this.state.role==='Mother'?this.props.navigation.navigate('Task Monitor'):this.props.navigation.navigate('TasksDisplay')} style={styles.textUnderIcon}>Tasks</Text>
                </View>
              </View>
            }

            rightComponent={
              <View style={styles.rightComponent}>
                <Icon8 onPress={() => this.props.navigation.navigate('Login')} style={{color:'white'}} 
                  name="logout" size={35}/>
                <Text onPress={() =>this.props.navigation.navigate('Login')} style={styles.textUnderIcon}>logout</Text>
              </View>
            }
          >
          </Header>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  allPage: {
    //flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    marginTop:35,
  },
  barView: {
    flexDirection: 'column',
    //When finish delet this
    marginTop:25,
  },
  innerContainer: {
    //backgroundColor:'green',
    flexDirection: 'row',
    alignItems: 'center',
    margin:-12,
  },
  leftComponent: {
    flex:1,
    flexDirection:'column',
    justifyContent:'center',
    marginLeft:5,
    alignItems: 'center',
  },
  rightComponent: {
    flex:1,
    flexDirection:'column',
    justifyContent:'center',
    marginRight:5,
    alignItems: 'center',

  },
  centerComponentView: {
    flexDirection: 'row',
    //backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstCenterComponent: {
    marginRight:15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerComponent: {
    marginRight:20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lastCenterComponent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textUnderIcon: {
    fontSize: 15,
    textAlign:'center',
    fontWeight: 'bold',
    color:'white',
  },
  textIconDone: {
    fontSize: 23,
    textAlign:'center',
    fontWeight: 'bold',
    color:'#3cff00',
  },
  textIconRank: {
    fontSize: 23,
    textAlign:'center',
    fontWeight: 'bold',
    color:'red',
  },
  textIconMoney: {
    fontSize: 23,
    textAlign:'center',
    fontWeight: 'bold',
    color:'#3cff00',
  },
  otherView: {
    flex:1,
    flexDirection: 'column',
    backgroundColor: 'white',
    //comment this after finish
    marginBottom:35,
  },
});
