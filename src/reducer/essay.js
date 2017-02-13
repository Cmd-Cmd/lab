import {browserHistory} from 'react-router';

const initState = {
  title: '',
  meta: '',
  content: 'Loading'
};

const example = {
  title: '永远的蝴蝶',
  meta: '陈启佑（台湾） | xx 年 xx 月',
  content: ''
};

const essay = (state = initState, action) => {
  let nextState;
  switch (action.type) {
    case 'GET_START':
      nextState = initState;
      break;
    case 'GET_FINISH':
      if (action.payload === '') {
        browserHistory.replace('/notFound');
        nextState = initState;
        break;
      }
      nextState = example;
      nextState.content = action.payload;
      break;
    default:
      return state;
  }
  return nextState;
};

export default essay;
