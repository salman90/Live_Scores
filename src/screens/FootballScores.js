import React, { Component } from 'react';
import { View, Text, ScrollView , TouchableHighlight, ActivityIndicator, Alert, Image } from 'react-native';
import { Button, List, ListItem, Card, Icon  } from 'react-native-elements';
import DateScroller from '../components/dateScroller';
import { connect } from 'react-redux';
import * as actions from '../actions';
import moment from 'moment'
import DateScrollerForFootball from '../components/dateScrollerForFootball'



class FootballScores extends Component {
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
  componentDidMount(){
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
          this.props.navigation.navigate('auth')
        })},
      ]
    )
  };


  renderFootballDetails(game){
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
      const homeTeamName =  homtTeamInfo.name
      const awayTeamInfo  = game.competitors[1]
      const awayTeamName = awayTeamInfo.name
      const matchTime = game.scheduled
      const matchStatus = game.status
      console.log(matchStatus)
      const tournamentName = game.tournament.name
      const matchTimeNewFormat = moment(matchTime).format('LLL')
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
                   {matchStatus == 'closed' || matchStatus == 'ended' ? <Text>FT</Text>: null}
                   {matchStatus == 'not_started' ? <Text>{matchTimeNewFormat}</Text>: null}
                   {matchStatus == 'live'?
                   <View
                   style={{ width: 10, height: 10, borderRadius: 10/2, backgroundColor: 'green'}}
                   ></View>: null}
                     {matchStatus =='wdelay'? <Text>Delay</Text>: null}
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
                   </Text>
                 </View>
               </Card>
               </TouchableHighlight>
             </View>
       )

    })
    //   const awayTeamName =  game.awayTeam.name
    //   const homeTeamName = game.homeTeam.name
    //   const awayTeamScore = game.matchStatus.away_score
    //   const homeTeamScore = game.matchStatus.home_score
    //   const tournamentName = game.tournamentInfo.name
    //   const matchStatus = game.matchStatus.status
    //   const matchTime = game.matchTime
    //   const matchTimeNewFormat = moment(matchTime).format('LLL')
    //
    //   return (
    //     <View
    //     key={i}
    //     style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', marginTop: 20}}
    //     >
    //     <TouchableHighlight
    //      onPress={this.renderFootballDetails.bind(this, game)}
    //     >
    //       <Card
    //       title={tournamentName}
    //       >
    //        <View>
    //           {matchStatus == 'closed' ? <Text>FT</Text>: null}
    //           {matchStatus == 'scheduled' ? <Text>{matchTimeNewFormat}</Text>: null}
    //           {matchStatus == 'inprogress'?
    //           <View
    //           style={{ width: 10, height: 10, borderRadius: 10/2, backgroundColor: 'green'}}
    //           ></View>: null}
    //             {matchStatus =='wdelay'? <Text>Delay</Text>: null}
    //        </View>
    //         <View
    //          style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}
    //         >
    //           <Text
    //            style={{fontSize: 15, fontWeight: 'bold'}}
    //           >
    //             {awayTeamName}
    //           </Text>
    //           <Text
    //           style={{fontSize: 15, fontWeight: 'bold'}}
    //           >
    //             {awayTeamScore}
    //           </Text>
    //         </View>
    //         <View
    //         style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10  }}
    //         >
    //           <Text
    //           style={{fontSize: 15, fontWeight: 'bold'}}
    //           >
    //             {homeTeamName}
    //           </Text>
    //           <Text
    //           style={{fontSize: 15, fontWeight: 'bold'}}
    //           >
    //             {homeTeamScore}
    //           </Text>
    //         </View>
    //       </Card>
    //       </TouchableHighlight>
    //     </View>
    //   )
    // })
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
          {text: 'OK', onPress: this.clearError.bind(this)},
        ]
      )
    }
  }

  render(){
    if(this.props.loading){
      return (
        <View
         style={{alignItems: 'center', justifyContent: 'center', flex: 1}}
        >
          <ActivityIndicator
          size="large"
          color="#0000ff"
          />
        </View>
      )
    }
    if(this.props.footballGames.length === 0){
      return (
        <View
         style={{flex: 1, backgroundColor: '#ab372b'}}
        >
        <View>
            <DateScrollerForFootball
            />
        </View>
          <View
           style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}
          >
          {this.renderError()}
            <Image
             style={{ width: 250, height: 150}}
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
       {this.renderError()}

       <DateScrollerForFootball
       />
       <ScrollView
       contentContainerStyle={{ marginBottom: 20, paddingVertical: 25 }}
       >
        {this.renderFootBallGames()}
       </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    footballGames: state.football.footballGames,
    loading: state.football.loading,
    error: state.football.error,
  }
}



export default connect(mapStateToProps, actions)(FootballScores);
