import React from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { createDrawerNavigator, StackNavigator, DrawerItems, SafeAreaView} from 'react-navigation'
import Finance from './Finance';
import UserInfo from './UserInfo';
import Bar from './Bar';
import Shortage from './Shortage';
import TaskMonitor from './TaskMonitor';
import TasksDisplay from './TasksDisplay';
import Login from './Login';
import SignUp from './SignUp';
import { Container, Content, Icon, Header, Body, Left, Button  } from 'native-base'
import Icon0 from 'react-native-vector-icons/FontAwesome';


const CustomDrawerContentComponent = (props) => (
 <Container>
   <Header style={styles.drawerHeader}>
     <Body>
       <Image
         style={styles.drawerImage}
         source={{uri:'http://akeeler6.com/wp-content/uploads/2016/02/3d-happy-family-1.jpg'}}
         />
     </Body>
   </Header>
   <Content>
     <DrawerItems {...props} />
   </Content>

 </Container>

);

const MyDrawer=createDrawerNavigator(
 {
   'Task Monitor':{
     screen:TaskMonitor,
     drawerLabel:"Home2",
     title: "Home",
     drawerIcon: ({ tintColor }) => (
       <Image
         source={{uri:'https://cdn3.vectorstock.com/i/1000x1000/89/37/happy-family-icon-multicolored-in-simple-figures-vector-19728937.jpg'}}
         style={styles.icon}
       />
     ),
   },
   Finance:{
     screen:Finance,
   },
   Shortage:{
     screen:Shortage,
   },
   'User Information':{
     screen:UserInfo,
   },
 },
 {
   initialRouteName:'Task Monitor',
   drawerPosition:'left',
   drawerWidth:200,
   drawerOpenRoute:'DrawerOpen',
   drawerCloseRoute:'DrawerClose',
   drawerToggleRoute:'DrawerToggle',
   contentComponent: CustomDrawerContentComponent,
   contentOptions:{
     activeTintColor:'green',
   },
 }
);

export default class Drawer extends React.Component{
 static router = MyDrawer.router;
 static navigationOptions = {
   drawer: () => ({
     label: '324234234234',
     icon: () => <Icon0  name="bars" size={35}/>
   })
 };
 render(){
   return(
     <View style={styles.allPage}>
       <MyDrawer navigation={this.props.navigation}/>
     </View>
   );
 }
}

const styles = StyleSheet.create({
 allPage: {
   flex: 1,
   flexDirection: 'column',
   backgroundColor: 'white',
   marginBottom:25,
 },
  drawerHeader: {
   height: 200,
   backgroundColor: 'white'
 },
 drawerImage: {
   height: 150,
   width: 150,
   borderRadius: 75
 },
 icon: {
   width: 24,
   height: 24,
 },
});