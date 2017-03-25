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
  startTime: formatNowDate(-3),
  endTime: formatNowDate(),
  records: []
};

const drugInOut = (state = initState, action) => {
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case 'CHANGE_INOUT_TIME':
      if (action.payload.type === 'start') {
        nextState.startTime = action.payload.time;
      }
      if (action.payload.type === 'end') {
        nextState.endTime = action.payload.time;
      }
      break;
    case 'FETCH_GETDRUGINOUT_START':
      $('#DrugInOut')
        .append($('<div>')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      break;
    case 'FETCH_GETDRUGINOUT_SUCCESS':
      nextState.records = action.payload;
      $('#DrugInOut div.loader').remove();
      break;
    case 'FETCH_GETDRUGINOUT_ERROR':
      hint(action.payload);
      $('#DrugInOut div.loader').remove();
      break;
    default:
      return state;
  }
  return nextState;
};

export default drugInOut;
