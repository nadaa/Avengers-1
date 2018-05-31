import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, 
  ScrollView, ImageBackground } from 'react-native';
  import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
  import axios from 'axios';    
  import DatePicker from 'react-native-datepicker';
  import { Select, Option } from 'react-native-chooser';

  export default class SignUp extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
      bdate: '',
      role: 'Select your role',
      familyId: ''
    };
  }

  onSelect(value) {
    this.setState({ role: value });
  }

  sendSignUp() {
    if (this.state.email === '' || this.state.password === '' || this.state.username === '' 
      || this.state.bdate === '' || this.state.role === 'Select your role' 
      || this.state.familyId === '') {
      alert('fill all your data');
  } else if (this.validateEmail(this.state.email)) { 
    const { navigate } = this.props.navigation;
    axios.post(`${global.ip}/signup`, { user: this.state })
    .then((response) => {
      if (response.data.msg === 'success signup') {
        navigate('Login');
      } else if (response.data.msg === 'choose another email') {
        alert('choose another email');
      }
    })
    .catch((error) => {
      console.log(error);
    });   
  } else {
    alert('Please Fill a Valid Email');
  }
}  

validateEmail(text) {
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (reg.test(text) === false) {
    return false;
  }
  return true;
}
render() {
  return (
    <ImageBackground
    source={{ uri: 'https://images.pexels.com/photos/1018137/pexels-photo-1018137.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' }}
    style={styles.container}
    >
    <KeyboardAwareScrollView behaviour='padding' style={styles.wrapper}>
    <ScrollView contentContainerStyle={styles.contentContainer}>
    <TextInput
    ref={input => { this.textInput = input; }}
    value={this.state.username}
    style={styles.textInput}  
    placeholder='Username'
    onChangeText={(text) => this.setState({ username: text })}
    /> 
    <TextInput
    value={this.state.email}
    style={styles.textInput} 
    placeholder='Email'
    onChangeText={(text) => this.setState({ email: text })}
    /> 
    <TextInput
    style={styles.textInput} 
    placeholder='Password'
    secureTextEntry	
    value={this.state.password}
    onChangeText={(text) => this.setState({ password: text })}
    /> 
    <DatePicker 
    style={styles.datepicker}
    date={this.state.bdate}
    mode="date"
    placeholder="select your birthdate"
    format="YYYY-MM-DD"
    confirmBtnText="Confirm"
    cancelBtnText="Cancel"
    onDateChange={(date) => { this.setState({ bdate: new Date(date) }); }}
    />
    <View style={styles.rolepicker}>
    <Select
    onSelect={this.onSelect.bind(this)}
    defaultText={this.state.role}
    textStyle={{}}
    >
    <Option value='Father'>Father</Option>
    <Option value='Mother'>Mother</Option>
    <Option value='Child'>Child</Option>
    </Select>
    </View>
    <TextInput
    style={styles.textInput} 
    placeholder='FamilyId'	
    value={this.state.familyId}
    onChangeText={(text) => this.setState({ familyId: text })}
    />  
    <TouchableOpacity	style={styles.btn} onPress={this.sendSignUp.bind(this)}>
    <Text>SignUp</Text>
    </TouchableOpacity>
    <Text 
    style={{ color: 'black', paddingTop: 20, fontSize: 15 }} 
    onPress={() => this.props.navigation.navigate('Login')}
    >
    I have already account 
    </Text>
    </ScrollView>
    </KeyboardAwareScrollView>
    </ImageBackground>
    );
}
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 100,
  },
  wrapper: {
    // flex: 1,
  },
  container: {
    // flex: 1,
    backgroundColor: '#2896d3',
    paddingLeft: 40,
    paddingRight: 40,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 23,
  },
  header: {
    fontSize: 24,
    marginBottom: 60,
    color: '#fff',
    fontWeight: 'bold',
  },
  textInput: {
    alignSelf: 'stretch',
    padding: 16,
    // marginBottom: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 20,
  },
  btn: {
    alignSelf: 'stretch',
    backgroundColor: '#ffcde6',
    padding: 20,
    alignItems: 'center',
  },
  datepicker: {
    width: 295,
    height: 60,
    alignSelf: 'stretch',
    padding: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  rolepicker: {
    alignSelf: 'stretch',
    padding: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
});

