const initState = {
  keyword: {},
  pageNow: 0,
  pageAll: 0,
  result: []
};

const example = [
  {
    type: 'news', id: '0', title: '新闻0 - 永远的蝴蝶',
    lead: '《永远的蝴蝶》是台湾著名作家陈启佑先生的一篇小小说。'
  },
  {
    type: 'news', id: '1', title: '新闻1 - 永远的蝴蝶',
    lead: '《永远的蝴蝶》是台湾著名作家陈启佑先生的一篇小小说。'
  },
  {
    type: 'news', id: '2', title: '新闻2 - 永远的蝴蝶',
    lead: '《永远的蝴蝶》是台湾著名作家陈启佑先生的一篇小小说。'
  },
  {
    type: 'news', id: '3', title: '新闻3 - 永远的蝴蝶',
    lead: '《永远的蝴蝶》是台湾著名作家陈启佑先生的一篇小小说。'
  },
  {
    type: 'notice', id: '0', title: '公告0 - 永远的蝴蝶',
    lead: '《永远的蝴蝶》是台湾著名作家陈启佑先生的一篇小小说。'
  },
  {
    type: 'notice', id: '1', title: '公告1 - 永远的蝴蝶',
    lead: '《永远的蝴蝶》是台湾著名作家陈启佑先生的一篇小小说。'
  },
  {
    type: 'notice', id: '2', title: '公告2 - 永远的蝴蝶',
    lead: '《永远的蝴蝶》是台湾著名作家陈启佑先生的一篇小小说。'
  },
  {
    type: 'notice', id: '3', title: '公告3 - 永远的蝴蝶',
    lead: '《永远的蝴蝶》是台湾著名作家陈启佑先生的一篇小小说。'
  },
  {
    type: 'today', id: '0', title: '今日0 - 永远的蝴蝶',
    lead: '《永远的蝴蝶》是台湾著名作家陈启佑先生的一篇小小说。'
  },
  {
    type: 'today', id: '1', title: '今日1 - 永远的蝴蝶',
    lead: '《永远的蝴蝶》是台湾著名作家陈启佑先生的一篇小小说。'
  },
  {
    type: 'today', id: '2', title: '今日2 - 永远的蝴蝶',
    lead: '《永远的蝴蝶》是台湾著名作家陈启佑先生的一篇小小说。'
  },
  {
    type: 'today', id: '3', title: '今日3 - 永远的蝴蝶',
    lead: '《永远的蝴蝶》是台湾著名作家陈启佑先生的一篇小小说。'
  }
];

const search = (state = initState, action) => {
  let nextState = Object.assign({}, state);
  nextState.result = [];
  switch (action.type) {
    case 'ENTER_SEARCH':
      nextState.pageNow = 0;
      nextState.pageAll = Math.floor((example.length - 1) / 10);
      break;
    case 'CHANGE_SEARCH_PAGE':
      nextState.pageNow = action.payload;
      break;
    default:
      return state;
  }
  let temp = nextState.pageNow * 10;
  for (let i = temp; i < temp + 10 && i < example.length; i++) {
    nextState.result.push(example[i]);
  }
  return nextState;
};

export default search;
