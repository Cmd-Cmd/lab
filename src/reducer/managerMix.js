import $ from 'jquery';

import hint from '../hint';

const initState = {
  mixsAll: [],
  pageNow: 0,
  pageAll: 0,
  mixs: []
};

const managerMix = (state = initState, action) => {
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case 'FETCH_GETMIX_START':
      $('#ManagerMix')
        .append($('<div>')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      break;
    case 'FETCH_GETMIX_SUCCESS':
      nextState.mixsAll = action.payload;
      nextState.pageNow = 0;
      nextState.pageAll = Math.floor((nextState.mixsAll.length - 1) / 15);
      $('#ManagerMix div.loader').remove();
      break;
    case 'FETCH_GETMIX_ERROR':
      hint(action.payload);
      $('#ManagerMix div.loader').remove();
      break;
    case 'FETCH_MANAGERDELETEMIX_START':
      $('#ManagerMix')
        .append($('<div>')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      break;
    case 'FETCH_MANAGERDELETEMIX_SUCCESS':
      hint('删除成功');
      nextState.mixsAll.splice(nextState.pageNow * 15 + action.payload, 1);
      $('#ManagerMix div.loader').remove();
      break;
    case 'FETCH_MANAGERDELETEMIX_ERROR':
      hint(action.payload);
      $('#ManagerMix div.loader').remove();
      break;
    case 'MANAGER_MIX_PAGE_TO':
      nextState.pageNow = action.payload;
      break;
    default:
      return state;
  }
  nextState.mixs = [];
  let temp = nextState.pageNow * 15;
  for (let i = temp; i < temp + 15 && i < nextState.mixsAll.length; i++) {
    nextState.mixs.push(nextState.mixsAll[i]);
  }
  return nextState;
};

export default managerMix;
