const test = [
  {id: 0, title: 'Cmd'},
  {id: 1, title: 'Cmd'},
  {id: 2, title: 'Cmd'},
  {id: 3, title: 'Cmd'},
  {id: 4, title: 'Cmd'},
  {id: 5, title: 'Cmd'},
  {id: 6, title: 'Cmd'},
  {id: 7, title: 'Cmd'},
  {id: 8, title: 'Cmd'}
];

const test2 = [
  {id: '0', time: '8:00 - 9:30', room: 'B403', content: '化学实验'},
  {id: '1', time: '9:00 - 10:30', room: 'B405', content: '生物实验'},
  {id: '2', time: '12:00 - 13:30', room: 'B305', content: '生物实验'},
  {id: '3', time: '8:00 - 9:30', room: 'B403', content: '化学实验'},
  {id: '4', time: '9:00 - 10:30', room: 'B405', content: '生物实验'},
  {id: '5', time: '12:00 - 13:30', room: 'B305', content: '生物实验'},
  {id: '6', time: '8:00 - 9:30', room: 'B403', content: '化学实验'},
  {id: '7', time: '9:00 - 10:30', room: 'B405', content: '生物实验'},
  {id: '8', time: '12:00 - 13:30', room: 'B305', content: '生物实验'},
  {id: '9', time: '8:00 - 9:30', room: 'B403', content: '化学实验'},
  {id: '10', time: '9:00 - 10:30', room: 'B405', content: '生物实验'},
  {id: '11', time: '12:00 - 13:30', room: 'B305', content: '生物实验'},
  {id: '12', time: '8:00 - 9:30', room: 'B403', content: '化学实验'},
  {id: '13', time: '9:00 - 10:30', room: 'B405', content: '生物实验'},
  {id: '14', time: '12:00 - 13:30', room: 'B305', content: '生物实验'},
  {id: '15', time: '8:00 - 9:30', room: 'B403', content: '化学实验'},
  {id: '16', time: '9:00 - 10:30', room: 'B405', content: '生物实验'},
  {id: '17', time: '12:00 - 13:30', room: 'B305', content: '生物实验'}
];

const initState = {
  newsData: test,
  noticeData: test,
  todayData: test2,
  todayTime: 0
};

const listView = (state = initState, action) => {
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case 'RESET_TABLEVIEW_TIME':
      nextState.todayTime = 0;
      return nextState;
    case 'SET_TABLEVIEW_TIME':
      nextState.todayTime = action.payload;
      return nextState;
    default:
      return state;
  }
};

export default listView;
