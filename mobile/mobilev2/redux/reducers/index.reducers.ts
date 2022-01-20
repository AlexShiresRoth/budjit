import { combineReducers } from 'redux';
import { accounts } from './accounts.reducers';
const rootReducer = combineReducers({
  accounts,
});

export default rootReducer;
