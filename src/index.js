import React, { Component } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import axios from 'axios'

const API_KEY = '8uevyeqyb38gms9t8qmbtj5w'

class App extends Component {
state = {
  games: []
}
async componentWillMount(){

const data = await axios.get('http://api.sportradar.us/mlb/trial/v6.5/en/games/2018/07/11/boxscore.json?api_key=8uevyeqyb38gms9t8qmbtj5w'
).then(res => {
 const games = res.data.league.games

 // games.map((game, i) => {
   this.setState({ games: games  })
   // const homeTeamName = game.game.home.name
   // const awayTeamName = game.game.away.name
   // const homeTeamScore = game.game.home.runs
   // const awayTeamScore = game.game.away.runs
   // const todayMatches = homeTeamName + ’ vs ' + awayTeamName + ” “+homeTeamScore + ' - ' + awayTeamScore
   // console.log(todayMatches)


 // })

})
// console.log(this.state.games)

}

renderLiveMatches() {
 const { games } = this.state
 return games.map((game, i) => {
   const homeTeamName = game.game.home.name
   const awayTeamName = game.game.away.name
   const homeTeamScore = game.game.home.runs
   const awayTeamScore = game.game.away.runs
   return (
     <View
     key={i}
      style={{ flex: 1}}
     >
      <Text>
        {awayTeamName}
      </Text>
      <Text>
        {homeTeamName}
      </Text>
     </View>
   )
 })
}

 render(){
   // console.log(this.state.games)
     if(this.state.games.length === 0) {
       return (
         <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}
         >
            <ActivityIndicator size="large" color="#0000ff" />
         </View>
       )

     }else {
       return (
         <View
          style={{ flex: 1}}
         >
          <ScrollView
           style={{ flex: 1 }}
          >
            {this.renderLiveMatches()}
          </ScrollView>
         </View>
       )
     }
 }
}



export default App;
