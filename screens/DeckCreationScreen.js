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
  FlatList,
  Alert,
  Modal,
  TouchableHighlight
} from 'react-native';
import { WebBrowser } from 'expo';
import Prompt from 'react-native-prompt';


import { MonoText } from '../components/StyledText';

export default class DeckCreationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.selectCard = this.selectCard.bind(this);
    this.navigate = this.props.navigation.navigate;
    this.state = {
      userConnected: "",
      check:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsK8662fcbV0mMFwHZ3ih7gnbtsvVZOjU5ffSbg6wED-ugeiAY",
      myCards: [],
      deckCards: [],
      promptVisible: false,
      name: "",
      toModify: true,
      id: "",
    }
  }

  async componentDidMount() {
    if(this.props.navigation.state.params){
      this.state.deckCards = this.props.navigation.state.params.deck;
      this.state.id = his.state.deckCards[16].id;
      this.state.deckCards.splice(15,1);
      this.state.toModify = true;
    }
    const value = await AsyncStorage.getItem("userConnected");
    if (!this._unmounted) {
      const userConnected = JSON.parse(value);
    }
    this.getCards()
    console.log(this.state.myCards)
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
        this.setState({ myCards:JSON.parse(response.request._response)[0].cards })
        for(i in this.state.myCards){
          this.state.myCards[i].selected = false;
        }
      })
      .catch(error => {
        console.log(error)
      })
  })
}

selectCard = (item) => {
  var index = this.state.myCards.indexOf(item);
  var card = this.state.myCards;


    if(card[index].photo == this.state.check){

    card[index].photo = card[index].imageOrigin;
    this.state.deckCards.splice(card[index].indexOfDeck,1)
  }else{
    if(this.state.deckCards.length >= 15){
      Alert.alert(
        'Limite atteinte',
        'Vous ne pouvez prendre que 15 cartes dans votre deck',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    }
    else
    {
    card[index].imageOrigin= card[index].photo;
    card[index].photo = this.state.check;
    this.state.deckCards.push(item);
    card[index].indexOfDeck = this.state.deckCards.indexOf(item);
    }
  }
  console.log(this.state.deckCards)
  this.setState({myCards: card})
  // this.props.selected = true;
}

setDeck = () => {
  console.log(this.state.name)
  axios.post('http://127.0.0.1:3000/createDecks',{'deck':this.state.deckCards,'userId':this.state.userConnected, 'deckName':this.state.name})
      .then(response => {
          // console.log(response)
          if(response.status == 200){
            console.log('Deck créé')
            this.navigate('Decks')
          }
      })
      .catch(error => {
      console.log(error)
      })
}

setNameDeck = (value) => {
  console.log(value)
  this.setState({ promptVisible: false});
  this.state.name = value;
  this.setDeck()
}

displayPrompt = () => {
  if(this.state.deckCards.length != 15){
    Alert.alert(
      'Limite non atteinte',
      'Veuillez choisir 15 cartes pour avoir un deck complet',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    )
  }
  else {
    this.setState({promptVisible: true})
  }
}
  static navigationOptions = {
    title: 'Créer un deck'
  };


  _renderItem = ({item}) => (
    <TouchableOpacity key={item.index} onPress={() => this.selectCard(item)}>
    <Card name={item.name}
          rarity={item.quality}
          description={item.description}
          effect={item.effect}
          mana={item.mana}
          attack={item.attack}
          health={item.health}
          imageUrl={item.photo}
          selected={false}
      />
      </TouchableOpacity>
  );

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={{height: 1000}}>
      <Text>Sélectionner 15 cartes</Text>
      <Button
          onPress={this.displayPrompt}
          title="Créer Deck"
          color="#841584"
          accessibilityLabel="Deck Creation"
      />
      <Prompt
            title="Choisir un nom"
            placeholder="Name"
            defaultValue=""
            visible={this.state.promptVisible}
            submitText="Créer le deck"
            onCancel={() => this.setState({ promptVisible: false })}
            onSubmit={(value) => this.setNameDeck(value)}/>
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
