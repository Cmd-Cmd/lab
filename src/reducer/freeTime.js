import $ from 'jquery';

import hint from '../hint';

let initState = {};

for (let i = 1; i <= 7; i++) {
  for (let j = 1; j <= 10; j++) {
    initState['' + i + j] = false;
  }
}

const freeTime = (state = initState, action) => {
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case 'FREE_TIME_CHANGE':
      nextState[action.payload] = !nextState[action.payload];
      break;
    case 'FETCH_GET_FREETIME_START':
      $('#freeTimeForm')
        .append($('<div>')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      break;
    case 'FETCH_GET_FREETIME_SUCCESS':
      const timeType = 'time_type';
      for (let i = 1; i <= 7; i++) {
        for (let j = 1; j <= 10; j++) {
          nextState['' + i + j] = false;
        }
      }
      for (let i = 0 ; i < action.payload.length; i++) {
        const temp = action.payload[i][timeType];
        nextState[temp] = true;
      }
      $('#freeTimeForm div.loader').remove();
      break;
    case 'FETCH_GET_FREETIME_ERROR':
      hint(action.payload);
      $('#freeTimeForm div.loader').remove();
      break;
    case 'FETCH_SAVE_FREETIME_START':
      $('#freeTimeForm')
        .append($('<div>')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      break;
    case 'FETCH_SAVE_FREETIME_SUCCESS':
      hint('空闲时间表已保存');
      $('#freeTimeForm div.loader').remove();
      break;
    case 'FETCH_SAVE_FREETIME_ERROR':
      hint(action.payload);
      $('#freeTimeForm div.loader').remove();
      break;
    default:
      return state;
  }
  return nextState;
};

export default freeTime;
