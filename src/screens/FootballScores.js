import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Button, List, ListItem, Card  } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';



class FootballScores extends Component {
  componentDidMount(){
    this.props.getTodaysMatchesForFootball()
  }

  renderFootBallGames() {
    const { footballGames } = this.props
    return footballGames.map((game, i) => {
      const awayTeamName =  game.awayTeam.name
      const homeTeamName = game.homeTeam.name
      const awayTeamScore = game.matchStatus.away_score
      const homeTeamScore = game.matchStatus.home_score
      const tournamentName = game.tournamentInfo.name
      console.log(awayTeamName, 'awayTeam')
      console.log(homeTeamName, 'homeTeamName')
      console.log(awayTeamScore, 'awayTeamScore')
      console.log(homeTeamScore, 'homeTeamScore')
      console.log(tournamentName, 'tournamentNam')
      return (
        <View
        key={i}
        style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', marginTop: 20}}
        >
          <Card
          title={tournamentName}
          >
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
        </View>
      )
    })
  }
  render(){
    // console.log(this.props.footballGames)
    if(this.props.footballGames.length === 0){
      return (
        <View
         style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
        >
          <Button
            title='droerNav'
             onPress={() => this.props.navigation.openDrawer()}
          />
          <Text>No Matches</Text>
        </View>
      )
    }
    return(
      <View
      style={{ flex: 1, marginTop: 10}}
      >
       <Button
         title='droerNav'
          onPress={() => this.props.navigation.openDrawer()}
       />
       <ScrollView
         style={{ flex: 1 }}
       >
        {this.renderFootBallGames()}
       </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    footballGames: state.football.footballGames
  }
}


export default connect(mapStateToProps, actions)(FootballScores);
