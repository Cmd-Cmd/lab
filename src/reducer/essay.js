import {hashHistory} from 'react-router';

import hint from '../hint';

const initState = {
  title: '',
  meta: '',
  content: ''
};

const essay = (state = initState, action) => {
  let nextState = Object.assign({}, state);
  const memberName = 'Member_Name';
  const content = 'Content_1';
  switch (action.type) {
    case 'FETCH_GETNEWS_START':
    case 'FETCH_GETNOTICE_START':
    case 'FETCH_GETTODAY_START':
      nextState = initState;
      nextState.content = '<div class="loader"><div class="loader-inner ';
      nextState.content += 'square-spin"><div></div></div></div>';
      break;
    case 'FETCH_GETNEWS_SUCCESS':
    case 'FETCH_GETNOTICE_SUCCESS':
    case 'FETCH_GETTODAY_SUCCESS':
      nextState.title = action.payload.Title;
      nextState.meta = `发布人: ${action.payload[memberName]}`;
      nextState.meta += ` | 发布时间: ${action.payload.DateTime}`;
      nextState.meta += ` | 点击量: ${action.payload.Hits}`;
      nextState.content = action.payload[content];
      break;
    case 'FETCH_GETNEWS_ERROR':
    case 'FETCH_GETNOTICE_ERROR':
    case 'FETCH_GETTODAY_ERROR':
      hint(action.payload);
      hashHistory.replace('/notFound');
      break;
    default:
      return state;
  }
  return nextState;
};

export default essay;
