import React from 'react';
import { ScrollView, StyleSheet, Button, AsyncStorage, FlatList, View, Text, TouchableOpacity, Alert } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import axios from 'axios';
import { TabNavigator, StackNavigator } from 'react-navigation';

export default class DeckScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myDecks : []
    }
  }

  async componentDidMount() {
    const value = await AsyncStorage.getItem("userConnected");
    if (!this._unmounted) {
      const userConnected = JSON.parse(value);
    }
    this.getDecks()
  }


  getDecks = () => {
    buttonsListArr = [];
    AsyncStorage.getItem("userConnected").then((response) => {
      this.setState({ userConnected:response });
    })
    .then(()=>{
      console.log(this.state.userConnected)
       userConnected = this.state.userConnected
       console.log(userConnected)
        axios.get(`http://127.0.0.1:3000/decks`,{
          params: {
            userConnected
          }
        })
        .then(response => {
          var data = JSON.parse(response.request._response);
          this.setState({ myDecks: data })
        })
        .catch(error => {
          console.log(error)
        })
    })
  }

  selectDeck = (item) => {
    this.props.navigation.navigate('Deck', {deck:item})
  }

  deleteDeck = (item) => {
    console.log(item[16])
    Alert.alert(
      'Suppression',
      'Voulez vous supprimer ce deck ?',
      [
        {text: 'OK', onPress: () => axios.delete('http://127.0.0.1:3000/deleteDeck/'+item[16].id)},
      ],
      { cancelable: true }
    )
  }

  static navigationOptions = {
    title: 'Mes decks',
    headerLeft: null
  };


  _renderItem = ({item}) => (
    <TouchableOpacity delayLongPress={2500} key={item.index} onPress={() => this.selectDeck(item)} onLongPress={() => this.deleteDeck(item)}>
      <View
      style={{
        flexDirection: 'row',
        height: 200,
        width: 140,
        margin: 20,
        padding: 20,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: "lightgrey",
        borderStyle: 'dashed'
      }}>
      <Text>{item[15].deckName}</Text>
      </View>
    </TouchableOpacity>
  );
  render() {
    return (
      <ScrollView style={styles.container}>
        <Button
          onPress={() => this.props.navigation.navigate('Deck')}
          title='Créer un nouveau deck'
        />
        <FlatList
          data={this.state.myDecks}
          numColumns={2}
          horizontal={false}
          directionalLockEnabled={true}
          renderItem={this._renderItem}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
