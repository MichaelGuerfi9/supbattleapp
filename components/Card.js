import React, { Component } from 'react';
import { ActivityIndicator, Text, View, StyleSheet, Image, RefreshControl, ListView } from 'react-native';

export default class Card extends Component {
    constructor(props) {
      super(props)
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
        refreshing: false,
        dataSource: ds.cloneWithRows(['row 1', 'row 2']),
        style: {'epic':styles.epic,'legendary':styles.legendary,'common':styles.common}
      };
    }
    _onRefresh() {
      this.setState({ refreshing: true });
    }
    render() {
      return (
        <View style = {this.state.style[this.props.rarity]}>
          <Image
          style={{width:90,height:90,margin:5,borderRadius: 30,}}
          source={{uri: this.props.imageUrl }}
          />
          {/* <Text>{this.props.name} {this.props.lastname}</Text>
          <Text>{this.props.description}</Text>
          <Text>Effet : {this.props.effect}</Text>
            <Text>Coût : {this.props.mana}</Text>
            <Text>Attaque : {this.props.attack}</Text>
            <Text>Santé : {this.props.health}</Text> */}

        </View>
      );
    }
  }
  const styles = StyleSheet.create({
    epic: {
      width:100,
      height:100,
      // flex: 0.5,
      // alignItems: 'center',
      margin: 15,
      backgroundColor: '#AD2FF3',
      borderRadius: 30,
    },
    legendary: {
      backgroundColor: '#F3B32A',
      width:100,
      height:100,
      // flex: 0.5,
      // alignItems: 'center',
      margin: 15,
      borderRadius: 30,

    },
    common: {
      width:100,
      height:100,
      // flex: 0.5,
      // alignItems: 'center',
      margin: 15,
      backgroundColor: '#fff',
      borderRadius: 30,

    }
  });
