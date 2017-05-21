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
import addDrug from './addDrug';
import drugDetail from './drugDetail';
import managerDrug from './managerDrug';
import drugInOut from './drugInOut';
import newUser from './newUser';
import managerUser from './managerUser';
import managerRank from './managerRank';
import addMix from './addMix';
import mixDetail from './mixDetail';
import managerMix from './managerMix';
import newArticle from './newArticle';
import managerArticle from './managerArticle';
import addDevice from './addDevice';
import managerDevice from './managerDevice';
import deviceDetail from './deviceDetail';
import checkInfo from './checkInfo';
import checkSearch from './checkSearch';
import freeTime from './freeTime';
import workTimeAll from './workTimeAll';
import workTimeMine from './workTimeMine';
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
  addDrug,
  drugDetail,
  managerDrug,
  drugInOut,
  newUser,
  managerUser,
  managerRank,
  addMix,
  mixDetail,
  managerMix,
  newArticle,
  managerArticle,
  addDevice,
  managerDevice,
  deviceDetail,
  checkInfo,
  checkSearch,
  freeTime,
  workTimeAll,
  workTimeMine,
  reset
});

export default reducer;
