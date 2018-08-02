import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import * as actions from '../actions';
import { connect }  from 'react-redux';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import moment from 'moment';


const {height, width} = Dimensions.get('window')

class NBAMatchDetails extends Component {
  state = {
    showHomeTeam: false,
    showAwayTeam: false,
    tableHead: ['Name', 'points', 'assits', 'blocks'],
    tableData: [],
  }

  componentDidMount(){
    this.setState({
      showHomeTeam: true,
      tableData: this.props.homeTeam
    })
  }
  renderHomeTeamInfo(){
    this.setState({
      showHomeTeam: true,
                  })
  }

  renderAwayTeamInfo(){
    // console.log('in away team ')
    this.setState({
      showHomeTeam: false,
    })
  }

  render(){
    const {gameData} = this.props
    const gameDate =  gameData.scheduled
    const status = gameData.status
    const awayTeamName = gameData.away.name
    let awayTeamScore = gameData.away_points
    const homeTeamName = gameData.home.name
    let homeTeamScore = gameData.home_points
    const stadium = gameData.venue.name
    const awayTeam = this.props.gameData.away.name
    const homeTeam = this.props.gameData.home.name

    if(status === 'closed'){
      return (
        <View
         style={{ flex: 1, marginTop: 10}}
         >
         <View
          style={{ flex: 1 }}
         >
         <View
          style={{ alignItems: 'center', justifyContent: 'center'}}
         >
           <Text>{moment(gameDate).format('LLL')}</Text>
         </View>
           <View
            style={{ width: width * 0.98, justifyContent: 'space-between', flexDirection: 'row' }}
           >
              <View
               style={{flexDirection: 'row', justifyContent: 'space-around' }}
              >
                <Text>{awayTeamName}</Text>
                <Text
                 style={{marginLeft: 10}}
                >{awayTeamScore}</Text>
              </View>

              <View
              style={{flexDirection: 'row' }}
              >
              <Text
               style={{marginRight: 10}}
              >{homeTeamScore}</Text>
              <Text>{homeTeamName}</Text>
              </View>
           </View>
         </View>
          <View
           style={{ flex: 1,  justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}
          >
          <View>
              <Button
               title={awayTeam}
               onPress={this.renderHomeTeamInfo.bind(this)}
              />
          </View>
           <View>
              <Button
              title={homeTeam}
              onPress={this.renderAwayTeamInfo.bind(this)}
              />
            </View>
          </View>
          <View
           style={styles.container}
          >
          <ScrollView
          >

           {
              this.state.showHomeTeam?
              <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
                <Rows data={this.props.homeTeam} textStyle={styles.text}/>
              </Table>
              :
              <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
                <Rows data={this.props.awayTeam} textStyle={styles.text}/>
              </Table>
           }
          </ScrollView>
          </View>
        </View>
      )
    }else if (status == 'scheduled'){

      return  (
        <View
         style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}
        >
          <View
          >
            <Text>{moment(gameDate).format('LLL')}</Text>
          </View>
          <View
          style={{ flexDirection: 'row',
          width: width * 0.95,
          justifyContent: 'space-between'
        }}
          >
             <View
              style={{ flexDirection: 'row'}}
             >
              <Text>{awayTeamName}</Text>
              <Text
               style={{ marginLeft: 8}}
              >{awayTeamScore}</Text>
            </View>
            <View
             style={{ flexDirection: 'row'}}
            >
              <Text
               style={{ marginRight: 8 }}
              >{homeTeamScore}</Text>
              <Text>{homeTeamName}</Text>
           </View>
          </View>
          <View
           style={{ alignItems: 'center', justifyContent: 'center'}}
          >
           <Text>{stadium}</Text>
          </View>
        </View>
      )
    }else if (status == 'inprogress') {
      return (
        <View />
      )
    }
  }
}

const styles = StyleSheet.create({
  container: { flex: 3, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
});

const mapStateToProps = state => {
  return {
    homeTeam: state.NBA.homeTeam,
    awayTeam: state.NBA.awayTeam,
    gameData: state.NBA.gameData
  }
}

export default connect(mapStateToProps, actions)(NBAMatchDetails);
