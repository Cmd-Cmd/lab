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

const reducer = combineReducers({
  login,
  navTab,
  carousel,
  listView,
  listing,
  essay,
  search,
  tabling,
  system
});

export default reducer;
