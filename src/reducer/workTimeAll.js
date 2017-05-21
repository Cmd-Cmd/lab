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
  endTime: findWeek(false),
  tempModalData: []
};

for (let i = 1; i <= 7; i++) {
  for (let j = 1; j <= 10; j++) {
    initState['' + i + j] = [];
  }
}

const workTimeAll = (state = initState, action) => {
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case 'WORKTIME_ALL_CHANGE':
      const sevenDay = 86400000 * 7 * (action.payload ? -1 : 1);
      nextState.startTime.setTime(nextState.startTime.getTime() + sevenDay);
      nextState.endTime.setTime(nextState.endTime.getTime() + sevenDay);
      break;
    case 'FETCH_GET_WORKTIME_ALL_START':
      $('#workTimeAllGrid')
        .append($('<div>')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      break;
    case 'FETCH_GET_WORKTIME_ALL_SUCCESS':
      for (let i = 1; i <= 7; i++) {
        for (let j = 1; j <= 10; j++) {
          nextState['' + i + j] = [];
        }
      }
      const timeType = 'time_type';
      const timeId = 'time_id';
      for (let i = 0 ; i < action.payload.length; i++) {
        const temp = action.payload[i][timeType];
        nextState[temp].push({
          timeId: action.payload[i][timeId],
          name: action.payload[i].name
        });
      }
      $('#workTimeAllGrid div.loader').remove();
      break;
    case 'FETCH_GET_WORKTIME_ALL_ERROR':
      hint(action.payload);
      $('#workTimeAllGrid div.loader').remove();
      break;
    case 'FETCH_GET_FREE_TIME_BY_TYPE_START':
      nextState.tempModalData = [];
      break;
    case 'FETCH_GET_FREE_TIME_BY_TYPE_SUCCESS':
      for (let i = 0; i < action.payload.length; i++) {
        nextState.tempModalData.push({
          id: action.payload[i].ID,
          name: action.payload[i].name,
          checked: false
        });
      }
      break;
    case 'FETCH_GET_FREE_TIME_BY_TYPE_ERROR':
      hint(action.payload);
      break;
    case 'WORKTIME_ALL_MODAL_CHANGE':
      for (let i = 0 ; i < nextState.tempModalData.length; i++) {
        if (nextState.tempModalData[i].id === action.payload) {
          const tempBool = nextState.tempModalData[i].checked;
          nextState.tempModalData[i].checked = !tempBool;
          break;
        }
      }
      break;
    case 'FETCH_WORKTIME_INSERT_START':
      $('#workTimeAllGrid')
        .append($('<div>')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      break;
    case 'FETCH_WORKTIME_INSERT_SUCCESS':
      $('#workTimeAllGrid div.loader').remove();
      break;
    case 'FETCH_WORKTIME_INSERT_ERROR':
      hint(action.payload);
      $('#workTimeAllGrid div.loader').remove();
      break;
    case 'FETCH_WORKTIME_DELETE_START':
      $('#workTimeAllGrid')
        .append($('<div>')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      break;
    case 'FETCH_WORKTIME_DELETE_SUCCESS':
      $('#workTimeAllGrid div.loader').remove();
      break;
    case 'FETCH_WORKTIME_DELETE_ERROR':
      hint(action.payload);
      $('#workTimeAllGrid div.loader').remove();
      break;
    case 'FETCH_WORKTIME_DELETE_DAY_START':
      $('#workTimeAllGrid')
        .append($('<div>')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      break;
    case 'FETCH_WORKTIME_DELETE_DAY_SUCCESS':
      $('#workTimeAllGrid div.loader').remove();
      break;
    case 'FETCH_WORKTIME_DELETE_DAY_ERROR':
      hint(action.payload);
      $('#workTimeAllGrid div.loader').remove();
      break;
    default:
      return state;
  }
  return nextState;
};

export default workTimeAll;
