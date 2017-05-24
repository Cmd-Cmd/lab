import $ from 'jquery';

import hint from '../hint';

function formatNowDate(delta = 0, noDay = false) {
  let temp = new Date();
  temp.setTime(temp.getTime() + 86400000 * delta);
  const year = temp.getFullYear();
  const month = temp.getMonth() + 1;
  const day = temp.getDate();
  return noDay ? `${year}-${month}` : `${year}-${month}-${day}`;
}

const initState = {
  'last_time': '',
  state: '',
  startTime: formatNowDate(-7),
  endTime: formatNowDate(),
  hourMonth: formatNowDate(0, true),
  records: [],
  hours: []
};

const checkInfo = (state = initState, action) => {
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case 'FETCH_GET_CHECK_INFO_START':
      $('#checkInfoForm')
        .append($('<div>')
        .css('margin-left', '-1rem')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      break;
    case 'FETCH_GET_CHECK_INFO_SUCCESS':
      nextState = Object.assign(nextState, action.payload);
      $('#checkInfoForm div.loader').remove();
      break;
    case 'FETCH_GET_CHECK_INFO_ERROR':
      hint(action.payload);
      $('#checkInfoForm div.loader').remove();
      break;
    case 'CHANGE_CHECK_INFO_TIME':
      if (action.payload.type === 'start') {
        nextState.startTime = action.payload.time;
      } else if (action.payload.type === 'end') {
        nextState.endTime = action.payload.time;
      } else if (action.payload.type === 'month') {
        nextState.hourMonth = action.payload.time;
      }
      break;
    case 'FETCH_GET_CHECK_INFO_MINE_START':
      nextState.records = [];
      $('#checkInfoForm')
        .append($('<div>')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      break;
    case 'FETCH_GET_CHECK_INFO_MINE_SUCCESS':
      nextState.records = action.payload;
      $('#checkInfoForm div.loader').remove();
      break;
    case 'FETCH_GET_CHECK_INFO_MINE_ERROR':
      hint(action.payload);
      $('#checkInfoForm div.loader').remove();
      break;
    case 'FETCH_GET_MAN_HOURS_START':
      nextState.hours = [];
      $('#checkInfoForm')
        .append($('<div>')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      break;
    case 'FETCH_GET_MAN_HOURS_SUCCESS':
      nextState.hours = action.payload;
      $('#checkInfoForm div.loader').remove();
      break;
    case 'FETCH_GET_MAN_HOURS_ERROR':
      hint(action.payload);
      $('#checkInfoForm div.loader').remove();
      break;
    default:
      return state;
  }
  return nextState;
};

export default checkInfo;
