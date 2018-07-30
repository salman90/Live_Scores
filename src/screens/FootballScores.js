import React, { Component } from 'react';
import { View, Text, ScrollView , TouchableHighlight} from 'react-native';
import { Button, List, ListItem, Card  } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';



class FootballScores extends Component {




  componentDidMount(){
    this.props.getTodaysMatchesForFootball()
  }

  renderFootballDetails(game){
    // console.log(game.matchId)
    this.props.getMatchDetails(game, () =>{
      this.props.navigation.navigate('MatchDetailsForFootball')
    })
  }

  renderFootBallGames() {
    const { footballGames } = this.props

    return footballGames.map((game, i) => {
      const awayTeamName =  game.awayTeam.name
      const homeTeamName = game.homeTeam.name
      const awayTeamScore = game.matchStatus.away_score
      const homeTeamScore = game.matchStatus.home_score
      const tournamentName = game.tournamentInfo.name
      const matchStatus = game.matchStatus.status
      const matchTime = game.matchTime
      // game.sort(matchTime)
      console.log(game)
      // console.log(matchTime)
      // console.log(matchStatus)
      // console.log(game)
      return (
        <View
        key={i}
        style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', marginTop: 20}}
        >
        <TouchableHighlight
         onPress={this.renderFootballDetails.bind(this, game)}
        >
          <Card
          title={tournamentName}
          >
           <View>
            <Text>{matchStatus}</Text>
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
