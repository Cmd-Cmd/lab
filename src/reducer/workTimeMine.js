import $ from 'jquery';

import hint from '../hint';

function findWeek(start = true) {
  let temp = new Date();
  if (start) {
    while (temp.getDay() !== 1) {
      temp.setTime(temp.getTime() + 86400000 * -1);
    }
  } else {
    while (temp.getDay() !== 0) {
      temp.setTime(temp.getTime() + 86400000 * 1);
    }
  }
  return temp;
}

let initState = {
  startTime: findWeek(),
  endTime: findWeek(false)
};

for (let i = 1; i <= 7; i++) {
  for (let j = 1; j <= 10; j++) {
    initState['' + i + j] = false;
  }
}

const workTimeMine = (state = initState, action) => {
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case 'WORKTIME_MINE_CHANGE':
      const sevenDay = 86400000 * 7 * (action.payload ? -1 : 1);
      nextState.startTime.setTime(nextState.startTime.getTime() + sevenDay);
      nextState.endTime.setTime(nextState.endTime.getTime() + sevenDay);
      break;
    case 'FETCH_GET_WORKTIME_MINE_START':
      $('#workTimeMineGrid')
        .append($('<div>')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      break;
    case 'FETCH_GET_WORKTIME_MINE_SUCCESS':
      for (let i = 1; i <= 7; i++) {
        for (let j = 1; j <= 10; j++) {
          nextState['' + i + j] = false;
        }
      }
      const timeType = 'time_type';
      for (let i = 0 ; i < action.payload.length; i++) {
        const temp = action.payload[i][timeType];
        nextState[temp] = true;
      }
      $('#workTimeMineGrid div.loader').remove();
      break;
    case 'FETCH_GET_WORKTIME_MINE_ERROR':
      hint(action.payload);
      $('#workTimeMineGrid div.loader').remove();
      break;
    default:
      return state;
  }
  return nextState;
};

export default workTimeMine;
