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
  articles: [],
  title: ''
};

const managerArticle = (state = initState, action) => {
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case 'CHANGE_MANAGER_ARTICLE_TIME':
      if (action.payload.type === 'start') {
        nextState.startTime = action.payload.time;
      }
      if (action.payload.type === 'end') {
        nextState.endTime = action.payload.time;
      }
      break;
    case 'CHANGE_MANAGER_ARTICLE_TITLE':
      nextState.title = action.payload;
      break;
    case 'FETCH_GET_ARTICLE_START':
      $('#ManagerArticle')
        .append($('<div>')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      break;
    case 'FETCH_GET_ARTICLE_SUCCESS':
      nextState.articles = action.payload;
      $('#ManagerArticle div.loader').remove();
      break;
    case 'FETCH_GET_ARTICLE_ERROR':
      hint(action.payload);
      $('#ManagerArticle div.loader').remove();
      break;
    case 'FETCH_DELETE_ARTICLE_START':
      $('#ManagerArticle')
        .append($('<div>')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      break;
    case 'FETCH_DELETE_ARTICLE_SUCCESS':
      hint('删除成功');
      let tempArr = [];
      for (let i = 0; i < nextState.articles.length; i++) {
        if (nextState.articles[i].ArticleID !== action.payload) {
          tempArr.push(nextState.articles[i]);
        }
      }
      nextState.articles = tempArr;
      $('#ManagerArticle div.loader').remove();
      break;
    case 'FETCH_DELETE_ARTICLE_ERROR':
      hint(action.payload);
      $('#ManagerArticle div.loader').remove();
      break;
    default:
      return state;
  }
  return nextState;
};

export default managerArticle;
