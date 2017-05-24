import $ from 'jquery';

import hint from '../hint';

import {todayData} from './exampleData';

const initState = {
  newsData: [],
  noticeData: [],
  todayData,
  todayTime: 0
};

const listView = (state = initState, action) => {
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case 'RESET_TABLEVIEW_TIME':
      nextState.todayTime = 0;
      break;
    case 'SET_TABLEVIEW_TIME':
      nextState.todayTime = action.payload;
      break;
    case 'FETCH_GET_NEWS_DATA_START':
      $('#ListViewNews')
        .append($('<div>')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      break;
    case 'FETCH_GET_NEWS_DATA_SUCCESS':
      nextState.newsData = action.payload.map((ele, inx) => ({
        id: ele.ArticleID,
        title: ele.Title
      }));
      $('#ListViewNews div.loader').remove();
      break;
    case 'FETCH_GET_NEWS_DATA_ERROR':
      hint(action.payload);
      $('#ListViewNews div.loader').remove();
      break;
    case 'FETCH_GET_NOTICE_DATA_START':
      $('#ListViewNotice')
        .append($('<div>')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      break;
    case 'FETCH_GET_NOTICE_DATA_SUCCESS':
      nextState.noticeData = action.payload.map((ele, inx) => ({
        id: ele.ArticleID,
        title: ele.Title
      }));
      $('#ListViewNotice div.loader').remove();
      break;
    case 'FETCH_GET_NOTICE_DATA_ERROR':
      hint(action.payload);
      $('#ListViewNotice div.loader').remove();
      break;
    default:
      return state;
  }
  return nextState;
};

export default listView;
