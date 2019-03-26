import React from 'react';
import axios from 'axios';

import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    AsyncStorage
} from 'react-native';

import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';


export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { textLogin: '' , passwordLogin: '', userConnected: '' };
    this.navigate = this.props.navigation.navigate;
  }


  static navigationOptions = {
    title: 'Login',
    headerLeft: null,
  };

  componentDidMount() {
    AsyncStorage.getItem("userConnected")
    .then((response) => {
      if(response){
        this.navigate('App')
      }
    });
    // if (!this._unmounted) {
    //   const userConnected = JSON.parse(value);
    //   this.setState({ userConnected:userConnected });
    // }
  }


  login = () => {
    AsyncStorage.clear();
    axios.post('http://127.0.0.1:3000/login',{'email':this.state.textLogin,'password':this.state.passwordLogin})
        .then(response => {
            // console.log(response)
            if(response.status == 200){
              console.log(AsyncStorage.getItem('userConnected'))
              AsyncStorage.setItem('userConnected', response.request._response);
              AsyncStorage.getItem('userConnected').then(res => {
                console.log(response)
              })
              this.navigate('App', {user : response.request._response})
            }
        })
        .catch(error => {
        console.log(error)
        })
    }
  render() {

    return (
      <View style={styles.container}>
        <Text>Email:</Text>
        <TextInput
        style={styles.input}
        onChangeText={(textLogin) => this.setState({textLogin})}
        value={this.state.textLogin}
      />
      <Text>Password:</Text>

        <TextInput
        style={styles.input}
        secureTextEntry={true}
        onChangeText={(passwordLogin) => this.setState({passwordLogin})}
        value={this.state.passwordLogin}
      />
        <TouchableOpacity onPress={this.login}>
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