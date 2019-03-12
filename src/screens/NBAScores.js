import React, { Component } from 'react';
import { View,
  Text,
  ScrollView,
  TouchableHighlight,
  ActivityIndicator,
  Alert,
  StyleSheet,
  Image } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import DateScrollerForNBA from '../components/dateScrollerForNBA';
import { connect } from 'react-redux';
import * as actions from '../actions';
import moment from 'moment';


class NBAScores extends Component {
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

         headerLeft: (
           <Icon
           type='font-awesome'
            onPress={() => navigation.openDrawer()}
            name='bars'
            size={30}
            containerStyle={{ marginLeft: 5}}
           />
         ),
         headerRight: (
           <Icon
             type='font-awesome'
              size={25}
              onPress={navigation.getParam('SignOut')}
              name='sign-out'
           />
         ),
    };
  }


  componentDidMount() {
    // const dateold = '2018/06/09'
    // console.log(dateold)
    const date = moment().format('YYYY/MM/DD')
    this.props.renderNBAMatches(date)
    this.props.navigation.setParams({ SignOut: this._signUserOut });
  }

  _signUserOut = () => {
    Alert.alert(
      'SignOut',
      'Are You Sure That You Want To Sign Out',
      [
        {text: 'Yes', onPress: () =>  this.props.signUserOut(() =>{
          this.props.navigation.navigate('Auth')
        })},
        {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
      ]
    )
  };

  onMatchPress = (game) => () => {
    this.props.showMatchDetails(game, ()=> {
      this.props.navigation.navigate('NBAMatchDetails')
    })
  }
  renderNBAGames(){
    const { NBAGames } = this.props
    NBAGames.sort(function(a,b){
      const keyA = new Date(a.scheduled)
      const keyB = new Date(b.scheduled)
      if(keyA < keyB) return -1;
      if(keyA > keyB) return 1;
      return 0
    })
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

  clearError(){
    this.props.clearErrorMessageForNBA()
  }

  renderError = () =>{
    const { error } = this.props
    if(error){
      Alert.alert(
        'Error',
        'something went wrong',
        [
          {text: 'OK', onPress: this.clearError.bind(this)},
        ]
      )
    }
  }

  render(){
    // console.log(this.props.NBAGames)
    if(this.props.loading){
      return (
      <View
       style={{ alignItems: 'center', justifyContent: 'center', flex: 1}}
      >
        <ActivityIndicator
         size="large"
         color="#0000ff"
        />
       </View>
      )
    }
    if(this.props.NBAGames.length === 0){
      return (
        <View
          style={{ flex:1, backgroundColor: '#ab372b' }}
        >
         <View
         >
           <DateScrollerForNBA />
         </View>
         <View
          style={styles.loadingContainerStyle}
         >
         {this.renderError()}
            <Image
            style={styles.imageLogoStyle}
            source={require('../images/logo.jpg')}
            />
            <Text>No Matches</Text>
         </View>
        </View>
      )
    }
    return (
      <View
       style={styles.containerStyle}
      >
      <DateScrollerForNBA />
      {this.renderError()}
       <ScrollView
       contentContainerStyle={styles.scrollViewStyle}
       >
         {this.renderNBAGames()}
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

const mapStateToProps = state => {
  return {
    NBAGames: state.NBA.NBAGames,
    error: state.NBA.error,
    loading: state.NBA.loading
  }
}

export default connect(mapStateToProps, actions)(NBAScores);
