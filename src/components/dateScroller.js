import React, { Component } from 'react';
import { View,
  Text,
  FlatList,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
  StyleSheet,
TouchableHighlight,
Animated,

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
    sss: 'ddd',
    animatedValue: new Animated.Value(0)
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

  handelDatePress(date, i){
    // console.log('hello jjsjdj')
    const newDate = moment(date).format('YYYY/MM/DD')
    // console.log(i)
    // const newDate = 11222
    this.props.getTodaysMatches(newDate)

    this.startAnimation()
  }

  startAnimation = () => {
    // console.log('anannan')
    Animated.timing(this.state.animatedValue, {
          toValue: 1,
         duration: 30000
    }).start(() => {
      console.log('done')
    })
  }

  renderDates = () => {
    // console.log(this.state.dates)
    return this.state.dates.map((date, i) => {
      // console.log(date)
      const newFormat = moment(date).format('LL')
      // console.log(newFormat)
      const TextColor = {
      color: this.state.animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['#ff0000', '#000']
      })
    }
      return(
        <TouchableHighlight
         onPress={this.handelDatePress.bind(this, date, i)}
         underlayColor={'green'}
         hasTVPreferredFocus={true}
         key={i}
        >
        <Animated.View
         key={i}
         style={{ alignItems: 'center',flexDirection: 'row', width: 70, height: 50, justifyContent: 'center', marginLeft: 5 }}
        >

          <Animated.Text
          >{newFormat}</Animated.Text>
        </Animated.View>
        </TouchableHighlight>
      )

    })
  }
  render(){
    return (
      <View>
        <ScrollView
        horizontal={true}
        >
         <View
          style={{
            width: width,
            flexDirection: 'row',
            height: 50,
            borderBottomWidth: 4,
          borderColor: '#000', backgroundColor: 'gray', borderColor: '#000'
        }}
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
