import React from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { createDrawerNavigator, StackNavigator, DrawerItems, SafeAreaView} from 'react-navigation'
import UserInfo from './UserInfo';
import Shortage from './Shortage';
import TasksDisplay from './TasksDisplay';
import ShortageNote from './ShortageNote'
import Login from './Login';
import Finance from './Finance';
import { Container, Content, Icon, Header, Body, Left, Button  } from 'native-base'

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
// a left side drwarer to hold screens which appear for childs
const KidsDrawer=createDrawerNavigator(
  {
    Finance:{
      screen:Finance,
    },
    TasksDisplay:{
      screen:TasksDisplay,
    },
   
    Shortage:{
      screen:Shortage,
    },
  },
  {
    initialRouteName:'Finance',
    drawerPosition:'left',
    drawerWidth:200,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    contentComponent: CustomDrawerContentComponent,
    contentOptions:{
      activeTintColor:'green',
    },
  }
);

export default class DrawerKids extends React.Component{
  static router=KidsDrawer.router;
  render(){
    return(
      <View style={styles.allPage}>
        <KidsDrawer navigation={this.props.navigation}/>
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
