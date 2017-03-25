import {hashHistory} from 'react-router';

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
    case 'FETCH_GETNEWS_START':
    case 'FETCH_GETNOTICE_START':
    case 'FETCH_GETTODAY_START':
      nextState = initState;
      break;
    case 'FETCH_GETNEWS_SUCCESS':
    case 'FETCH_GETNOTICE_SUCCESS':
    case 'FETCH_GETTODAY_SUCCESS':
      nextState = example;
      nextState.content = action.payload.cont;
      break;
    case 'FETCH_GETNEWS_ERROR':
    case 'FETCH_GETNOTICE_ERROR':
    case 'FETCH_GETTODAY_ERROR':
      nextState = initState;
      hashHistory.replace('/notFound');
      break;
    default:
      return state;
  }
  return nextState;
};

export default essay;
