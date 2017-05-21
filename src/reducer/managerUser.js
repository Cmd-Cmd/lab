import $ from 'jquery';

import hint from '../hint';

const initState = {
  filter: '',
  users: [],
  allUsers: []
};

const managerUser = (state = initState, action) => {
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case 'FETCH_GET_ALL_USERS_START':
      nextState.allUsers = [];
      $('#ManagerUser')
        .append($('<div>')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      break;
    case 'FETCH_GET_ALL_USERS_SUCCESS':
      nextState.allUsers = action.payload;
      $('#ManagerUser div.loader').remove();
      break;
    case 'FETCH_GET_ALL_USERS_ERROR':
      hint(action.payload);
      $('#ManagerUser div.loader').remove();
      break;
    case 'CHANGE_USER_FILTER':
      nextState.filter = action.payload;
      break;
    case 'FETCH_RESET_USER_START':
      $('#ManagerUser')
        .append($('<div>')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      break;
    case 'FETCH_RESET_USER_SUCCESS':
      hint('重置成功');
      $('#ManagerUser div.loader').remove();
      break;
    case 'FETCH_RESET_USER_ERROR':
      hint(action.payload);
      $('#ManagerUser div.loader').remove();
      break;
    case 'FETCH_DELETE_USER_START':
      $('#ManagerUser')
        .append($('<div>')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      break;
    case 'FETCH_DELETE_USER_SUCCESS':
      hint('删除成功');
      $('#ManagerUser div.loader').remove();
      break;
    case 'FETCH_DELETE_USER_ERROR':
      hint(action.payload);
      $('#ManagerUser div.loader').remove();
      break;
    default:
      return state;
  }
  nextState.users = [];
  const keys = nextState.filter.trim().toLowerCase().split(' ');
  for (let i = 0; i < nextState.allUsers.length; i++) {
    const tempName = nextState.allUsers[i].name;
    const tempID = nextState.allUsers[i].ID;
    let flag = false;
    for (let j = 0; j < keys.length; j++) {
      if (tempName.toLowerCase().indexOf(keys[j]) !== -1 ||
          tempID.toLowerCase().indexOf(keys[j]) !== -1) {
        flag = true;
        break;
      }
    }
    if (flag) {
      nextState.users.push(nextState.allUsers[i]);
    }
  }
  return nextState;
};

export default managerUser;
