import $ from 'jquery';

import hint from '../hint';

const initState = {
  keyword: '',
  pageNow: 0,
  pageAll: 0,
  dataAll: [],
  result: []
};

const search = (state = initState, action) => {
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case 'CHANGE_SEARCH_PAGE':
      nextState.pageNow = action.payload;
      break;
    case 'CHANGE_SEARCH_KEYWORD':
      nextState.keyword = action.payload;
      break;
    case 'FETCH_SEARCH_LISTING_START':
      $('#Search')
        .append($('<div>')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      nextState.pageNow = 0;
      nextState.pageAll = 0;
      nextState.dataAll = [];
      break;
    case 'FETCH_SEARCH_LISTING_SUCCESS':
      nextState.dataAll = action.payload;
      $('#Search div.loader').remove();
      break;
    case 'FETCH_SEARCH_LISTING_ERROR':
      hint(action.payload);
      $('#Search div.loader').remove();
      break;
    default:
      return state;
  }
  nextState.result = [];
  let temp = nextState.pageNow * 10;
  for (let i = temp; i < temp + 10 && i < nextState.dataAll.length; i++) {
    nextState.result.push(nextState.dataAll[i]);
  }
  return nextState;
};

export default search;
