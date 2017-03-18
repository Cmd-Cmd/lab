import $ from 'jquery';

const initState = {
  drug: '',
  disableBtn: true,
  detail: {
    CAS: '',
    counting: '',
    dangerous: '',
    details: '',
    'drug_Englishname': '',
    'drug_another_name': '',
    'drug_name': '',
    'edit_time': '',
    'fen_zi_liang': '',
    'fen_zi_shi': '',
    people: '',
    standard: ''
  },
  locs: []
};

const addDrug = (state = initState, action) => {
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case 'SET_DRUG_DETAIL':
      nextState = Object.assign({}, initState);
      nextState.drug = action.payload;
      break;
    case 'FETCH_GETDRUGDETAIL_START':
      $('#drugDetailForm')
        .append($('<div>')
        .css('margin-left', '-1rem')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      break;
    case 'FETCH_GETDRUGDETAIL_SUCCESS':
      nextState.detail = action.payload;
      $('#drugDetailForm div.loader').remove();
      break;
    case 'FETCH_GETDRUGDETAIL_ERROR':
      $('#drugDetailForm div.loader').remove();
      alert(action.payload);
      nextState.drug = '';
      break;
    case 'DRUG_DETAIL_CHANGE':
      let tempDetail = Object.assign({}, nextState.detail);
      tempDetail[action.payload.name] = action.payload.value;
      nextState.detail = tempDetail;
      nextState.disableBtn = false;
      break;
    case 'FETCH_UPDATEDRUG_START':
      $('#drugDetailForm')
        .append($('<div>')
        .css('margin-left', '-1rem')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      nextState.disableBtn = true;
      break;
    case 'FETCH_UPDATEDRUG_SUCCESS':
      $('#drugDetailForm div.loader').remove();
      alert('修改成功');
      break;
    case 'FETCH_UPDATEDRUG_ERROR':
      $('#drugDetailForm div.loader').remove();
      alert(action.payload);
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
      alert(action.payload);
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
      alert('修改成功');
      $('#drugLocForms div.loader').remove();
      break;
    case 'FETCH_UPDATEDRUG_LOC_ERROR':
      alert(action.payload);
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
      alert('删除成功');
      nextState.drug = '';
      $('#DrugDetail div.loader').remove();
      break;
    case 'FETCH_DELETEDRUG_ERROR':
      alert(action.payload);
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
        alert('请先保存之前新增的位置信息');
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
      alert('删除成功');
      $('#drugLocForms div.loader').remove();
      break;
    case 'FETCH_DELETEDRUG_LOC_ERROR':
      alert(action.payload);
      $('#drugLocForms div.loader').remove();
      break;
    default:
      return state;
  }
  return nextState;
};

export default addDrug;
