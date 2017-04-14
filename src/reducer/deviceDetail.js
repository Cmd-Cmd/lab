import $ from 'jquery';

import hint from '../hint';

const initState = {
  device: '',
  disableBtn: true,
  detail: {
    'equip_name': '',
    model: '',
    factory: '',
    detail: '',
    price: ''
  },
  locs: []
};

const fixedAssetsNO = 'fixed_assets_NO';

const deviceDetail = (state = initState, action) => {
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case 'SET_DEVICE_DETAIL':
      nextState = Object.assign({}, initState);
      nextState.device = action.payload;
      break;
    case 'FETCH_GETDEVICEDETAIL_START':
      $('#deviceDetailForm')
        .append($('<div>')
        .css('margin-left', '-1rem')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      break;
    case 'FETCH_GETDEVICEDETAIL_SUCCESS':
      nextState.detail = action.payload;
      $('#deviceDetailForm div.loader').remove();
      break;
    case 'FETCH_GETDEVICEDETAIL_ERROR':
      $('#deviceDetailForm div.loader').remove();
      hint(action.payload);
      nextState.device = '';
      break;
    case 'DEVICE_DETAIL_CHANGE':
      let tempDetail = Object.assign({}, nextState.detail);
      tempDetail[action.payload.name] = action.payload.value;
      nextState.detail = tempDetail;
      nextState.disableBtn = false;
      break;
    case 'FETCH_UPDATEDEVICE_START':
      $('#deviceDetailForm')
        .append($('<div>')
        .css('margin-left', '-1rem')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      nextState.disableBtn = true;
      break;
    case 'FETCH_UPDATEDEVICE_SUCCESS':
      $('#deviceDetailForm div.loader').remove();
      hint('修改成功');
      break;
    case 'FETCH_UPDATEDEVICE_ERROR':
      $('#deviceDetailForm div.loader').remove();
      hint(action.payload);
      nextState.disableBtn = false;
      break;
    case 'FETCH_GETDEVICELOC_START':
      $('#deviceLocForms')
        .append($('<div>')
        .css('margin-left', '-1rem')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      break;
    case 'FETCH_GETDEVICELOC_SUCCESS':
      nextState.locs = action.payload.map((ele, inx) => {
        ele.old = ele[fixedAssetsNO];
        return ele;
      });
      $('#deviceLocForms div.loader').remove();
      break;
    case 'FETCH_GETDEVICELOC_ERROR':
      hint(action.payload);
      nextState.device = '';
      $('#deviceLocForms div.loader').remove();
      break;
    case 'DEVICE_LOC_CHANGE':
      let tempLoc = nextState.locs.slice(0);
      tempLoc[action.payload.inx][action.payload.name] = action.payload.value;
      nextState.locs = tempLoc;
      break;
    case 'FETCH_UPDATEDEVICE_LOC_START':
      $('#deviceLocForms')
        .append($('<div>')
        .css('margin-left', '-1rem')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      break;
    case 'FETCH_UPDATEDEVICE_LOC_SUCCESS':
      hint('修改成功');
      $('#deviceLocForms div.loader').remove();
      break;
    case 'FETCH_UPDATEDEVICE_LOC_ERROR':
      hint(action.payload);
      $('#deviceLocForms div.loader').remove();
      break;
    case 'FETCH_DELETEDEVICE_START':
      $('#DeviceDetail')
        .append($('<div>')
        .css('margin-left', '-1rem')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      break;
    case 'FETCH_DELETEDEVICE_SUCCESS':
      hint('删除成功');
      nextState.device = '';
      $('#DeviceDetail div.loader').remove();
      break;
    case 'FETCH_DELETEDEVICE_ERROR':
      hint(action.payload);
      $('#DeviceDetail div.loader').remove();
      break;
    case 'NEW_DEVICE_LOC':
      let newLocFlag = false;
      for (var i = 0; i < nextState.locs.length; i++) {
        if (nextState.locs[i].old === -1) {
          newLocFlag = true;
          break;
        }
      }
      if (newLocFlag) {
        hint('请先保存之前新增的位置信息');
        break;
      }
      let newLoc = nextState.locs.slice(0);
      newLoc.push({
        old: -1,
        'equip_name': nextState.device,
        'fixed_assets_NO': '',
        'factory_NO': '',
        'time_buying': (new Date()).toLocaleString().split(' ')[0],
        people: '自己',
        position: '请输入位置信息',
        state: '在用',
        'state_explane': '请输入状态说明',
        'edit_time': (new Date()).toLocaleString()
      });
      nextState.locs = newLoc;
      break;
    case 'DELETE_NEW_DEVICE_LOC':
      let tempLocs = nextState.locs.slice(0);
      for (var j = 0; j < tempLocs.length; j++) {
        if (tempLocs[j].old === -1) {
          tempLocs.splice(j, 1);
          break;
        }
      }
      nextState.locs = tempLocs;
      break;
    case 'FETCH_DELETEDEVICE_LOC_START':
      $('#deviceLocForms')
        .append($('<div>')
        .css('margin-left', '-1rem')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      break;
    case 'FETCH_DELETEDEVICE_LOC_SUCCESS':
      hint('删除成功');
      $('#deviceLocForms div.loader').remove();
      break;
    case 'FETCH_DELETEDEVICE_LOC_ERROR':
      hint(action.payload);
      $('#deviceLocForms div.loader').remove();
      break;
    default:
      return state;
  }
  return nextState;
};

export default deviceDetail;
