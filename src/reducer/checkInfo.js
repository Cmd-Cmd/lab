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
  'last_time': '',
  state: '',
  startTime: formatNowDate(-7),
  endTime: formatNowDate(),
  records: []
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
      }
      if (action.payload.type === 'end') {
        nextState.endTime = action.payload.time;
      }
      break;
    case 'FETCH_GET_CHECK_INFO_MINE_START':
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
    default:
      return state;
  }
  return nextState;
};

export default checkInfo;
