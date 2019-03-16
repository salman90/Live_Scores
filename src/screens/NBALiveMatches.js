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

  onMatchPress = (game) => () => {
    this.props.showMatchDetails(game, ()=> {
      this.props.navigation.navigate('NBAMatchDetails')
    })
  }
  componentDidMount(){
    const { NBAGames } = this.props

    // console.log(NBAGames, 'games')
    // this.props.fetchMatchScrores(NBAGames)
    this.props.showLiveMatches(NBAGames)
    this.props.navigation.setParams({ SignOut: this._signUserOut });
  }

  _signUserOut = () => {
    Alert.alert(
      'SignOut',
      'Are You Sure That You Want To Sign Out',
      [
        {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () =>  this.props.signUserOut(() =>{
          this.props.navigation.navigate('Auth')
        })},
      ]
    )
  };


  renderLiveNBAGames(){
    const { liveNBAMatches, NBAGames, liveMatchesArr } = this.props
    // console.log('in live match')
    // console.log(liveMatchesArr, 'liveMachesArr')
    // if(liveMatchesArr.length === 0 ){
      return liveMatchesArr.map((game, i) => {
        // console.log(game)
        let awayTeamName = game.away.name
        let awayTeamScore = game.away_points
        let homeTeamName = game.home.name
        let homeTeamScore = game.home_points
        let gameStatus = game.status
        let gameTime = game.scheduled
        let gameTimeNewFormat = moment(game.scheduled).format('LLL')

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

                {gameStatus == 'inprogress'?
                <View
                 style={styles.greendotStyle}
                ></View>: null}
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
    // }

  }
  render(){
    if(this.props.liveMatchesArr.length === 0){
      return (
        <View
        style={styles.logoContainer}
        >
          <Image
          style={styles.logoImageStyle}
          source={require('../images/logo.jpg')}
          />
          <Text
           style={{
             fontSize: 20,
             // color: '#fff',
           }}
          >
           No Live Matches
          </Text>
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
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ab372b'
  },
  logoImageStyle: {
     width: 250,
     height: 130
  },
})

const mapStateToProps =  state => {
  return {
    NBAGames: state.NBA.NBAGames,
    loading: state.NBA.loading,
    liveNBAMatches: state.NBA.liveNBAMatches,
    liveMatchesArr: state.NBA.liveMatchesArr,
  }
}

export default connect(mapStateToProps, actions) (NBALiveMatches);
