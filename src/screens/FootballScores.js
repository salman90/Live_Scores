import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView ,
  TouchableHighlight,
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet } from 'react-native';
import { Button, List, ListItem, Card, Icon  } from 'react-native-elements';
import DateScroller from '../components/dateScroller';
import { connect } from 'react-redux';
import * as actions from '../actions';
import moment from 'moment';
import DateScrollerForFootball from '../components/dateScrollerForFootball'
// import { CacheManager } from "react-native-expo-image-cache";


class FootballScores extends Component {
  constructor(props) {
    super(props);
this.renderFootballDetails = this.renderFootballDetails.bind(this)
this.clearError = this.clearError.bind(this)
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
      )
    }
  }
  async componentDidMount(){
    // await CacheManager.clearCache();
    const TodaysDate = moment().format('YYYY-MM-DD')
    this.props.getTodaysMatchesForFootball(TodaysDate)
    this.props.navigation.setParams({ SignOut: this._signUserOut });
  }

  _signUserOut = () => {
    // this.props.signUserOut()
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


  renderFootballDetails = (game) => () => {
    this.props.getMatchDetails(game, () =>{
      this.props.navigation.navigate('MatchDetailsForFootball')
    })
  }

  renderFootBallGames() {
    const { footballGames } = this.props
    footballGames.sort(function(a,b){
      const keyA = new Date(a.scheduled)
      const keyB = new Date(b.scheduled)
      if(keyA < keyB) return -1;
      if(keyA > keyB) return 1;
      return 0
    })
    return footballGames.map((game, i) => {
      // console.log(game)
      const homtTeamInfo = game.competitors[0]
      // console.log(game, 'game')
      const homeTeamName =  homtTeamInfo.name
      const awayTeamInfo  = game.competitors[1]
      const awayTeamName = awayTeamInfo.name
      const matchTime = game.scheduled
      const matchStatus = game.status
      const matchCompleteStatus = game.sport_event_status

      const tournamentName = game.tournament.name
      const matchTimeNewFormat = moment(matchTime).format('LLL')
       return (
         <View
             key={i}
             style={styles.cardStyle}
             >
             <TouchableHighlight
              onPress={this.renderFootballDetails(game)}
             >
               <Card
               title={tournamentName}
               containerStyle={{
                 backgroundColor: '#fff',
                 borderColor: '#000',
                 borderWidth: 2,
                 borderRadius: 2,
               }}
               >
                <View>
                   {matchStatus == 'closed' || matchStatus == 'ended' ? <Text>FT</Text>: null}
                   {matchStatus == 'not_started' ? <Text>{matchTimeNewFormat}</Text>: null}
                   {matchStatus == 'live'?
                   <View
                   style={styles.greendotStyle}
                   ></View>: null}
                     {matchStatus =='wdelay'? <Text>Delay</Text>: null}
                </View>
                 <View
                  style={styles.teamContainer}
                 >
                   <Text
                    style={styles.teamNameFont}
                   >
                     {awayTeamName}
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
                 </View>
               </Card>
               </TouchableHighlight>
             </View>
       )

    })
  }

  clearError(){
    this.props.clearErrorInFootball()
  }

  renderError = () => {
    if(this.props.error){
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
      return (
        <View
         style={styles.mainContainerStyle}
        >
          <ActivityIndicator
          size="large"
          color="#000"
          />
        </View>
      )
    }
    if(this.props.footballGames.length === 0){
      return (
        <View
         style={styles.container}
        >
        <View>
            <DateScrollerForFootball
            />
        </View>
          <View
           style={styles.mainContainerStyle}
          >
          {this.renderError()}
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
      style={styles.container}
      >
       {this.renderError()}

       <DateScrollerForFootball
       />
       <ScrollView
       contentContainerStyle={styles.scrollViewStyle}
       >
        {this.renderFootBallGames()}
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
  mainContainerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ab372b',
  },
  imageStyle: {
    width: 250,
    height: 150
  },
  scrollViewStyle: {
    marginBottom: 20,
    paddingVertical: 25,
  },
  cardStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 20,
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
    fontWeight: 'bold',
  },
})

const mapStateToProps = state => {
  return {
    footballGames: state.football.footballGames,
    loading: state.football.loading,
    error: state.football.error,
  }
}



export default connect(mapStateToProps, actions)(FootballScores);
