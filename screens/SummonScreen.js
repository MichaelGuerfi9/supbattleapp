import React from 'react';
import axios from 'axios';
import Card from '../components/Card';

import { ExpoConfigView } from '@expo/samples';
import {Button, View, AsyncStorage, Text} from 'react-native';

export default class SummonScreen extends React.Component {
  static navigationOptions = {
    title: 'Summon',
    headerLeft: null,
  };
  constructor(props) {
    super(props);
    this.state = { textLogin: '' , passwordLogin: '', userConnected: ""};
    this.navigate = this.props.navigation.navigate;
  }

  async componentDidMount() {
    const value = await AsyncStorage.getItem("userConnected");
    if (!this._unmounted) {
      const userConnected = JSON.parse(value);
    }
  }


  getRandomCard = () => {
    AsyncStorage.getItem("userConnected").then((response) => {
      this.setState({ userConnected:response });
      console.log(this.state.userConnected)
    });
   userConnected = this.state.userConnected
   axios.get(`http://127.0.0.1:3000/card`,{
     params: {
       userConnected
     }
   })
    .then(response => {
        this.setState({
          name: JSON.parse(response.request._response).name.toLowerCase(),
          description: JSON.parse(response.request._response).description,
          rarity: JSON.parse(response.request._response).quality,
          effect: JSON.parse(response.request._response).effect,
          mana: JSON.parse(response.request._response).mana,
          attack: JSON.parse(response.request._response).attack,
          health: JSON.parse(response.request._response).health,
          imageUrl: JSON.parse(response.request._response).photo
        })
    })
    .catch(error => {
    console.log(error)
    })
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Button
        title="Obtenir une nouvelle carte"
        onPress={this.getRandomCard}
        />
        <Card name={this.state.name} rarity={this.state.rarity} description={this.state.description} effect={this.state.effect} mana={this.state.mana} attack={this.state.attack} health={this.state.health} imageUrl={this.state.imageUrl} />
      </View>
    );
  }
}
