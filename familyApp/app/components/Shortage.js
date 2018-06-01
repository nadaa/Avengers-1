import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, 
AsyncStorage, ScrollView } from 'react-native';
import axios from 'axios';    
import Bar from './Bar';
import ShortageNote from './ShortageNote';
import Icon0 from 'react-native-vector-icons/FontAwesome';

export default class Shortage extends React.Component {
 static navigationOptions = {
    drawerIcon: () => (
      <Icon0 style={{color:'green'}} name="cart-plus" size={20}/>
    ),
  }
   constructor(props) {
    super(props);
    this.state = {
      needArray: [],
      needText: '',
    };
    this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    //axios.get('http://192.168.0.84:3000/api/shortage')
    const familyId = await AsyncStorage.getItem('familyid');
    console.log(familyId);
    axios.post(`${global.ip}/getshortage`, { familyId }) 
    .then((response) => {
      this.setState({ needArray: response.data.needs });
      console.log('needArray', this.state.needArray);   
    })
    .catch((error) => {
      console.log(error);
      alert(error);
    });
  }
  async addNeed() {
    const that = this;
    const familyId = await AsyncStorage.getItem('familyid');
    if (this.state.needText) {
      axios.post(`${global.ip}/shortage`, {
        need: this.state.needText,
        familyId,
      })
      .then((response) => {
        if (response.data.msg === 'success') {
          alert('success');
          that.getData();
        } else if (response.data.msg === 'error') {
          alert('error');
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
      this.setState({ needText: '' });
    }
  }
  async deleteMethod(key) {
    this.state.needArray.splice(key, 1);
    this.setState({ needArray: this.state.needArray });
    const familyId = await AsyncStorage.getItem('familyid');
    axios.post(`${global.ip}/deleteshortage`, { 
      need: this.state.needText,
      familyId,
      key
    })
    .then(function (response) {
      if (response.data.msg === 'success') {
        this.getData();
      } else if (response.data.msg === 'error') {
        alert('error');
      }
    })
    .catch((error) => {
      console.log(error);
      alert(error);
    });
    this.setState({ needText: '' });
  }


  render() {
    const notes = this.state.needArray.map((val, key) => 
      <ShortageNote 
      key={key} 
      keyval={key} 
      val={val} 
      deleteMethod={
        () => this.deleteMethod(key)} 
      />
        );
    
    return (
      <View style={styles.container}>
      <Bar navigation={this.props.navigation} />
      <View style={styles.header}>
      <Text style={styles.headerText}>Shortage</Text>
      </View>
      <ScrollView style={styles.scrollContainer}>
      {notes}
      </ScrollView>
      <View style={styles.footer}>
      <TouchableOpacity style={styles.addButton} onPress={this.addNeed.bind(this)}>
      <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      <TextInput 
      onChangeText={(needText) => this.setState({ needText })} value={this.state.needText}
      style={styles.textInput} 
      placeholder='> need' 
      placeholderTextColor='white'
      />
      </View>
      </View>
      );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#65737e',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 10,
    borderBottomColor: '#ddd',
  },
  headerText: {
    color: 'white',
    fontSize: 40,
    padding: 10,
    justifyContent: 'center',
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 100,
  },
  footer: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 0,
    left: 0,
    right: 0,
  },
  addButton: {
    width: 90,
    height: 90,
    borderRadius: 70,
    borderColor: '#ccc',
    alignItems: 'center',
    zIndex: 10,
    elevation: 8,
    marginBottom: -45,
    backgroundColor: '#65737e', 
  },
  addButtonText: {
    color: '#fff',
    fontSize: 55,
    justifyContent: 'center',
  },
  textInput: {
    alignSelf: 'stretch',
    color: '#fff',
    padding: 40,
    paddingTop: 40,
    backgroundColor: '#c0c5ce',
    borderTopWidth: 2,
    borderTopColor: '#c0c5ce',
  }
});
