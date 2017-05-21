import $ from 'jquery';

import hint from '../hint';

function formatNowDate(delta = 0) {
  let temp = new Date();
  temp.setTime(temp.getTime() + 86400000 * delta);
  const year = temp.getFullYear();
  const month = temp.getMonth() + 1;
  const day = temp.getDate();
  return `${year}-${month}-${day}`;
}

const initState = {
  nameFilter: '',
  idFilter: '',
  startTime: formatNowDate(-7),
  endTime: formatNowDate(),
  recordAll: [],
  records: []
};

const checkSearch = (state = initState, action) => {
  let nextState = Object.assign({}, state);
  nextState.records = [];
  switch (action.type) {
    case 'CHANGE_CHECK_SEARCH_TIME':
      if (action.payload.type === 'start') {
        nextState.startTime = action.payload.time;
      }
      if (action.payload.type === 'end') {
        nextState.endTime = action.payload.time;
      }
      break;
    case 'FETCH_GET_CHECK_INFO_ALL_START':
      $('#checkSearchForm')
        .append($('<div>')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      break;
    case 'FETCH_GET_CHECK_INFO_ALL_SUCCESS':
      nextState.recordAll = action.payload;
      $('#checkSearchForm div.loader').remove();
      break;
    case 'FETCH_GET_CHECK_INFO_ALL_ERROR':
      hint(action.payload);
      $('#checkSearchForm div.loader').remove();
      break;
    case 'CHECK_SEARCH_FILTER':
      if (action.payload.key === 'name' || action.payload.key === 'id') {
        nextState[`${action.payload.key}Filter`] = action.payload.val;
      }
      break;
    default:
      return state;
  }
  const nameKeys = nextState.nameFilter.trim().toLowerCase().split(' ');
  const idKeys = nextState.idFilter.trim().toLowerCase().split(' ');
  for (let i = 0; i < nextState.recordAll.length; i++) {
    const tempName = nextState.recordAll[i].name;
    const tempID = nextState.recordAll[i].ID;
    let nameFlag = false;
    for (let j = 0; j < nameKeys.length; j++) {
      if (tempName.toLowerCase().indexOf(nameKeys[j]) !== -1) {
        nameFlag = true;
        break;
      }
    }
    let idFlag = false;
    for (let j = 0 ; j < idKeys.length; j++) {
      if (tempID.toLowerCase().indexOf(idKeys[j]) !== -1) {
        idFlag = true;
        break;
      }
    }
    if (nameFlag && idFlag) {
      nextState.records.push(nextState.recordAll[i]);
    }
  }
  return nextState;
};

export default checkSearch;
