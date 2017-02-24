import {combineReducers} from 'redux';

import navTab from './navTab';
import carousel from './carousel';
import listView from './listView';
import listing from './listing';
import essay from './essay';
import search from './search';
import tabling from './tabling';

const reducer = combineReducers({
  navTab,
  carousel,
  listView,
  listing,
  essay,
  search,
  tabling
});

export default reducer;
