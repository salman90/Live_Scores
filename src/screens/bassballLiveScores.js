import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableWithoutFeedback,
  StyleSheet, Image } from 'react-native';
import {connect} from 'react-redux';
import { Card, Icon } from 'react-native-elements'
import * as actions from '../actions';
import moment from 'moment';


class BassballLiveScores extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Live Scores',
      headerStyle: {
        backgroundColor: '#fff'
      },
      headerRight: (
        <Icon
          type='font-awesome'
           size={25}
           onPress={navigation.getParam('SignOut')}
           name='sign-out'
        />
      ),
    }
  }

  constructor(props) {
    super(props);
    this.renderLiveGameInfo = this.renderLiveGameInfo.bind(this)
  }

  renderLiveGameInfo = (game) => () =>{
    this.props.renderLiveMatchDetailsForBassball(game, () => {
      this.props.navigation.navigate('BassballLiveMatchDetails')
    })
  }

  renderLiveMatches() {
    const { bassballGames } = this.props
    return bassballGames.map((game, i) => {
      const gameStatus =  game.game.status
      console.log(gameStatus === 'inprogress')
      if(gameStatus == 'inprogress') {
        const homeTeamName = game.game.home.name
        const gameID = game.game.id
        const awayTeamName = game.game.away.name
        const homeTeamScore = game.game.home.runs
        const awayTeamScore = game.game.away.runs
        const gameStatus =  game.game.status
        const gameDate = game.game.scheduled
        const gameDateFormat = moment(gameDate).format("hh:mm a")
        return (

          <View
            key={gameID}
            style={styles.cardContainer}
            >
            <TouchableWithoutFeedback
             onPress={this.renderLiveGameInfo(game)}
            >
          <Card
          key={gameID}
           title={'MLB'}
           titleStyle={styles.cardTitle}
           containerStyle={styles.cardStyle}
          >
          <View>
            {gameStatus == 'scheduled' ? <Text>{gameDateFormat}</Text> : null}
            {gameStatus == 'inprogress'?
            <View style={styles.greendotStyle}></View>: null}
            {gameStatus == 'closed' || gameStatus == 'complete' ? <Text>FT</Text>: null}
            {gameStatus =='wdelay'? <Text>Delay</Text>: null}
          </View>

            <View
             style={styles.teamContainer}
            >
              <Text
               style={styles.teamNameFont}
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
            style={styles.teamContainer}
            >
              <Text
              style={styles.teamNameFont}
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
          </TouchableWithoutFeedback>
          </View>
        )
      }
    })
  }


  render(){
    console.log(this.props.bassballGames, 'bassball games')
      if(this.props.bassballGames.length === 0 ){
        return (
          <View
           style={{
             flex:1,
             alignItems: 'center',
             justifyContent: 'center',
             backgroundColor: '#ab372b',
           }}
          >
           <Image
            style={{
              width: 250,
              height: 150
            }}
            source={require('../images/logo.jpg')}
           />
          </View>
        )
      }
    return (
      <View
      style={styles.container}

      >
       <ScrollView
        style={styles.scrollViewStyle}
       >
        {this.renderLiveMatches()}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ab372b',
  },
  scrollViewStyle: {
    flex: 1
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 20
  },
  cardTitle: {
    color: '#000'
  },
  cardStyle: {
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 2,
  },
  greendotStyle: {
    width: 10,
    height: 10,
    borderRadius: 10/2,
    backgroundColor: 'green'
  },
  teamContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10
  },
  teamNameFont: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  teamScoreStyle: {
    fontSize: 15,
    fontWeight: 'bold'
  },
})

const mapStateToProps = state => {
  return {
    bassballGames: state.bassball.bassballGames,
  }
}


export default connect(mapStateToProps, actions)(BassballLiveScores);
