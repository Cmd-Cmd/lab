import $ from 'jquery';

import hint from '../hint';

const test2 = [
  {id: '0', time: '8:00 - 9:30', room: 'B403', content: '化学实验'},
  {id: '1', time: '9:00 - 10:30', room: 'B405', content: '生物实验'},
  {id: '2', time: '12:00 - 13:30', room: 'B305', content: '生物实验'},
  {id: '3', time: '8:00 - 9:30', room: 'B403', content: '化学实验'},
  {id: '4', time: '9:00 - 10:30', room: 'B405', content: '生物实验'},
  {id: '5', time: '12:00 - 13:30', room: 'B305', content: '生物实验'},
  {id: '6', time: '8:00 - 9:30', room: 'B403', content: '化学实验'},
  {id: '7', time: '9:00 - 10:30', room: 'B405', content: '生物实验'},
  {id: '8', time: '12:00 - 13:30', room: 'B305', content: '生物实验'},
  {id: '9', time: '8:00 - 9:30', room: 'B403', content: '化学实验'},
  {id: '10', time: '9:00 - 10:30', room: 'B405', content: '生物实验'},
  {id: '11', time: '12:00 - 13:30', room: 'B305', content: '生物实验'},
  {id: '12', time: '8:00 - 9:30', room: 'B403', content: '化学实验'},
  {id: '13', time: '9:00 - 10:30', room: 'B405', content: '生物实验'},
  {id: '14', time: '12:00 - 13:30', room: 'B305', content: '生物实验'},
  {id: '15', time: '8:00 - 9:30', room: 'B403', content: '化学实验'},
  {id: '16', time: '9:00 - 10:30', room: 'B405', content: '生物实验'},
  {id: '17', time: '12:00 - 13:30', room: 'B305', content: '生物实验'}
];

const initState = {
  newsData: [],
  noticeData: [],
  todayData: test2,
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
