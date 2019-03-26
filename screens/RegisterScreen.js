import React from 'react';
import axios from 'axios';

import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';


export default class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' , password: '', username: ''};
    this.navigate = this.props.navigation.navigate;
  }

  register = () => {
    axios.post('http://127.0.0.1:3000/register',{'email':this.state.text,'username':this.state.username,'password':this.state.password})
        .then(response => {
            console.log(response)
            if(response.status == 200){
                this.navigate('App', {user : this.state.email})
            }
        })
        .catch(error => {
        console.log(error)
        })
    }

  static navigationOptions = {
    header: null,
  };
  render() {
    return (
        <View style={styles.container}>
        <Text>Email:</Text>
        <TextInput
        style={styles.input}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />
      <Text>Username:</Text>
        <TextInput
        style={styles.input}
        onChangeText={(username) => this.setState({username})}
        value={this.state.username}
      />
      <Text>Password:</Text>

        <TextInput
        style={styles.input}
        secureTextEntry={true}
        onChangeText={(password) => this.setState({password})}
        value={this.state.password}
      />
        <TouchableOpacity onPress={this.register}>
            <Text style={styles.button}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
    button: {
      backgroundColor: 'blue',
      color: 'white',
      height: 40,
      lineHeight: 30,
      marginTop: 10,
      textAlign: 'center',
      width: 250
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
      borderColor: 'black',
      borderWidth: 1,
      height: 37,
      width: 250,
    }
  })