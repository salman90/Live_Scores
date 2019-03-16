import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { CacheManager, Image } from "react-native-expo-image-cache";
import moment from 'moment';


class ListItem extends React.PureComponent {
  constructor(props) {
    super(props);
    // this.renderArticleDetails
  }
  async componentDidMount(){
    const { item, pageName, navigation } = this.props
    const image = item.urlToImage
    // console.log(image === , 'empty')
    // console.log(image, 'image')
    console.log(image)
    if(image === ""){
      console.log('no image')
    }else {
      try {
        const path =  await CacheManager.get(image).getPath();
      }catch(err) {
        // console.log(err, 'error')
       }
    }
  }
  render(){
    const { item, pageName, navigation } = this.props
    // console.log(item.urlToImage, 'url to image')
      const preview = { uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" };

    return (
      <TouchableHighlight
       onPress={() => navigation.navigate(pageName, item)}
      >
      <View
        style={{ flexDirection: 'row', borderBottomWidth: 2, borderTopColor: 'gray'}}
      >
        <View>
          <Image
            {...{preview, uri: item.urlToImage}}
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
