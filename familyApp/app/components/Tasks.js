//import react from react
import React from 'react';
//import element from reacr-native
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// import Bar from './Bar'
//<Bar navigation={this.props.navigation}/>



export default class Tasks extends React.Component {
constructor(props){
		super(props);

		this.state={
			kidName: '',
			taskText : ''
		}
	}

	render() {
		return (
			<View style={styles.allPage}>
            <Text >please solve this isuue</Text>
	<View style={styles.container}>

			<TouchableOpacity
			style={styles.btn}
			// onPress={this.login}
			>
			<Text style={styles.textStyle}>Assign Task</Text>
			</TouchableOpacity>

			<TouchableOpacity
			style={styles.btn}
			// onPress={this.login}
			>
			<Text style={styles.textStyle}>Monitor Task</Text>
			</TouchableOpacity>

			<TouchableOpacity
			style={styles.btn}
			// onPress={this.login}
			>
			<Text style={styles.textStyle}>Add Info</Text>
			</TouchableOpacity>
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
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#2896d3',
		paddingLeft: 40,
		paddingRight: 40,
	},

	textStyle: {

		alignSelf: 'center',
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold',

	},
	btn: {
		alignSelf: 'stretch',
		backgroundColor: '#01c853',
		alignItems: 'center',
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#007aff',
		justifyContent: 'center',
		height: 60,
		marginLeft: 5,
		marginRight: 5,
		marginTop: 15,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 20 },
		shadowOpacity: 0.2,
		elevation: 2,
		position: 'relative'
	},

	viewStyle: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 60,
		paddingTop: 15,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 20 },
		shadowOpacity: 0.2,
		elevation: 2,
		position: 'relative'
	},
});
/*


		


*/