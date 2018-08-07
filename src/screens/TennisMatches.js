import React, {Component } from 'react'
import {View, Text } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';


class TennisMatches extends Component {
  componentDidMount() {
    this.props.getTennisMatches()
  }
  render(){
    return (
      <View>
        <Text></Text>
      </View>
    )
  }
}

export default connect(null, actions)(TennisMatches)
