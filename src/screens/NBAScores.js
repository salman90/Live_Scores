import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableHighlight, ActivityIndicator, Alert, Image } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import DateScrollerForNBA from '../components/dateScrollerForNBA';
import { connect } from 'react-redux';
import * as actions from '../actions';
import moment from 'moment';


class NBAScores extends Component {
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
    // const date = moment().format('YYYY/MM/DD')
    const date = '2018/06/08'
    this.props.renderNBAMatches(date)
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

  onMatchPress(game){
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
        style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', marginTop: 20}}
        >
        <TouchableHighlight
         onPress={this.onMatchPress.bind(this, game)}
        >
          <Card
          title='NBA'
          >
            <View>
              {gameStatus == 'closed' || gameStatus == 'complete'? <Text>FT</Text>: null}
              {gameStatus == 'inprogress'?
              <View
               style={{ width: 10, height: 10, borderRadius: 10/2, backgroundColor: 'green'}}
              ></View>: null}
                {gameStatus =='wdelay'? <Text>Delay</Text>: null}
                {gameStatus == 'scheduled'? <Text>{gameTimeNewFormat}</Text>: null}
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
          style={{ flex:1, alignItems: 'center', justifyContent: 'center' }}
         >
         {this.renderError()}
            <Image
            style={{ width: 250, height: 150 }}
            source={require('../images/logo.jpg')}
            />
            <Text>No Matches</Text>
         </View>
        </View>
      )
    }
    return (
      <View
       style={{ flex: 1, backgroundColor: '#ab372b' }}
      >
      <DateScrollerForNBA />
      {this.renderError()}
       <ScrollView
       contentContainerStyle={{ marginBottom: 20, paddingVertical: 25 }}
       >
         {this.renderNBAGames()}
       </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    NBAGames: state.NBA.NBAGames,
    error: state.NBA.error,
    loading: state.NBA.loading
  }
}

export default connect(mapStateToProps, actions)(NBAScores);
