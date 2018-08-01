import React, { Component } from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';
import moment from 'moment';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';



const {height, width} = Dimensions.get('window')


class MatchDetailsForBassball extends Component {
  state = {
    tableHead: ['Team','1', '2', '3', '4', '5', '6', '7', '8', '9', 'R', 'H', 'E'],

  }
  componentWillMount() {
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

    if(gameStatus == 'scheduled') {
      // console.log(homeTeamInfo.runs)
      // console.log(homeTeamInfo.away.scroring)
      return (
        <View
         style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10, flexDirection: 'column'}}
        >
         <View
         >
          <Text>{matchTimeNewFormat}</Text>
         </View>

         <View
          style={{ flexDirection: 'row', width: width * 0.90, marginTop: 20, alignItems: 'center', justifyContent: 'space-between' }}
         >
           <View
           >
             <Text>{awayTeamInfo.name}</Text>
             <Text>{`(${awayTeamInfo.win} - ${awayTeamInfo.loss})`}</Text>
           </View>

           <View>
             <Text>{homeTeamInfo.name}</Text>
             <Text>{`(${homeTeamInfo.win} - ${homeTeamInfo.loss})`}</Text>
           </View>
        </View>
        <View
         style={{alignItems: 'center', justifyContent: 'center'}}
        >
          <Text>Stadium</Text>
          <Text>{stadiumName}</Text>
        </View>
        <View
         style={{alignItems: 'center', justifyContent: 'center'}}
        >
          <Text>City</Text>
          <Text>{city}</Text>
        </View>
      </View>
      )

    }else if(gameStatus == 'inprogress'){
      const {homeTeamScores, bassballMatchDetails, awayTeamScores } = this.props
      console.log(bassballMatchDetails, 'bassball')
      console.log(homeTeamScores)
      console.log(this.props.homeTeamScores.length)

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
         ////////////
         homeTeamScores.splice(2, 0, '_')
         homeTeamScores.splice(3, 0, '_')
         homeTeamScores.splice(4, 0, '_')
         homeTeamScores.splice(5, 0, '_')
         homeTeamScores.splice(6, 0, '_')
         homeTeamScores.splice(7, 0, '_')
         homeTeamScores.splice(8, 0, '_')
         homeTeamScores.splice(9, 0, '_')
         // this.setState({ tableHead: ['Team', '1', 'R', 'H', 'E'] })
         // console.log(this.state.tableHead)
         // console.log(this.state.tableHead)
         // homeTeamScores.splice(1, 0, "lol")
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
         style={{
           alignItems: 'center',
         justifyContent: 'center',
         marginTop: 10,
         flexDirection: 'column'}}
        >
          <View>
          <Text>MLB</Text>
          <Text>{matchTimeNewFormat}</Text>
          </View>
          <View
           style={{ flexDirection: 'row', width: width * 0.90, marginTop: 20, alignItems: 'center', justifyContent: 'space-between'}}
          >
           <View>
            <View
             style={{ flexDirection: 'row', justifyContent: 'space-between', width: 100}}
            >
            <View>
             <Text>{awayTeamInfo.name}</Text>
             <Text>{`(${awayTeamInfo.win} - ${awayTeamInfo.loss})`}</Text>
            </View>
             <Text
              style={{ marginLeft: 15}}
             >{awayTeamInfo.runs}
             </Text>
            </View>
          </View>
          <View>
            <View
             style={{ flexDirection: 'row', justifyContent: 'space-between', width: 100}}
            >
                <Text
                >{homeTeamInfo.runs}</Text>
              <View>
                <Text>{homeTeamInfo.name}</Text>
                <Text>{`(${homeTeamInfo.win} - ${homeTeamInfo.loss})`}</Text>
              </View>
            </View>
          </View>
          </View>
          <View
           style={{ width: width * 0.98, height: 100, marginTop: 10}}
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

    }
    else if(gameStatus == 'closed') {
      return (
        <View
         style={{
           alignItems: 'center',
         justifyContent: 'center',
         marginTop: 10,
         flexDirection: 'column'}}
        >
          <View>
          <Text>MLB</Text>
          <Text>{matchTimeNewFormat}</Text>
          </View>
          <View
           style={{ flexDirection: 'row', width: width * 0.90, marginTop: 20, alignItems: 'center', justifyContent: 'space-between'}}
          >
           <View>
            <View
             style={{ flexDirection: 'row', justifyContent: 'space-between', width: 100}}
            >
            <View>
             <Text>{awayTeamInfo.name}</Text>
             <Text>{`(${awayTeamInfo.win} - ${awayTeamInfo.loss})`}</Text>
            </View>
             <Text
              style={{ marginLeft: 15}}
             >{awayTeamInfo.runs}
             </Text>
            </View>
          </View>
          <View>
            <View
             style={{ flexDirection: 'row', justifyContent: 'space-between', width: 100}}
            >
                <Text
                >{homeTeamInfo.runs}</Text>
              <View>
                <Text>{homeTeamInfo.name}</Text>
                <Text>{`(${homeTeamInfo.win} - ${homeTeamInfo.loss})`}</Text>
              </View>
            </View>
          </View>
          </View>
          <View
           style={{ width: width * 0.98, height: 100, marginTop: 10}}
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
  }
}

  render(){

    return (
      <View
       styles={{flex: 1}}
      >
      {this.renderMatchDetails()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
})

const mapStateToProps = state => {
  return {
    bassballMatchDetails: state.bassball.bassballMatchDetails,
    homeTeamScores: state.bassball.homeTeamScores,
    awayTeamScores: state.bassball.awayTeamScores
  }
}

export default connect(mapStateToProps, actions)(MatchDetailsForBassball);
