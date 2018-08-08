import React, { Component } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableWithoutFeedback,
  Animated, Alert, Image } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import DateScroller from '../components/dateScroller';
import { connect } from 'react-redux';
import * as actions from '../actions';
import moment from 'moment';
import axios from 'axios';
// import CacheImage from './components/cacheImages';



class BassBallScores extends Component {

  state = {
    animatedValue: new Animated.Value(0)

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
         )
    };
  }


  componentWillMount(){
    const date = moment().format('YYYY/MM/DD')
    this.props.getTodaysMatches(date)
  }

  renderMatchDetail(game) {
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
      const gameDate = game.game.scheduled
      const gameDateFormat = moment(gameDate).format("hh:mm a")
      // console.log(gameDateFormat)
      // console.log(gameDateFormat)
      const opacity = {
         opacity: this.state.animatednValue
      }
      return (

        <TouchableWithoutFeedback
          key={i}
          onPress={this.renderMatchDetail.bind(this, game)}
        >
          <View
          key={i}
          style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', marginTop: 20}}
          >
            {this.renderAnimation(gameStatus)}
            <Card
             title={'MLB'}
             titleStyle={{ color: '#000'}}
             containerStyle={{ backgroundColor: '#fff',
             borderColor: '#000', borderWidth: 2, borderRadius: 2  }}
            >
            <View>
              {gameStatus == 'scheduled' ? <Text>{gameDateFormat}</Text> : null}
              {gameStatus == 'inprogress'?
              <Animated.View style={[{
                width: 10,
                height: 10,
                borderRadius: 10/2,
                backgroundColor: 'green'}]}></Animated.View>: null}
              {gameStatus == 'closed' || gameStatus == 'complete' ? <Text>FT</Text>: null}
              {gameStatus =='wdelay'? <Text>Delay</Text>: null}
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
          {text: 'OK', onPress: this.clearError.bind(this)},
        ]
      )
    }
  }
  render(){
    // console.log(this.props.error)
     if(this.props.loading){
       return(
         <View
          style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
         >
           <ActivityIndicator
             size="large"
             color="#0000ff"
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
          style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor:  '#ab372b'}}
         >
           <Image
             style={{ width: 250, height: 150 }}
             source={require('../images/logo.jpg')}
           />
           <Text>No Matches</Text>

         </View>
         </View>
       )
     }
    return(
      <View
      style={{ flex: 1, backgroundColor: '#ab372b'}}
      >
        <DateScroller />
        <ScrollView
         style={{ flex: 1 }}
        >
         {this.renderLiveMatches()}
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps =  state => {
  return {
    bassballGames: state.bassball.bassballGames,
    loading: state.bassball.loading,
    error: state.bassball.error,
  }
}

export default connect(mapStateToProps, actions)(BassBallScores);
