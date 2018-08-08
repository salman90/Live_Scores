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

class DateScroller extends Component {
  state = {
    dates: [],
    indexes: [],
    liked: false,
    sss: 'ddd'
  }


  componentWillMount() {
    console.log(this.state.indexes)
    const { dates } = this.state
    let oneDayBefore = moment().add(-1, 'days')
    let twoDaysBefore = moment().add(-2, 'days')
    let TodaysDate = moment()
    let oneDaysAfter = moment().add(1, 'days')
    let twoDaysAfter = moment().add(2, 'days')
    dates.push(twoDaysBefore,oneDayBefore,TodaysDate, oneDaysAfter,twoDaysAfter)
  }

  handelDatePress(date, i){
    const newDate = moment(date).format('YYYY/MM/DD')
    console.log(i)
    // console.log(newDate)
    this.props.getTodaysMatches(newDate)



    // this.setState({sss: null});
  }

  renderDates = () => {
    // console.log(this.state.sss)
    // console.log(this.state.dates)
    // const sortedArray = _(this.state.dates).sort()
    // console.log(sortedArray)

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
         style={{ alignItems: 'center',flexDirection: 'row', width: 70, height: 50, justifyContent: 'center', marginLeft: 5 }}
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
          style={{ width: width,
            flexDirection: 'row',
            height: 50,
            borderBottomWidth: 2,
          borderTopWidth: 1 ,
          borderColor: '#000', backgroundColor: 'gray', borderColor: '#000' }}
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

export default connect(null, actions)(DateScroller);
