import $ from 'jquery';

import hint from '../hint';

const initState = {
  mix: '',
  disableBtn: true,
  detail: {
    'drug_mix': '',
    attention: '',
    standard: ''
  },
  struct: {
    drug: [],
    'mix_add': []
  },
  drugSearch: [],
  mixSearch: []
};

const drugName = 'drug_name';
const mixAdd = 'mix_add';

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
    case 'FETCH_DELETEMIX_START':
      $('#MixDetail')
        .append($('<div>')
        .css('margin-left', '-1rem')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      break;
    case 'FETCH_DELETEMIX_SUCCESS':
      hint('删除成功');
      nextState.mix = '';
      $('#MixDetail div.loader').remove();
      break;
    case 'FETCH_DELETEMIX_ERROR':
      hint(action.payload);
      $('#MixDetail div.loader').remove();
      break;
    case 'FETCH_GETMIXSTRUCT_START':
      $('#mixStructGrid')
        .append($('<div>')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      break;
    case 'FETCH_GETMIXSTRUCT_SUCCESS':
      nextState.struct = {
        drug: [],
        'mix_add': []
      };
      for (let i = 0; i < action.payload.length; i++) {
        nextState.struct.drug.push({
          drug: (action.payload[i])[drugName],
          num: action.payload[i].num,
          standard: action.payload[i].standard
        });
      }
      $('#mixStructGrid div.loader').remove();
      break;
    case 'FETCH_GETMIXSTRUCT_ERROR':
      hint(action.payload);
      nextState.drug = '';
      $('#mixStructGrid div.loader').remove();
      break;
    case 'FETCH_MIX_DRUG_SEARCH_START':
      $('#mixStructGrid')
        .append($('<div>')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      break;
    case 'FETCH_MIX_DRUG_SEARCH_SUCCESS':
      nextState.drugSearch = action.payload;
      $('#mixStructGrid div.loader').remove();
      break;
    case 'FETCH_MIX_DRUG_SEARCH_ERROR':
      hint(action.payload);
      $('#mixStructGrid div.loader').remove();
      break;
    case 'FETCH_MIX_MIX_SEARCH_START':
      $('#mixStructGrid')
        .append($('<div>')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      break;
    case 'FETCH_MIX_MIX_SEARCH_SUCCESS':
      nextState.mixSearch = action.payload;
      $('#mixStructGrid div.loader').remove();
      break;
    case 'FETCH_MIX_MIX_SEARCH_ERROR':
      hint(action.payload);
      $('#mixStructGrid div.loader').remove();
      break;
    case 'ADD_TO_STRUCT':
      let tempAdd = Object.assign({}, nextState.struct);
      if (action.flag) {
        tempAdd.drug.push(action.payload);
      } else {
        tempAdd[mixAdd].push(action.payload);
      }
      nextState.struct = tempAdd;
      break;
    case 'DELETE_STRUCT':
      let tempDel = Object.assign({}, nextState.struct);
      if (action.flag) {
        tempDel.drug.splice(action.payload, 1);
      } else {
        tempDel[mixAdd].splice(action.payload, 1);
      }
      nextState.struct = tempDel;
      break;
    case 'FETCH_UPDATE_STRUCT_START':
      $('#mixStructGrid')
        .append($('<div>')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      break;
    case 'FETCH_UPDATE_STRUCT_SUCCESS':
      hint('修改已保存');
      $('#mixStructGrid div.loader').remove();
      break;
    case 'FETCH_UPDATE_STRUCT_ERROR':
      hint(action.payload);
      $('#mixStructGrid div.loader').remove();
      break;
    default:
      return state;
  }
  return nextState;
};

export default mixDetail;
