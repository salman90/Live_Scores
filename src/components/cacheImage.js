import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import SHA1 from "crypto-js/sha1";
import { FileSystem } from 'expo';
import _ from 'lodash';

const BASE_DIR = `${FileSystem.cacheDirectory}expo-image-cache/`;

class CacheImage extends Component {

  state = {
    source: null
  }


  async componentDidMount(){
    const { uri } = this.props
    const filename = uri.substring(uri.lastIndexOf("/"), uri.indexOf("?") === -1 ? uri.length : uri.indexOf("?"));
    const ext = filename.indexOf(".") === -1 ? ".jpg" : filename.substring(filename.lastIndexOf("."));
    const path = `${BASE_DIR}${SHA1(uri)}${ext}`;
    const tmpPath = `${BASE_DIR}${SHA1(uri)}-${_.uniqueId()}${ext}`;
    const info = await FileSystem.getInfoAsync(path);
    console.log(tmpPath)
    console.log(path)
    console.log(info)
    const {exists} = info;
    console.log(exists)
    if(exists){
      console.log(exists)
      this.setState({
      source: {
        uri: path
       }
      })
     return;
    }
    console.log('download image')
    await FileSystem.downloadAsync(uri, tmpPath);
    await FileSystem.moveAsync({ from: tmpPath, to: path });
    // this.setState({
    //    source: {
    //      uri: path
    //    }
    //  });
    // console.log(uri)
  }
  render(){
    return (
      <Image
        source={this.state.source}
        style={this.props.style}
      />
    )
  }
}

export default CacheImage
