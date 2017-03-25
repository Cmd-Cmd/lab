import $ from 'jquery';

import hint from '../hint';

const initState = {
  drugsAll: [],
  pageNow: 0,
  pageAll: 0,
  drugs: []
};

const managerDrug = (state = initState, action) => {
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case 'FETCH_GETDRUG_START':
      $('#ManagerDrug')
        .append($('<div>')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      break;
    case 'FETCH_GETDRUG_SUCCESS':
      nextState.drugsAll = action.payload;
      nextState.pageNow = 0;
      nextState.pageAll = Math.floor((nextState.drugsAll.length - 1) / 15);
      $('#ManagerDrug div.loader').remove();
      break;
    case 'FETCH_GETDRUG_ERROR':
      hint(action.payload);
      $('#ManagerDrug div.loader').remove();
      break;
    case 'MANAGER_DRUG_PAGE_TO':
      nextState.pageNow = action.payload;
      break;
    case 'FETCH_MANAGERDELETEDRUG_START':
      $('#ManagerDrug')
        .append($('<div>')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      break;
    case 'FETCH_MANAGERDELETEDRUG_SUCCESS':
      hint('删除成功');
      nextState.drugsAll.splice(nextState.pageNow * 15 + action.payload, 1);
      $('#ManagerDrug div.loader').remove();
      break;
    case 'FETCH_MANAGERDELETEDRUG_ERROR':
      hint(action.payload);
      $('#ManagerDrug div.loader').remove();
      break;
    default:
      return state;
  }
  nextState.drugs = [];
  let temp = nextState.pageNow * 15;
  for (let i = temp; i < temp + 15 && i < nextState.drugsAll.length; i++) {
    nextState.drugs.push(nextState.drugsAll[i]);
  }
  return nextState;
};

export default managerDrug;
