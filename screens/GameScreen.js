import React from 'react';
import SocketIOClient from 'socket.io-client';
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    Button,
    ScrollView,
    TouchableOpacity,
    View,
    AsyncStorage,
    FlatList
  } from 'react-native';

export default class GameScreen extends React.Component {
    constructor(props) {
        super(props);
        this.socket = SocketIOClient('http://localhost:3000', {
            transports: ['websocket']
        });

        // Creating the socket-client instance will automatically connect to the server.
        // this.socket.connect();
      }

    async componentDidMount() {

        this.socket.on('connect', () => {
            console.log("socket connected")
            this.socket.emit('test', {})
            this.socket.on('EVENT YOU WANNA LISTEN', (r) => {
            })
          })

          this.socket.on('connect_error', (err) => {
            console.log(err)
          })

          this.socket.on('disconnect', () => {
            console.log("Disconnected Socket!")
          })


    }

      test = () => {

          this.socket.emit('test','Helloooo')
          console.log('on passe')
      }

      render() {
        return (
            <View>
                <Button
                    title="Click"
                    onPress={this.test}
                />
            </View>
        )
    }
    }
