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
    case 'CHANGE_ARTICLE_DETAIL_TYPE':
      nextState.type = action.payload;
      break;
    case 'CHANGE_ARTICLE_DETAIL_TITILE':
      nextState.title = action.payload;
      break;
    case 'CHANGE_ARTICLE_DETAIL_CONTENT':
      nextState.content = action.payload;
      break;
    case 'CHANGE_ARTICLE_DETAIL_TEXT':
      nextState.text = action.payload;
      break;
    case 'CHANGE_ARTICLE_DETAIL_HITS':
      nextState.hits = action.payload;
      break;
    case 'CHANGE_ARTICLE_DETAIL_ID':
      nextState.id = action.payload;
      break;
    case 'RESET_ARTICLE_DETAIL':
      return initState;
    case 'FETCH_UPDATE_ARTICLE_START':
      $('#ArticleDetail')
        .append($('<div>')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      break;
    case 'FETCH_UPDATE_ARTICLE_SUCCESS':
      hint('修改文章成功');
      $('#ArticleDetail div.loader').remove();
      break;
    case 'FETCH_UPDATE_ARTICLE_ERROR':
      hint(action.payload);
      $('#ArticleDetail div.loader').remove();
      break;
    case 'FETCH_GET_ARTICLE_DETAIL_START':
      $('#ArticleDetail')
        .append($('<div>')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      break;
    case 'FETCH_GET_ARTICLE_DETAIL_SUCCESS':
      nextState.type = action.payload.type === '1' ? 'news' : 'notice';
      nextState.title = action.payload.Title;
      nextState.hits = action.payload.Hits;
      $('#ArticleDetail div.loader').remove();
      break;
    case 'FETCH_GET_ARTICLE_DETAIL_ERROR':
      hint(action.payload);
      $('#ArticleDetail div.loader').remove();
      break;
    default:
      return state;
  }
  return nextState;
};

export default newArticle;
