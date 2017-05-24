import $ from 'jquery';

import hint from '../hint';

const initState = {
  name: '',
  english: '',
  pageNow: 0,
  pageAll: 0,
  dataAll: [],
  listData: []
};

const listing = (state = initState, action) => {
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case 'ENTER_LISTING':
      nextState.english = action.payload;
      switch (action.payload) {
        case 'NEWS':
          nextState.name = '新闻';
          break;
        case 'NOTICE':
          nextState.name = '公告';
          break;
        default:
          return state;
      }
      break;
    case 'FETCH_GET_LISTING_START':
      $('#Listing')
        .append($('<div>')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      nextState.pageNow = 0;
      nextState.pageAll = 0;
      nextState.dataAll = [];
      break;
    case 'FETCH_GET_LISTING_SUCCESS':
      nextState.dataAll = action.payload;
      $('#Listing div.loader').remove();
      break;
    case 'FETCH_GET_LISTING_ERROR':
      hint(action.payload);
      $('#Listing div.loader').remove();
      break;
    case 'CHANGE_PAGE':
      nextState.pageNow = action.payload;
      break;
    default:
      return state;
  }
  nextState.listData = [];
  let temp = nextState.pageNow * 15;
  for (let i = temp; i < temp + 15 && i < nextState.dataAll.length; i++) {
    nextState.listData.push(nextState.dataAll[i]);
  }
  return nextState;
};

export default listing;
