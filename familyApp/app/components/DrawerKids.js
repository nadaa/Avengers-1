import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { createDrawerNavigator, StackNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import Shortage from './Shortage';
import TasksDisplay from './TasksDisplay';
import Finance from './Finance';
import { Container, Content, Header, Body } from 'native-base';

const CustomDrawerContentComponent = (props) => (
  <Container>
    <Header style={styles.drawerHeader}>
      <Body>
        <Image
          style={styles.drawerImage}
          source={{uri:'https://cdn3.vectorstock.com/i/1000x1000/89/37/happy-family-icon-multicolored-in-simple-figures-vector-19728937.jpg'}} 
        />
      </Body>
    </Header>
    <Content>
      <DrawerItems {...props} />
    </Content>
  </Container>
);

const KidsDrawer = createDrawerNavigator(
  {
    TasksDisplay: {
      screen: TasksDisplay,
    },
    Finance: {
      screen: Finance,
    },
    Shortage: {
      screen: Shortage,
    },
  },
  {
    initialRouteName: 'TasksDisplay',
    drawerPosition: 'left',
    drawerWidth: 200,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    contentComponent: CustomDrawerContentComponent,
    contentOptions: {
      activeTintColor: 'green',
    },
  }
);

export default class DrawerKids extends React.Component {
  static router=KidsDrawer.router;
  render() {
    return (
      <View style={styles.allPage}>
        <KidsDrawer navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  allPage: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    marginBottom: 25,
  },
  drawerHeader: {
    height: 200,
    backgroundColor: 'white'
  },
  drawerImage: {
    height: 150,
    width: 150,
    borderRadius: 75
  }
});
