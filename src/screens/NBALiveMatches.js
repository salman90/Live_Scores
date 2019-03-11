import React, { Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Button, Card, Icon } from 'react-native-elements';
import moment from 'moment';


class NBALiveMatches extends Component {
  constructor(props) {
    super(props);
  this.onMatchPress = this.onMatchPress.bind(this)
  }

  onMatchPress = (game) => () => {
    this.props.showMatchDetails(game, ()=> {
      this.props.navigation.navigate('NBAMatchDetails')
    })
  }
  componentDidMount(){
    const { NBAGames } = this.props

    // console.log(NBAGames, 'games')
    // this.props.fetchMatchScrores(NBAGames)
  }

  renderLiveNBAGames(){
    const { liveNBAMatches, NBAGames } = this.props
    return NBAGames.map((game, i) => {
      // console.log(game)
      let awayTeamName = game.away.name
      let awayTeamScore = game.away_points
      let homeTeamName = game.home.name
      let homeTeamScore = game.home_points
      let gameStatus = game.status
      let gameTime = game.scheduled
      let gameTimeNewFormat = moment(game.scheduled).format('LLL')
      // console.log(gameStatus, 'status')
      // console.log(awayTeamScore, 'away team score')
      // console.log(homeTeamScore, 'away team score')
      return (
        <View
        key={i}
        style={styles.cardContainerStyle}
        >
        <TouchableHighlight
         onPress={this.onMatchPress(game)}
        >
          <Card
          title='NBA'
          containerStyle={{
            borderColor: '#000',
            borderWidth: 2,
            borderWidth: 2,
          }}
          >
            <View>
              {gameStatus == 'closed' || gameStatus == 'complete'? <Text>FT</Text>: null}
              {gameStatus == 'inprogress'?
              <View
               style={styles.greendotStyle}
              ></View>: null}
                {gameStatus =='wdelay'? <Text>Delay</Text>: null}
                {gameStatus == 'scheduled'? <Text>{gameTimeNewFormat}</Text>: null}
            </View>
            <View
             style={styles.teamContainerStyle}
            >
              <Text
               style={styles.teamNameStyle}
              >
              {awayTeamName}
              </Text>
              <Text
              style={styles.teamScoreStyle}

              >
                {awayTeamScore}
              </Text>
            </View>
            <View
             style={styles.teamContainerStyle}
            >
            <Text
            style={styles.teamNameStyle}
            >
              {homeTeamName}
            </Text>
            <Text
            style={styles.teamScoreStyle}
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
    // console.log(this.props.liveNBAMatches, 'live nba matches')
    if(this.props.NBAGames.length === 0){
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
  containerStyle: {
    flex: 1,
    backgroundColor: '#ab372b'
  },
  scrollViewStyle: {
    marginBottom: 20,
    paddingVertical: 25
  },
  cardContainerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 20
  },
  greendotStyle: {
    width: 10,
    height: 10,
    borderRadius: 10/2,
    backgroundColor: 'green'
  },
  teamContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10
  },
  teamNameStyle: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  teamScoreStyle: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  loadingContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  imageLogoStyle: {
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
