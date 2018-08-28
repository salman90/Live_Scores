import React, { Component } from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';
import moment from 'moment';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { Icon } from 'react-native-elements';



const {height, width} = Dimensions.get('window')


class MatchDetailsForBassball extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (<Icon type='font-awesome' name='arrow-circle-left' size={25}
  containerStyle={{ paddingLeft: 15 }} color='#000' onPress={() => navigation.goBack()} />),
    }
  }
  state = {
    tableHead: ['Team','1', '2', '3', '4', '5', '6', '7', '8', '9', 'R', 'H', 'E'],

  }

  renderMatchDetails() {
    const { bassballMatchDetails } = this.props
    const gameStatus = bassballMatchDetails.game.status

    const awayTeamInfo =  bassballMatchDetails.game.away
    const homeTeamInfo = bassballMatchDetails.game.home
    const stadiumName = bassballMatchDetails.game.venue.name
    const city = bassballMatchDetails.game.venue.market
    let matchTime = bassballMatchDetails.game.scheduled
    let matchTimeNewFormat = moment(matchTime).format('LLLL')
      console.log(gameStatus)
    if(gameStatus == 'scheduled') {
      return (
        <View
         style={styles.cardStyle}
        >
          <View
          style={styles.cardTitleContainerStyle}
          >
            <Text
            style={styles.cardTitleStyle}
            >
              MLB
            </Text>
            <Text>{matchTimeNewFormat}</Text>
          </View>
          <View
           style={styles.teamInfoContainer}
          >
           <View>
            <View
             style={styles.teamRowStyle}
            >
            <View>
             <Text
             style={styles.teamNameStyle}
             selectable={true}
             numberOfLines={1}
             >
             {awayTeamInfo.name}
             </Text>
             <Text
              style={styles.teamStatStyle}
             >
              {`(${awayTeamInfo.win} - ${awayTeamInfo.loss})`}
             </Text>
            </View>
             <Text
             style={styles.awayTeamScoreStyle}
             >
             {awayTeamInfo.runs}
             </Text>
            </View>
          </View>
          <View>
            <View
             style={styles.teamRowStyle}
            >
                <Text
                style={styles.homeTeamScoreStyle}
                >{homeTeamInfo.runs}</Text>
              <View>
                <Text
                selectable={true}
                numberOfLines={1}
                style={styles.teamNameStyle}
                >{homeTeamInfo.name}</Text>
                <Text
                style={styles.teamStatStyle}
                >{`(${homeTeamInfo.win} - ${homeTeamInfo.loss})`}</Text>
              </View>
            </View>
          </View>
          </View>
        <View
         style={styles.stadiumContainer}
        >
          <Text
           style={styles.staduimTitleStyle}
          >Stadium
          </Text>
          <Text
          style={styles.staduimNameStyle}
          >
          {stadiumName}</Text>
        </View>
      </View>
      )

    }else if(gameStatus == 'inprogress'){
      const {homeTeamScores, bassballMatchDetails, awayTeamScores } = this.props

      // console.log(this.props.homeTeamScores)
      // if(this.props.homeTeamScores.length)
       if(this.props.homeTeamScores.length === 5){
         awayTeamScores.splice(2, 0, '_')
         awayTeamScores.splice(3, 0, '_')
         awayTeamScores.splice(4, 0, '_')
         awayTeamScores.splice(5, 0, '_')
         awayTeamScores.splice(6, 0, '_')
         awayTeamScores.splice(7, 0, '_')
         awayTeamScores.splice(8, 0, '_')
         awayTeamScores.splice(9, 0, '_')
         homeTeamScores.splice(2, 0, '_')
         homeTeamScores.splice(3, 0, '_')
         homeTeamScores.splice(4, 0, '_')
         homeTeamScores.splice(5, 0, '_')
         homeTeamScores.splice(6, 0, '_')
         homeTeamScores.splice(7, 0, '_')
         homeTeamScores.splice(8, 0, '_')
         homeTeamScores.splice(9, 0, '_')

       } else if(this.props.homeTeamScores.length === 6){
         awayTeamScores.splice(3, 0, '_')
         awayTeamScores.splice(4, 0, '_')
         awayTeamScores.splice(5, 0, '_')
         awayTeamScores.splice(6, 0, '_')
         awayTeamScores.splice(7, 0, '_')
         awayTeamScores.splice(8, 0, '_')
         awayTeamScores.splice(9, 0, '_')

         homeTeamScores.splice(3, 0, '_')
         homeTeamScores.splice(4, 0, '_')
         homeTeamScores.splice(5, 0, '_')
         homeTeamScores.splice(6, 0, '_')
         homeTeamScores.splice(7, 0, '_')
         homeTeamScores.splice(8, 0, '_')
         homeTeamScores.splice(9, 0, '_')
       }else if (this.props.homeTeamScores.length === 7){

         awayTeamScores.splice(4, 0, '_')
         awayTeamScores.splice(5, 0, '_')
         awayTeamScores.splice(6, 0, '_')
         awayTeamScores.splice(7, 0, '_')
         awayTeamScores.splice(8, 0, '_')
         awayTeamScores.splice(9, 0, '_')

         homeTeamScores.splice(4, 0, '_')
         homeTeamScores.splice(5, 0, '_')
         homeTeamScores.splice(6, 0, '_')
         homeTeamScores.splice(7, 0, '_')
         homeTeamScores.splice(8, 0, '_')
         homeTeamScores.splice(9, 0, '_')
       }else if (this.props.homeTeamScores.length === 8){

         awayTeamScores.splice(5, 0, '_')
         awayTeamScores.splice(6, 0, '_')
         awayTeamScores.splice(7, 0, '_')
         awayTeamScores.splice(8, 0, '_')
         awayTeamScores.splice(9, 0, '_')

         homeTeamScores.splice(5, 0, '_')
         homeTeamScores.splice(6, 0, '_')
         homeTeamScores.splice(7, 0, '_')
         homeTeamScores.splice(8, 0, '_')
         homeTeamScores.splice(9, 0, '_')
       }else if (this.props.homeTeamScores.length === 9){
         awayTeamScores.splice(6, 0, '_')
         awayTeamScores.splice(7, 0, '_')
         awayTeamScores.splice(8, 0, '_')
         awayTeamScores.splice(9, 0, '_')

         homeTeamScores.splice(6, 0, '_')
         homeTeamScores.splice(7, 0, '_')
         homeTeamScores.splice(8, 0, '_')
         homeTeamScores.splice(9, 0, '_')
       }else if (this.props.homeTeamScores.length === 10){
         awayTeamScores.splice(7, 0, '_')
         awayTeamScores.splice(8, 0, '_')
         awayTeamScores.splice(9, 0, '_')

         homeTeamScores.splice(7, 0, '_')
         homeTeamScores.splice(8, 0, '_')
         homeTeamScores.splice(9, 0, '_')
       }else if (this.props.homeTeamScores.length === 11){
         awayTeamScores.splice(8, 0, '_')
         awayTeamScores.splice(9, 0, '_')

         homeTeamScores.splice(8, 0, '_')
         homeTeamScores.splice(9, 0, '_')
       }else if (this.props.homeTeamScores.length === 12){
         awayTeamScores.splice(9, 0, '_')

         homeTeamScores.splice(9, 0, '_')
       }

      return (
        <View
         style={styles.cardStyle}
        >
          <View
           style={styles.cardTitleContainerStyle}
          >
            <Text
             style={styles.cardTitleStyle}
            >
            MLB
            </Text>
          <Text>{matchTimeNewFormat}</Text>
          </View>
          <View
           style={styles.teamInfoContainer}
          >
           <View>
            <View
             style={styles.teamRowStyle}
            >
            <View>
               <Text
                style={styles.teamNameStyle}
                selectable={true}
                numberOfLines={1}
               >
               {awayTeamInfo.name}
               </Text>
               <Text
                style={styles.teamStatStyle}
               >{`(${awayTeamInfo.win} - ${awayTeamInfo.loss})`}</Text>
            </View>
             <Text
              style={styles.awayTeamScoreStyle}
             >{awayTeamInfo.runs}
             </Text>
            </View>
          </View>
          <View>
            <View
             style={styles.teamRowStyle}
            >
                <Text
                style={styles.homeTeamScoreStyle}
                >{homeTeamInfo.runs}</Text>
              <View>
                <Text
                selectable={true}
                numberOfLines={1}
                style={styles.teamNameStyle}
                >{homeTeamInfo.name}</Text>
                <Text
                style={styles.teamStatStyle}
                >{`(${homeTeamInfo.win} - ${homeTeamInfo.loss})`}</Text>
              </View>
            </View>
          </View>
          </View>
          <View
           style={styles.tableContainer}
          >
            <Table
              borderStyle={{borderWidth: 3, borderColor: '#c8e1ff'}}
            >
              <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text} />
              <Row data={this.props.awayTeamScores} />
              <Row data={this.props.homeTeamScores} />
            </Table>
          </View>
        </View>
      )

    }
    else if(gameStatus == 'closed') {
      return (
        <View
         style={styles.cardStyle}
        >
          <View
          style={styles.cardTitleContainerStyle}
          >
            <Text
            style={styles.cardTitleStyle}>
              MLB
            </Text>
            <Text>{matchTimeNewFormat}</Text>
          </View>
          <View
           style={styles.teamInfoContainer}
          >
           <View>
            <View
             style={styles.teamRowStyle}
            >
            <View>
             <Text
             style={styles.teamNameStyle}
             selectable={true}
             numberOfLines={1}
             >
             {awayTeamInfo.name}
             </Text>
             <Text
              style={styles.teamStatStyle}
             >
              {`(${awayTeamInfo.win} - ${awayTeamInfo.loss})`}
             </Text>
            </View>
             <Text
             style={styles.awayTeamScoreStyle}
             >{awayTeamInfo.runs}
             </Text>
            </View>
          </View>
          <View>
            <View
             style={styles.teamRowStyle}
            >
                <Text
                style={styles.homeTeamScoreStyle}
                >{homeTeamInfo.runs}</Text>
              <View>
                <Text
                selectable={true}
                numberOfLines={1}
                style={styles.teamNameStyle}
                >{homeTeamInfo.name}</Text>
                <Text
                style={styles.teamStatStyle}
                >{`(${homeTeamInfo.win} - ${homeTeamInfo.loss})`}</Text>
              </View>
            </View>
          </View>
          </View>
          <View
           style={styles.tableContainer}
          >
            <Table
              borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}
            >
              <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text} />
              <Row data={this.props.awayTeamScores} />
              <Row data={this.props.homeTeamScores} />
            </Table>
          </View>
        </View>
      )
  }else {
    return (
      <View
       style={styles.cardStyle}
      >
       <View
       >
        <Text>{matchTimeNewFormat}</Text>
       </View>

       <View
        style={styles.teamInfoContainer}
       >
         <View
         >
           <Text
            style={styles.teamNameStyle}
           >{awayTeamInfo.name}</Text>
           <Text
           style={styles.teamStatStyle}
           >{`(${awayTeamInfo.win} - ${awayTeamInfo.loss})`}</Text>
         </View>

         <View>
           <Text
           style={styles.teamNameStyle}
           >{homeTeamInfo.name}</Text>
           <Text
            style={styles.teamStatStyle}
           >{`(${homeTeamInfo.win} - ${homeTeamInfo.loss})`}</Text>
         </View>
      </View>
      <View
       style={styles.stadiumContainer}
      >
        <Text
         style={styles.staduimTitleStyle}
        >Stadium</Text>
        <Text
         style={styles.staduimNameStyle}
        >{stadiumName}</Text>
      </View>
      <View
       style={styles.cityContainer}
      >
        <Text
        style={styles.staduimTitleStyle}
        >City</Text>
        <Text
        style={styles.staduimNameStyle}
        >{city}</Text>
      </View>
    </View>
    )
  }
}

  render(){

    return (
      <View
       style={styles.matchDetailsContainer}
      >
      {this.renderMatchDetails()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },
  matchDetailsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ab372b'
  },
  cardStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    flexDirection: 'column',
    backgroundColor: '#fff',
    height: 300,
    borderRadius: 8,
  },
  cardTitleContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardTitleStyle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10
  },
  teamInfoContainer: {
    flexDirection: 'row',
    width: width * 0.90,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  teamRowStyle:{
    flexDirection: 'row',
    justifyContent:
    'space-between',
    width: 150,
  },
  homeTeamScoreStyle: {
    marginRight: 15,
    fontWeight: 'bold',
    fontSize: 20,
   marginRight: 15,
 },
 awayTeamScoreStyle: {
   marginRight: 15,
   fontWeight: 'bold',
   fontSize: 20,
  marginLeft: 15,
},
 teamNameStyle: {
   fontSize: 20,
   letterSpacing: 2,
   fontWeight: 'bold'
 },
 teamStatStyle: {
   fontWeight: 'bold',
   marginLeft: 2,
   marginTop: 2
 },
 tableContainer: {
   width: width * 0.98,
   height: 100,
   marginTop: 10,
 },
 stadiumContainer: {
   alignItems: 'center',
   justifyContent: 'center',
   marginTop: 10
 },
 cityContainer:{
   alignItems: 'center',
   justifyContent: 'center'
 },
 staduimTitleStyle: {
   fontSize: 15,
   fontWeight: 'bold',
   letterSpacing: 2
 },
  staduimNameStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginTop: 2
  },
})



const mapStateToProps = state => {
  return {
    bassballMatchDetails: state.bassball.bassballMatchDetails,
    homeTeamScores: state.bassball.homeTeamScores,
    awayTeamScores: state.bassball.awayTeamScores
  }
}

export default connect(mapStateToProps, actions)(MatchDetailsForBassball);
