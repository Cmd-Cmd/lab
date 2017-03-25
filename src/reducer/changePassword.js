import hint from '../hint';

const initState = {
  asyncTimes: 0,
  password: false,
  question: false,
  logout: false
};

const changePassword = (state = initState, action) => {
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case 'FETCH_CHANGEPW_START':
      nextState.asyncTimes++;
      nextState.password = true;
      break;
    case 'FETCH_CHANGEPW_SUCCESS':
      nextState.asyncTimes--;
      nextState.password = action.payload;
      break;
    case 'FETCH_CHANGEPW_ERROR':
      nextState.asyncTimes--;
      nextState.password = action.payload;
      break;
    case 'FETCH_CHANGEQA_START':
      nextState.asyncTimes++;
      nextState.question = true;
      break;
    case 'FETCH_CHANGEQA_SUCCESS':
      nextState.asyncTimes--;
      nextState.question = action.payload;
      break;
    case 'FETCH_CHANGEQA_ERROR':
      nextState.asyncTimes--;
      nextState.question = action.payload;
      break;
    case 'LOGOUT':
      nextState.logout = false;
      return nextState;
    default:
      return state;
  }
  if (nextState.asyncTimes === 0) {
    let words = '';
    if ((typeof nextState.password).toLowerCase() !== 'boolean') {
      words += nextState.password + '\n';
      nextState.password = false;
    }
    if ((typeof nextState.question).toLowerCase() !== 'boolean') {
      words += nextState.question + '\n';
      nextState.question = false;
    }
    words += '请重新登录!';
    nextState.logout = true;
    hint(words);
  }
  return nextState;
};

export default changePassword;
