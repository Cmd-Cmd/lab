import {combineReducers} from 'redux';

import login from './login';
import navTab from './navTab';
import carousel from './carousel';
import listView from './listView';
import listing from './listing';
import essay from './essay';
import search from './search';
import tabling from './tabling';
import system from './system';
import changePassword from './changePassword';
import reset from './reset';

const reducer = combineReducers({
  login,
  navTab,
  carousel,
  listView,
  listing,
  essay,
  search,
  tabling,
  system,
  changePassword,
  reset
});

export default reducer;
