import React, { Component } from 'react';
import { View,
  Text,
  FlatList,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
  StyleSheet,
TouchableHighlight,

} from 'react-native';
import moment from 'moment'
import { connect } from 'react-redux'
import * as actions from '../actions'
import _ from 'lodash';


const {height, width} = Dimensions.get('window');

class DateScrollerForNBA extends Component {
  state = {
    dates: [],
    indexes: []
  }


  componentWillMount() {
    const { dates } = this.state
    let oneDayBefore = moment().add(-1, 'days')
    let twoDaysBefore = moment().add(-2, 'days')
    let TodaysDate = moment()
    let oneDaysAfter = moment().add(1, 'days')
    let twoDaysAfter = moment().add(2, 'days')
    dates.push(twoDaysBefore,oneDayBefore,TodaysDate, oneDaysAfter,twoDaysAfter)
  }

  handelDatePress(date){
    const newDate = moment(date).format('YYYY-MM-DD')
    // console.log(newDate)
    this.props.getTodaysMatchesForFootball(newDate)

  }

  renderDates = () => {


    return this.state.dates.map((date, i) => {
      // console.log(date)
      const newFormat = moment(date).format('LL')
      return(
        <TouchableHighlight
         onPress={this.handelDatePress.bind(this, date, i)}
         underlayColor={'green'}
         hasTVPreferredFocus={true}
         key={i}
        >
        <View
         key={i}
         style={{ alignItems: 'center',flexDirection: 'row', width: 70, height: 50, marginTop: 5, justifyContent: 'center', marginLeft: 5}}
        >

            <Text
            >{newFormat}</Text>
        </View>
        </TouchableHighlight>
      )

    })
  }
  render(){
    return (
      <View

      >
        <ScrollView
        horizontal={true}
        >
         <View
          style={{ width: width, marginTop : 5, flexDirection: 'row', height: 50, borderBottomWidth: 1, borderColor: '#000', backgroundColor: 'gray' }}
         >
         {this.renderDates()}
         </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  listDone: {
    backgroundColor: 'blue',
  },
  list: {
    backgroundColor: 'red',
  },
})

export default connect(null, actions)(DateScrollerForNBA);
