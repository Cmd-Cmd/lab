import {todayData, todayData2} from './exampleData';

const initState = {
  data: todayData,
  time: 0
};

const tabling = (state = initState, action) => {
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case 'RESET_TABLING_TIME':
      nextState = initState;
      return nextState;
    case 'SET_TABLING_TIME':
      nextState.data = todayData2;
      nextState.time = action.payload;
      return nextState;
    default:
      return state;
  }
};

export default tabling;
