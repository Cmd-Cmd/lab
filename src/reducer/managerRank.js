import $ from 'jquery';

import hint from '../hint';

const initState = {
  filter: '',
  ranks: [],
  allRanks: []
};

const managerRank = (state = initState, action) => {
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case 'FETCH_GET_ALL_RANKS_START':
      $('#ManagerRank')
        .append($('<div>')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      break;
    case 'FETCH_GET_ALL_RANKS_SUCCESS':
      nextState.allRanks = action.payload;
      $('#ManagerRank div.loader').remove();
      break;
    case 'FETCH_GET_ALL_RANKS_ERROR':
      hint(action.payload);
      $('#ManagerRank div.loader').remove();
      break;
    case 'CHANGE_RANK_FILTER':
      nextState.filter = action.payload;
      break;
    case 'FETCH_UPDATE_RANK_START':
      $('#ManagerRank')
        .append($('<div>')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      break;
    case 'FETCH_UPDATE_RANK_SUCCESS':
      hint('修改权限成功');
      $('#ManagerRank div.loader').remove();
      break;
    case 'FETCH_UPDATE_RANK_ERROR':
      hint(action.payload);
      $('#ManagerRank div.loader').remove();
      break;
    default:
      return state;
  }
  nextState.ranks = [];
  const keys = nextState.filter.trim().toLowerCase().split(' ');
  for (let i = 0; i < nextState.allRanks.length; i++) {
    const tempName = nextState.allRanks[i].name;
    const tempID = nextState.allRanks[i].ID;
    let flag = false;
    for (let j = 0; j < keys.length; j++) {
      if (tempName.toLowerCase().indexOf(keys[j]) !== -1 ||
          tempID.toLowerCase().indexOf(keys[j]) !== -1) {
        flag = true;
        break;
      }
    }
    if (flag) {
      nextState.ranks.push(nextState.allRanks[i]);
    }
  }
  return nextState;
};

export default managerRank;
