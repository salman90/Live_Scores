import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  TouchableHighlight } from 'react-native';
import { Button } from 'react-native-elements';
import * as actions from '../actions';
import { connect }  from 'react-redux';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import moment from 'moment';
import { Icon } from 'react-native-elements';


const {height, width} = Dimensions.get('window')

class NBAMatchDetails extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (<Icon type='font-awesome' name='arrow-circle-left' size={25}
  containerStyle={{ paddingLeft: 15 }} color='#000' onPress={() => navigation.goBack()} />),
    }
  }
  state = {
    showHomeTeam: false,
    showAwayTeam: false,
    tableHead: ['Name', 'points', 'assits', 'blocks'],
    tableData: [],
  }

  componentDidMount(){
    this.setState({
      tableData: this.props.homeTeam
    })
  }
  renderHomeTeamInfo(){
    this.setState({
      showHomeTeam: true,
      showAwayTeam: false,
                  })
  }



  renderAwayTeamInfo(){
    this.setState({
      showHomeTeam: false,
      showAwayTeam: true,
    })



  }

  renderCloseModale = () => {
    this.setState({
      showHomeTeam: false,
      showAwayTeam: false,
    })
  }

  renderModal = () => {
    return (
      <Modal
         animationType="slide"
         transparent={false}
         visible={this.state.showHomeTeam}
      >

        <View
         style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}
        >
        <View
          style={{width: width * 0.95 , height: height * 0.80}}>
          <ScrollView>
            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
             <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
             <Rows data={this.props.homeTeam} textStyle={styles.text}/>
           </Table>
          </ScrollView>
         </View>
         <View
         >
           <Button
            title='close Box Scores'
            onPress={this.renderCloseModale}
            buttonStyle={{ marginTop: 1, borderRadius: 8, width: 200}}
           />
         </View>
        </View>
      </Modal>
    )
  }

  renderHomeTeamModal = () => {
    return (
      <Modal
         animationType="slide"
         transparent={false}
         visible={this.state.showAwayTeam}
      >
        <View
         style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <View
            style={{width: width * 0.95 , height: height * 0.80}}>
            <ScrollView>
                 <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                   <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
                   <Rows data={this.props.awayTeam} textStyle={styles.text}/>
                 </Table>
            </ScrollView>
          </View>
          <View>
              <Button
               title='close Box Scores'
               onPress={this.renderCloseModale}
               buttonStyle={{ marginTop: 10, borderRadius: 8, width: 200}}
              />
          </View>
        </View>
      </Modal>
    )

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
    const awayTeamAlis = this.props.gameData.away.alias
    const homeTeamAlis = this.props.gameData.home.alias

    if(status === 'closed'){
      return (
        <View
         style={{
           flex: 1,
           alignItems: 'center',
           justifyContent: 'center',
           backgroundColor: '#ab372b',
         }}
         >
           <View
            style={{ backgroundColor: '#fff', width: width * 0.98, height: 300, alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}
           >
           {this.renderModal()}
           {this.renderHomeTeamModal()}
             <View
             style={{ alignItems: 'center', justifyContent: 'center'}}
             >
               <Text
               style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 10 }}
               >
                 NBA
               </Text>
               <Text>
               {moment(gameDate).format('LLL')}
               </Text>
            </View>
            <View
             style={{ flexDirection: 'row', width: width * 0.90 , marginTop: 20, alignItems: 'center', justifyContent: 'space-around'}}
            >
              <View
               style={{flexDirection: 'row', justifyContent: 'space-between', width: 100 }}
              >
                  <Text
                  selectable={true}
                  numberOfLines={1}
                  style={{ fontSize: 20, letterSpacing: 2, fontWeight: 'bold' }}
                  >{awayTeamAlis}</Text>
                 <Text
                 style={{
                   fontWeight: 'bold',
                   fontSize: 20,
                  marginRight: 15
                 }}
                 >{awayTeamScore}</Text>
             </View>
             <View
             style={{flexDirection: 'row', justifyContent: 'space-between', width: 100 }}
             >
              <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
               marginRight: 15
              }}
               >
               {homeTeamScore}
               </Text>
               <Text
               selectable={true}
               numberOfLines={1}
               style={{ fontSize: 20, letterSpacing: 2, fontWeight: 'bold' }}
               >
               {homeTeamAlis}
               </Text>
             </View>
            </View>

            <View
             style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10}}
            >
              <Text
               style={{ fontSize: 20, letterSpacing: 2, }}
              >Box scores</Text>
            </View>
            <View
              style={{ flexDirection: 'row', width: width * 0.90, marginTop: 20, alignItems: 'center', justifyContent: 'space-around'}}
            >
                  <Button
                    buttonStyle={{ borderRadius: 8, backgroundColor: '#33A8FF' }}
                    title={awayTeamAlis}
                    onPress={this.renderAwayTeamInfo.bind(this)}
                   />
                   <Button
                   buttonStyle={{ borderRadius: 8, backgroundColor: '#33A8FF' }}
                    title={homeTeamAlis}
                    onPress={this.renderHomeTeamInfo.bind(this)}
                />
            </View>

          </View>
        </View>
      )
    }else {

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
