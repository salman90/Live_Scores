import React, { Component } from 'react';
import { View, Text, Dimensions , StyleSheet } from 'react-native';
import * as actions from '../actions';
import { connect } from 'react-redux';
import moment from 'moment';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

const {height, width} = Dimensions.get('window')


class BassballLiveMatchDetials extends Component {
  state = {
    tableHead: ['Team','1', '2', '3', '4', '5', '6', '7', '8', '9', 'R', 'H', 'E'],

  }
  componentDidMount(){

  }

  renderMatchDetails = () => {
    const {liveBassballMatchDetails, homeTeamScores, awayTeamScores  } = this.props
    const awayTeamInfo =  liveBassballMatchDetails.game.away
    const homeTeamInfo = liveBassballMatchDetails.game.home
    const stadiumName = liveBassballMatchDetails.game.venue.name
    const city = liveBassballMatchDetails.game.venue.market
    let matchTime = liveBassballMatchDetails.game.scheduled
    let matchTimeNewFormat = moment(matchTime).format('LLLL')
    // console.log(homeTeamScores)
    // console.log(awayTeamScores)
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
       flexDirection: 'column',
       backgroundColor: '#fff',
       height: 300,
       borderRadius: 8,
     }}
      >
        <View
         style={{ alignItems: 'center', justifyContent: 'center'}}
        >
          <Text
           style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 10 }}
          >
          MLB
          </Text>
        <Text>{matchTimeNewFormat}</Text>
        </View>
        <View
         style={{ flexDirection: 'row', width: width * 0.90, marginTop: 20, alignItems: 'center', justifyContent: 'space-around'}}
        >
         <View>
          <View
           style={{ flexDirection: 'row', justifyContent: 'space-between', width: 100}}
          >
          <View>
             <Text
              style={{ fontSize: 20, letterSpacing: 2, fontWeight: 'bold' }}
              selectable={true}
              numberOfLines={1}
             >
             {awayTeamInfo.name}
             </Text>
             <Text
              style={{ fontWeight: 'bold', marginLeft: 2, marginTop: 2 }}
             >{`(${awayTeamInfo.win} - ${awayTeamInfo.loss})`}</Text>
          </View>
           <Text
            style={{
               marginLeft: 15,
               fontWeight: 'bold',
               fontSize: 20,
              marginRight: 10
          }}
           >{awayTeamInfo.runs}
           </Text>
          </View>
        </View>
        <View>
          <View
           style={{ flexDirection: 'row', justifyContent: 'space-between', width: 100}}
          >
              <Text
              style={{
                marginRight: 15,
              fontWeight: 'bold',
              fontSize: 20,
             marginRight: 15
           }}
              >{homeTeamInfo.runs}</Text>
            <View>
              <Text
              selectable={true}
              numberOfLines={1}
              style={{ fontSize: 20, letterSpacing: 2, fontWeight: 'bold' }}
              >{homeTeamInfo.name}</Text>
              <Text
              style={{ fontWeight: 'bold', marginLeft: 2, marginTop: 2 }}
              >{`(${homeTeamInfo.win} - ${homeTeamInfo.loss})`}</Text>
            </View>
          </View>
        </View>
        </View>
        <View
         style={{ width: width * 0.98, height: 100, marginTop: 10}}
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

  render(){

    return(
      <View>
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
     liveBassballMatchDetails: state.bassball.liveBassballMatchDetails,
     homeTeamScores: state.bassball.homeTeamScores,
     awayTeamScores: state.bassball.awayTeamScores,
  }
}

export default connect(mapStateToProps, actions)(BassballLiveMatchDetials)