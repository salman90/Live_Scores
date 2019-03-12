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
      title: 'Match Details',
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
            <Table borderStyle={{
              borderWidth: 2,
              borderColor: '#c8e1ff',
               // backgroundColor: ''
            }}>
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
    let homeTeamDetails = this.props.homeTeam
    // console.log(homeTeamDetails, 'home team details')
    // console.log(homeTeam, 'home team')
    // console.log(gameData)
    // console.log(gameData)
    const gameDate =  gameData.scheduled
    const status = gameData.status
    // console.log(status, 'game status')
    // console.log(status)
    const awayTeamName = gameData.away.name
    let awayTeamScore = gameData.away_points
    // console.log(awayTeamScore, 'away team score')
    const homeTeamName = gameData.home.name
    let homeTeamScore = gameData.home_points
    // console.log(homeTeamScore)
    const stadium = gameData.venue.name
    const awayTeam = this.props.gameData.away.name
    const homeTeam = this.props.gameData.home.name
    const awayTeamAlis = this.props.gameData.away.alias
    const homeTeamAlis = this.props.gameData.home.alias
    const city =  gameData.venue.city
    // const homeTeamNameAndScore = `${homeTeamAlis} ${homeTeamScore}`
    let gameTime = gameData.scheduled
    let gameTimeNewFormat = moment(gameData.scheduled).format('LLL')
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
    }else if(status === 'scheduled'){
      return (
        <View
         style={{
           flex: 1, alignItems: 'center', justifyContent: 'center',
           backgroundColor: '#ab372b',
         }}
        >
         <View
          style={{
            width: width - 20,
            height: 300,
            backgroundColor: '#fff',
            borderRadius: 8,
          }}
         >
          <View
           style={{
             flex: 1,
           }}
          >
          <View
           style={{
             flex: 1,
             alignItems: 'center',
             justifyContent: 'center',
             // backgroundColor: 'blue'
           }}
          >
          <Text
           style={{
             fontWeight: 'bold',
           }}
          >NBA</Text>
          </View>
          <View
           style={{
             alignItems: 'center',
             justifyContent: 'flex-start',
             marginLeft: 4,
             flex: 1,
           }}
          >
            <Text
             style={{
               fontWeight: 'bold',
             }}
            >{gameTimeNewFormat}</Text>
           </View>
          </View>
          <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}
          >
           <View
            style={{
              flex: 1,
              // backgroundColor: 'yellow',
              justifyContent: 'center'
            }}
           >
           <View
            style={{
              alignItems: 'center'
            }}
           >
             <Text
              style={{
                fontWeight: 'bold',
                marginBottom: 4,
              }}
             >
              Home
             </Text>
            </View>
            <Text
            style={{
              marginLeft: 3,
              fontWeight: 'bold'
            }}
            >{homeTeamName}</Text>
           </View>
           <View
            style={{
              flex:1,
              // backgroundColor: 'red'
              justifyContent: 'center',
              flexDirection: 'column'

            }}
           >
           <View
            style={{
              alignItems: 'center',
              marginBottom: 4,
            }}
           >
             <Text
              style={{
                fontWeight: 'bold'
              }}
             >
              Away
             </Text>
           </View>
           <Text
           style={{
             marginRight: 3,
             fontWeight: 'bold'
           }}
           numberOfLines={1}
           adjustsFontSizeToFit={true}
           >
            {awayTeamName}
           </Text>
           </View>

          </View>
          <View
           style={{
             flex: 1,
             flexDirection: 'column'
           }}
          >
           <View
            style={{
              alignItems: 'center',
            }}
           >
            <Text
             style={{
               fontWeight: 'bold',
             }}
            >stadium</Text>
           </View>
           <View
            style={{
              alignItems: 'center',
              marginTop: 2,
            }}
           >
            <Text
             adjustsFontSizeToFit={true}
             numberOfLines={1}
             style={{
               fontWeight: 'bold',
             }}
            >
             {stadium}
            </Text>
           </View>
           <View
            style={{
              alignItems: 'center',
            }}
           >
            <Text
            adjustsFontSizeToFit={true}
            numberOfLines={1}
            style={{
              fontWeight: 'bold',
              marginTop: 5
            }}
            >City</Text>
           </View>
           <View
            style={{
              alignItems: 'center',
              marginTop: 5,
            }}
           >
            <Text
             adjustsFontSizeToFit
             numberOfLines={1}
             style={{
               fontWeight: 'bold'
             }}
            >
             {city}
            </Text>
           </View>
          </View>
         </View>
        </View>
      )
    }else if(status === 'inprogress'){
      // const homeTeamAlisAndScore = `${this.props.gameData.home.alias} `
      let awayScore = this.props.teamScores.awayTeamScore
      let homeScore = this.props.teamScores.awayTeamScore
      // console.log(awayScore, 'awayScore')
      // console.log(homeScore, 'homeScore')
      let homeTeamAlisAndScore = `${homeTeamAlis} ${homeScore}`
      // console.log(homeTeamAlisAndScore, 'homeTeamScore')
      let awayTeamAlisAndScore = `${awayScore} ${awayTeamAlis}`
      // console.log(awayTeamAlisAndScore, 'awayTeamScore')
      return (
        <View
         style={{
           flex: 1, alignItems: 'center', justifyContent: 'center',
           backgroundColor: '#ab372b',
         }}
        >
         <View
          style={{
            width: width - 20,
            height: 300,
            backgroundColor: '#fff',
            borderRadius: 8,
          }}
         >
          <View
           style={{
             flex: 1,
           }}
          >
          <View
           style={{
             flex: 1,
             alignItems: 'center',
             justifyContent: 'center',
             // backgroundColor: 'blue'
           }}
          >
          <Text
           style={{
             fontWeight: 'bold',
           }}
          >NBA</Text>
          </View>
          <View
           style={{
             alignItems: 'center',
             justifyContent: 'flex-start',
             marginLeft: 4,
             flex: 1,
           }}
          >
            <Text
             style={{
               fontWeight: 'bold',
             }}
            >{gameTimeNewFormat}</Text>
           </View>
          </View>
          <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          >
           <View
            style={{
              flex: 1,
              // backgroundColor: 'yellow',
              justifyContent: 'center',
              alignItems: 'center',
            }}
           >
           <View
            style={{
              alignItems: 'center'

            }}
           >
             <Text
              style={{
                fontWeight: 'bold',
                marginBottom: 4,
              }}
             >
              Home
             </Text>
            </View>
            <Text
            style={{
              marginLeft: 3,
              fontWeight: 'bold',
              fontSize: 18,
            }}
            >{homeTeamAlisAndScore}</Text>
           </View>
           <View
            style={{
              flex:1,
              // backgroundColor: 'red'
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center'
            }}
           >
           <View
            style={{
              alignItems: 'center',
              marginBottom: 4,
            }}
           >
             <Text
              style={{
                fontWeight: 'bold'
              }}
             >
              Away
             </Text>
           </View>
             <Text
             style={{
               marginRight: 3,
               fontWeight: 'bold',
               fontSize: 18,
             }}
             numberOfLines={1}
             adjustsFontSizeToFit={true}
             >
              {awayTeamAlisAndScore}
             </Text>
           </View>

          </View>
          <View
           style={{
             flex: 1,
             flexDirection: 'column'
           }}
          >
           <View
            style={{
              alignItems: 'center',
            }}
           >
            <Text
             style={{
               fontWeight: 'bold',
             }}
            >stadium</Text>
           </View>
           <View
            style={{
              alignItems: 'center',
              marginTop: 2,
            }}
           >
            <Text
             adjustsFontSizeToFit={true}
             numberOfLines={1}
             style={{
               fontWeight: 'bold',
             }}
            >
             {stadium}
            </Text>
           </View>
           <View
            style={{
              alignItems: 'center',
            }}
           >
            <Text
            adjustsFontSizeToFit={true}
            numberOfLines={1}
            style={{
              fontWeight: 'bold',
              marginTop: 5
            }}
            >City</Text>
           </View>
           <View
            style={{
              alignItems: 'center',
              marginTop: 5,
            }}
           >
            <Text
             adjustsFontSizeToFit
             numberOfLines={1}
             style={{
               fontWeight: 'bold'
             }}
            >
             {city}
            </Text>
           </View>
          </View>
         </View>
        </View>
      )
    }else{
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
  text: { margin: 6 },
});

const mapStateToProps = state => {
  return {
    homeTeam: state.NBA.homeTeam,
    awayTeam: state.NBA.awayTeam,
    gameData: state.NBA.gameData,
    teamScores: state.NBA.teamScores
  }
}

export default connect(mapStateToProps, actions)(NBAMatchDetails);
