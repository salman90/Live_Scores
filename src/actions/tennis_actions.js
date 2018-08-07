import axios from 'axios';


export const getTennisMatches = () => async dispatch => {
  const API_KEY = '67k8u62tudy9a3zbx83p3fa8'
  const date = '2018-08-07'
  const URL = `http://api.sportradar.us/tennis-t2/en/schedules/${date}/results.json?api_key=${API_KEY}`
  axios.get(URL)
   .then((res) => {
     console.log(res.data)
   })
}
