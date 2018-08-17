import React, { Component } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableWithoutFeedback,
  Animated,
  Alert, Image, StyleSheet } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import DateScroller from '../components/dateScroller';
import { connect } from 'react-redux';
import * as actions from '../actions';
import moment from 'moment';
import axios from 'axios';



class BassBallScores extends Component {
  constructor(props) {
    super(props);
    this.renderMatchDetail = this.renderMatchDetail.bind(this)
    this.clearError = this.clearError.bind(this)
    this.state = {
      animatedValue: new Animated.Value(0)
    }
}

  static navigationOptions = ({ navigation }) => {

    return {
      drawerIcon: (
        <Icon
         type='ionicon'
         name='ios-stopwatch'
         size={25}
        />
      ),
      title: 'Live Scores',
      headerStyle: {
            backgroundColor: '#fff',
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


  componentDidMount(){
    const date = moment().format('YYYY/MM/DD')
    this.props.getTodaysMatches(date)
    this.props.navigation.setParams({ SignOut: this._signUserOut });
  }

  _signUserOut = () => {
    Alert.alert(
      'SignOut',
      'Are You Sure That You Want To Sign Out',
      [
        {text: 'Yes', onPress: () =>  this.props.signUserOut(() =>{
          this.props.navigation.navigate('auth')
        })},
        {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
      ]
    )
  };

  renderMatchDetail = (game) => () => {
    this.props.getMachInfo(game, () => {
      this.props.navigation.navigate('MatchDetailsBassball')
    })
  }

  renderAnimation = (gameStatus) => {
    const { bassballGames } = this.props
    if(gameStatus == 'inprogress'){
      Animated.timing(this.state.animatedValue, {
        toValue: 1,
        duration: 3350
      }).start()
    }

  }

  renderLiveMatches() {
    const { bassballGames } = this.props
    bassballGames.sort(function(a,b){
      const keyA = new Date(a.game.scheduled)
      const keyB = new Date(b.game.scheduled)
      if(keyA < keyB) return -1;
      if(keyA > keyB) return 1;
      return 0
    })

    return bassballGames.map((game, i) => {
      const homeTeamName = game.game.home.name
      const awayTeamName = game.game.away.name
      const homeTeamScore = game.game.home.runs
      const awayTeamScore = game.game.away.runs
      const gameStatus =  game.game.status
      console.log(gameStatus)
      const gameDate = game.game.scheduled
      const gameDateFormat = moment(gameDate).format("hh:mm a")

      const opacity = {
         opacity: this.state.animatednValue
      }
      return (

        <TouchableWithoutFeedback
          key={i}
          onPress={this.renderMatchDetail(game)}
        >
          <View
          key={i}
          style={styles.matchListContainerStyle}
          >
            {this.renderAnimation(gameStatus)}
            <Card
             title={'MLB'}
             titleStyle={styles.cardTitleStyle}
             containerStyle={styles.cardStyle}
            >
            <View>
              {gameStatus == 'scheduled' ? <Text>{gameDateFormat}</Text> : null}
              {gameStatus == 'inprogress'?
              <Animated.View style={styles.liveMatchLight}></Animated.View>: null}
              {gameStatus == 'closed' || gameStatus == 'complete' ? <Text>FT</Text>: null}
              {gameStatus =='wdelay'? <Text>Delay</Text>: null}
            </View>

              <View
               style={styles.teamsContainer}
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
              style={styles.teamsContainer}
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
          </View>
        </TouchableWithoutFeedback>
      )
    })
  }

  clearError(){
    this.props.clearError()
  }

  renderError = () => {
    const {error} = this.props
    if(error){
      Alert.alert(
        'Error',
        'something went wrong',
        [
          {text: 'OK', onPress: this.clearError},
        ]
      )
    }
  }
  render(){
    if(this.props.loading){
       return(
         <View
          style={styles.containerStyle}
         >
           <ActivityIndicator
             size="large"
             color="#000"
           />
         </View>
       )
     }
     if(this.props.bassballGames.length === 0){
       return(
         <View
          style={{ flex: 1 }}
         >
         {this.renderError()}
         <View>
           <DateScroller />
         </View>
         <View
          style={styles.containerStyle}
         >
           <Image
             style={styles.imageStyle}
             source={require('../images/logo.jpg')}
           />
            <Text>No Matches</Text>

          </View>
         </View>
       )
     }
    return(
      <View
      style={styles.mainScreenContainerStyle}
      >
        <DateScroller />
        <ScrollView
        contentContainerStyle={styles.scrollViewStyle}
        >
         {this.renderLiveMatches()}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#ab372b'
  },
  imageStyle: {
     width: 250,
     height: 150
  },
  mainScreenContainerStyle: {
    flex: 1,
    backgroundColor: '#ab372b',
  },
  scrollViewStyle: {
     marginBottom: 20,
     paddingVertical: 25,
  },
  matchListContainerStyle: {
    flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      marginTop: 20,
    marginBottom: 20,
  },
  cardTitleStyle: {
     color: '#000'
  },
  cardStyle: {
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 2,
  },
  liveMatchLight: {
    width: 10,
    height: 10,
    borderRadius: 10/2,
    backgroundColor: 'green',
  },
  teamsContainer: {
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
})


const mapStateToProps =  state => {
  return {
    bassballGames: state.bassball.bassballGames,
    loading: state.bassball.loading,
    error: state.bassball.error,
  }
}

export default connect(mapStateToProps, actions)(BassBallScores);
