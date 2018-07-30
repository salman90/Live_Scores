import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableHighlight } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';


class NBAScores extends Component {
  componentDidMount() {
    // this.props.renderNBAMatches()
  }

  onMatchPress(game){
    this.props.showMatchDetails(game, ()=> {
      this.props.navigation.navigate('NBAMatchDetails')
    })
  }
  renderNBAGames(){
    const { NBAGames } = this.props
    return NBAGames.map((game, i) => {
      // console.log(game.id)
      let awayTeamName = game.away.name
      let awayTeamScore = game.away_points
      let homeTeamName = game.home.name
      let homeTeamScore = game.home_points
      let gameStatus = game.status
      return (
        <View
        key={i}
        style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', marginTop: 20}}
        >
        <TouchableHighlight
         onPress={this.onMatchPress.bind(this, game)}
        >
          <Card
          title='NBA'
          >
            <View>
              <Text>{gameStatus}</Text>
            </View>
            <View
             style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}
            >
              <Text
               style={{fontSize: 15, fontWeight: 'bold'}}
              >
              {awayTeamName}
              </Text>
              <Text
              style={{fontSize: 15, fontWeight: 'bold'}}

              >
                {awayTeamScore}
              </Text>
            </View>
            <View
             style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10  }}
            >
            <Text
            style={{fontSize: 15, fontWeight: 'bold'}}
            >
              {homeTeamName}
            </Text>
            <Text
            style={{fontSize: 15, fontWeight: 'bold'}}
            >
              {homeTeamScore}
            </Text>
            </View>
          </Card>
        </TouchableHighlight>
        </View>
      )
    })

  }
  render(){
    if(this.props.NBAGames.length === 0){
      return (
        <View
          style={{ alignItems: 'center', justifyContent: 'center', flex:1 }}
        >
          <Text>No Matches</Text>
          <Button
          title='openDrawer'
          onPress={() => this.props.navigation.openDrawer()}
          />
        </View>
      )
    }
    return (
      <View
       style={{ flex: 1}}
      >
       <Button
         title='openDrawer'
         onPress={() => this.props.navigation.openDrawer()}
       />
       <ScrollView
        style={{ flex: 1, marginTop: 10}}
       >
         {this.renderNBAGames()}
       </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    NBAGames: state.NBA.NBAGames
  }
}

export default connect(mapStateToProps, actions)(NBAScores);
