import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import reducers from '../reducers';



const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(thunk),
  ),
)

export default store;
