import $ from 'jquery';

import hint from '../hint';

const initState = {
  mix: 'TEST',
  disableBtn: true,
  detail: {
    'drug_mix': '',
    attention: '',
    standard: ''
  }
};

const mixDetail = (state = initState, action) => {
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case 'SET_MIX_DETAIL':
      nextState = Object.assign({}, initState);
      nextState.mix = action.payload;
      break;
    case 'FETCH_GETMIXDETAIL_START':
      $('#mixDetailForm')
        .append($('<div>')
        .css('margin-left', '-1rem')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      break;
    case 'FETCH_GETMIXDETAIL_SUCCESS':
      nextState.detail = action.payload;
      $('#mixDetailForm div.loader').remove();
      break;
    case 'FETCH_GETMIXDETAIL_ERROR':
      $('#mixDetailForm div.loader').remove();
      hint(action.payload);
      nextState.mix = '';
      break;
    case 'MIX_DETAIL_CHANGE':
      let tempDetail = Object.assign({}, nextState.detail);
      tempDetail[action.payload.name] = action.payload.value;
      nextState.detail = tempDetail;
      nextState.disableBtn = false;
      break;
    case 'FETCH_UPDATEMIX_START':
      $('#mixDetailForm')
        .append($('<div>')
        .css('margin-left', '-1rem')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      nextState.disableBtn = true;
      break;
    case 'FETCH_UPDATEMIX_SUCCESS':
      $('#mixDetailForm div.loader').remove();
      hint('修改成功');
      break;
    case 'FETCH_UPDATEMIX_ERROR':
      $('#mixDetailForm div.loader').remove();
      hint(action.payload);
      nextState.disableBtn = false;
      break;
    case 'FETCH_GETDRUGLOC_START':
      $('#drugLocForms')
        .append($('<div>')
        .css('margin-left', '-1rem')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      break;
    case 'FETCH_GETDRUGLOC_SUCCESS':
      nextState.locs = action.payload;
      $('#drugLocForms div.loader').remove();
      break;
    case 'FETCH_GETDRUGLOC_ERROR':
      hint(action.payload);
      nextState.drug = '';
      $('#drugLocForms div.loader').remove();
      break;
    case 'DRUG_LOC_CHANGE':
      let tempLoc = nextState.locs.slice(0);
      tempLoc[action.payload.inx][action.payload.name] = action.payload.value;
      nextState.locs = tempLoc;
      break;
    case 'FETCH_UPDATEDRUG_LOC_START':
      $('#drugLocForms')
        .append($('<div>')
        .css('margin-left', '-1rem')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      break;
    case 'FETCH_UPDATEDRUG_LOC_SUCCESS':
      hint('修改成功');
      $('#drugLocForms div.loader').remove();
      break;
    case 'FETCH_UPDATEDRUG_LOC_ERROR':
      hint(action.payload);
      $('#drugLocForms div.loader').remove();
      break;
    case 'FETCH_DELETEDRUG_START':
      $('#DrugDetail')
        .append($('<div>')
        .css('margin-left', '-1rem')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      break;
    case 'FETCH_DELETEDRUG_SUCCESS':
      hint('删除成功');
      nextState.drug = '';
      $('#DrugDetail div.loader').remove();
      break;
    case 'FETCH_DELETEDRUG_ERROR':
      hint(action.payload);
      $('#DrugDetail div.loader').remove();
      break;
    case 'NEW_DRUG_LOC':
      let newLocFlag = false;
      for (var i = 0; i < nextState.locs.length; i++) {
        if (nextState.locs[i].id === -1) {
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
        id: -1,
        position: '请输入存放位置',
        people: '自己',
        counting: 0,
        remain: 0,
        each: 0,
        standard: nextState.detail.standard,
        'drug_name': nextState.drug,
        'edit_time': (new Date()).toLocaleString()
      });
      nextState.locs = newLoc;
      break;
    case 'DELETE_NEW_DRUG_LOC':
      let tempLocs = nextState.locs.slice(0);
      for (var j = 0; j < tempLocs.length; j++) {
        if (tempLocs[j].id === -1) {
          tempLocs.splice(j, 1);
          break;
        }
      }
      nextState.locs = tempLocs;
      break;
    case 'FETCH_DELETEDRUG_LOC_START':
      $('#drugLocForms')
        .append($('<div>')
        .css('margin-left', '-1rem')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      break;
    case 'FETCH_DELETEDRUG_LOC_SUCCESS':
      hint('删除成功');
      $('#drugLocForms div.loader').remove();
      break;
    case 'FETCH_DELETEDRUG_LOC_ERROR':
      hint(action.payload);
      $('#drugLocForms div.loader').remove();
      break;
    default:
      return state;
  }
  return nextState;
};

export default mixDetail;
