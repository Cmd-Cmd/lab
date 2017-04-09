import $ from 'jquery';

import hint from '../hint';

const initState = {
  devicesAll: [],
  pageNow: 0,
  pageAll: 0,
  devices: []
};

const managerDevice = (state = initState, action) => {
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case 'FETCH_GETDEVICE_START':
      $('#ManagerDevice')
        .append($('<div>')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      break;
    case 'FETCH_GETDEVICE_SUCCESS':
      nextState.devicesAll = action.payload;
      nextState.pageNow = 0;
      nextState.pageAll = Math.floor((nextState.devicesAll.length - 1) / 15);
      $('#ManagerDevice div.loader').remove();
      break;
    case 'FETCH_GETDEVICE_ERROR':
      hint(action.payload);
      $('#ManagerDevice div.loader').remove();
      break;
    case 'FETCH_MANAGERDELETEDEVICE_START':
      $('#ManagerDevice')
        .append($('<div>')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      break;
    case 'FETCH_MANAGERDELETEDEVICE_SUCCESS':
      hint('删除成功');
      nextState.devicesAll.splice(nextState.pageNow * 15 + action.payload, 1);
      $('#ManagerDevice div.loader').remove();
      break;
    case 'FETCH_MANAGERDELETEDEVICE_ERROR':
      hint(action.payload);
      $('#ManagerDevice div.loader').remove();
      break;
    case 'MANAGER_DEVICE_PAGE_TO':
      nextState.pageNow = action.payload;
      break;
    default:
      return state;
  }
  nextState.devices = [];
  let temp = nextState.pageNow * 15;
  for (let i = temp; i < temp + 15 && i < nextState.devicesAll.length; i++) {
    nextState.devices.push(nextState.devicesAll[i]);
  }
  return nextState;
};

export default managerDevice;
