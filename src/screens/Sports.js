import React, { Component} from 'react';
import {View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios';


class Sports extends Component {
  componentWillMount(){
    // const API_KEY = 'f654a5a963d34b4eba103c5948c43fd5'
    // const url = `https://newsapi.org/v2/everything?q=farah-najjar&?sources=al-jazeera-english&apiKey=${API_KEY}`
    // axios.get(url
    // ).then(res => {
    //   const articles = res.data.articles
    //   articles.map((article, i) => {
    //     console.log(article)
    //     // console.log(article.publishedAt)
    //   })
    // })
  }
  render(){
    return (
      <View
       style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}
      >
        <Button
         title='drowerNav'
         onPress={() => this.props.navigation.openDrawer()}
        />
      </View>
    )
  }
}

export default Sports;
