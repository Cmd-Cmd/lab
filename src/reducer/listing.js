import {newsData, noticeData} from './exampeData';

const initState = {
  name: '',
  english: '',
  pageNow: 0,
  pageAll: 0,
  listData: []
};

const listing = (state = initState, action) => {
  let tempData = [];
  let nextState = Object.assign({}, state);
  nextState.listData = [];
  switch (action.type) {
    case 'ENTER_LISTING':
      nextState.pageNow = 0;
      nextState.english = action.payload;
      switch (action.payload) {
        case 'NEWS':
          nextState.name = '新闻';
          tempData = newsData;
          break;
        case 'NOTICE':
          nextState.name = '公告';
          tempData = noticeData;
          break;
        case 'TODAY':
          nextState.name = '今日';
          break;
        default:
          return state;
      }
      nextState.pageAll = Math.floor((tempData.length - 1) / 15);
      break;
    case 'CHANGE_PAGE':
      nextState.pageNow = action.payload;
      switch (state.english) {
        case 'NEWS':
          tempData = newsData;
          break;
        case 'NOTICE':
          tempData = noticeData;
          break;
        default:
          return state;
      }
      break;
    default:
      return state;
  }
  let temp = nextState.pageNow * 15;
  for (let i = temp; i < temp + 15 && i < tempData.length; i++) {
    nextState.listData.push(tempData[i]);
  }
  return nextState;
};

export default listing;
