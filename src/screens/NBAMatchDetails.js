import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import * as actions from '../actions';
import { connect }  from 'react-redux';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

class NBAMatchDetails extends Component {
  state = {
    showHomeTeam: false,
    showAwayTeam: false,
    tableHead: ['Name', 'points', 'assits', 'blocks'],
    tableData: []
  }

  componentDidMount(){
    this.setState({
      showHomeTeam: true,
      tableData: this.props.homeTeam
    })
    console.log(this.props.awayTeam)
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

  renderHomeTeam(){
    return (
      <Text>salman is here</Text>

    )
  }
  render(){
  const awayTeam = this.props.gameData.away.name
  const homeTeam = this.props.gameData.home.name
    return (
      <View
       style={{ flex: 1, marginTop: 10}}
       >
        <Button
          title='drower Nav'
          onPress={() => this.props.navigation.openDrawer()}
        />
        <View
         style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}
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
