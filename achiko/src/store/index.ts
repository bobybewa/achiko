import { createStore } from 'redux'
import reducer from './reducer/user'

const store = createStore(reducer)
export default store