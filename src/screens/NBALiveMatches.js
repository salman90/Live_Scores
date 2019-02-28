import React, { Component} from 'react';
import {View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Button, Card, Icon } from 'react-native-elements';



class NBALiveMatches extends Component {
  componentDidMount(){
    const { NBAGames } = this.props
    // console.log(NBAGames, 'games')
    this.props.fetchMatchScrores(NBAGames)
  }

  renderLiveNBAGames(){
    const { liveNBAMatches } = this.props
    // console.log(liveNBAMatches, 'live nba matches')
    return liveNBAMatches.map((game, i) => {
      const awayTeamInfo = game.data.away
      // console.log(awayTeamInfo, 'away team')
      const homeTeamInfo =  game.data.home
      // console.log(awayTeamInfo, 'home team')
      return(
        <View
         key={i}
         style={{
           flex: 1,
           flexDirection: 'column',
           justifyContent: 'center',
           marginTop: 20
         }}
        >
         <Card
          title='NBA'
         >
         </Card>
        </View>
      )
      // console.log(game.data.away)
    })
    return (
      <View />
    )
  }
  render(){
    // console.log(this.props.liveNBAMatches, 'live nba matches')
    if(this.props.liveNBAMatches.length === 0){
      return (
        <View
        style={styles.imageContianer}
        >
          <Image
          style={styles.imageStyle}
          source={require('../images/logo.jpg')}
          />
        </View>
      )
    }
    return(
      <View
       style={{
         flex: 1,
         backgroundColor: '#ab372b',
       }}
      >
       <ScrollView
        contentContainerStyle={{
          marginBottom: 20,
          paddingVertical: 25,
        }}
       >
        {this.renderLiveNBAGames()}
       </ScrollView>

      </View>
    )
  }
}
const styles = StyleSheet.create({
  imageContianer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ab372b'
  },
  imageStyle: {
    width: 250,
    height: 150
  },
})
const mapStateToProps =  state => {
  return {
    NBAGames: state.NBA.NBAGames,
    loading: state.NBA.loading,
    liveNBAMatches: state.NBA.liveNBAMatches,
  }
}

export default connect(mapStateToProps, actions) (NBALiveMatches);
