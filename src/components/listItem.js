import React from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import { CacheManager } from "react-native-expo-image-cache";
import moment from 'moment';


class ListItem extends React.PureComponent {
  componentDidMount(){
    const { item, pageName, navigation } = this.props
    const image = item.urlToImage
    const path = CacheManager.get(image).getPath();
  }
  render(){
    const { item, pageName, navigation } = this.props
    return (
      <TouchableHighlight
       onPress={() => navigation.navigate(pageName, item)}
      >
      <View
        style={{ flexDirection: 'row', borderBottomWidth: 2, borderTopColor: 'gray'}}
      >
        <View>
          <Image
            source={{ uri: item.urlToImage }}
            style={{ width: 100, height: 50, margin: 4 }}
          />
        </View>
        <View>
           <View>
              <Text
                numberOfLines={1}
                style={{ flex: 1, justifyContent: 'center'}}
              >
                {item.title.substr(0, 30)}...
              </Text>
           </View>
           <View>
             <Text
              style={{ fontSize: 10, color: 'gray'}}
              >{moment(item.publishedAt).format('LLL')}
            </Text>
           </View>
        </View>
      </View>
      </TouchableHighlight>
    )
  }
}

export default ListItem
