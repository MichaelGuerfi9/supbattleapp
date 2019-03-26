import React from 'react';
import axios from 'axios';
import Card from '../components/Card';


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
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userConnected: "",
      myCards: []
    }
  }

  async componentDidMount() {
    const value = await AsyncStorage.getItem("userConnected");
    if (!this._unmounted) {
      const userConnected = JSON.parse(value);
    }
    this.getCards()
  }


getCards = () => {
  buttonsListArr = [];
  AsyncStorage.getItem("userConnected").then((response) => {
    this.setState({ userConnected:response });
  })
  .then(()=>{
    console.log(this.state.userConnected)
     userConnected = this.state.userConnected
     console.log(userConnected)
      axios.get(`http://127.0.0.1:3000/getCards`,{
        params: {
          userConnected
        }
      })
      .then(response => {
        // for (let i in JSON.parse(response.request._response)[0].cards)
        // {
        //   var collec = JSON.parse(response.request._response)[0].cards
        //   var collection = []
        //   collection.push(collec[i])
        //   console.log(collection)
        // }
        this.setState({ myCards:JSON.parse(response.request._response)[0].cards })

      })
      .catch(error => {
        console.log(error)
      })
  })
}


  static navigationOptions = {
    title: 'Liste des cartes',
    headerLeft: null
  };


  _renderItem = ({item}) => (
    <Card name={item.name}
          rarity={item.quality}
          description={item.description}
          effect={item.effect}
          mana={item.mana}
          attack={item.attack}
          health={item.health}
          imageUrl={item.photo}
      />
  );

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={{height: 1000}}>
        <FlatList
          data={this.state.myCards}
          numColumns={3}
          horizontal={false}
          directionalLockEnabled={true}
          renderItem={this._renderItem}
          extraData={this.state}
        />
      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    height:300,
    backgroundColor: '#fff',
    flexDirection:'row',
    overflow:'visible'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection:'column',
    paddingTop: 20,
  },
  epic: {
    width:90,
    height:150,
    // flex: 0.5,
    // alignItems: 'center',
    margin: 15,
    backgroundColor: '#AD2FF3',
  },
  legendary: {
    backgroundColor: '#F3B32A',
    width:90,
    height:150,
    // flex: 0.5,
    // alignItems: 'center',
    margin: 15
  },
  common: {
    width:90,
    height:150,
    // flex: 0.5,
    // alignItems: 'center',
    margin: 15,
    backgroundColor: '#fff',
  }
});
