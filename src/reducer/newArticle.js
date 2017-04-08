import $ from 'jquery';

import hint from '../hint';

const initState = {
  type: 'news',
  title: '',
  id: -1,
  content: '',
  hits: 0,
  text: ''
};

const newArticle = (state = initState, action) => {
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case 'CHANGE_ARTICLE_TYPE':
      nextState.type = action.payload;
      break;
    case 'CHANGE_ARTICLE_TITILE':
      nextState.title = action.payload;
      break;
    case 'CHANGE_ARTICLE_CONTENT':
      nextState.content = action.payload;
      break;
    case 'CHANGE_ARTICLE_HITS':
      nextState.hits = action.payload;
      break;
    case 'CHANGE_ARTICLE_ID':
      nextState.id = action.payload;
      break;
    case 'CHANGE_ARTICLE_TEXT':
      nextState.text = action.payload;
      break;
    case 'RESET_ARTICLE':
      return initState;
    case 'FETCH_PUBLISH_ARTICLE_START':
      $('#NewArticle')
        .append($('<div>')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      break;
    case 'FETCH_PUBLISH_ARTICLE_SUCCESS':
      hint('发布文章成功');
      $('#NewArticle div.loader').remove();
      break;
    case 'FETCH_PUBLISH_ARTICLE_ERROR':
      hint(action.payload);
      $('#NewArticle div.loader').remove();
      break;
    default:
      return state;
  }
  return nextState;
};

export default newArticle;
