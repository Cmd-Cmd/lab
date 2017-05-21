import $ from 'jquery';

import hint from '../hint';

const initState = {
  imgNum: 0,
  logined: false,
  change: false,
  infos: {
    ID: '',
    name: '',
    'rank_class': '',
    'rank_control': '',
    'rank_course': '',
    'rank_drug': '',
    'rank_equipment': '',
    'rank_experment': '',
    'rank_news': '',
    'rank_open': '',
    'rank_student': '',
    token: '',
    'token_Time': ''
  },
  detail: {
    ID: '',
    name: '',
    idebtity: '',
    email: '',
    QQ: '',
    address: '',
    'phonenumber_long': '',
    'phonenumber_short': '',
    'creat_time': '',
    'last_time': ''
  }
};

const login = (state = initState, action) => {
  let nextState = Object.assign({}, state);
  switch (action.type){
    case 'IMGNUM_REFRESH':
      nextState.imgNum++;
      break;
    case 'FETCH_TOKEN_START':
    case 'FETCH_LOGIN_START':
      nextState.logined = false;
      $('#loginModal div.am-modal-dialog')
        .append($('<div>')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      break;
    case 'FETCH_LOGIN_SUCCESS':
      nextState.logined = true;
      nextState.infos = {...action.payload};
      localStorage.id = nextState.infos.ID;
      localStorage.token = nextState.infos.token;
      $('#loginModal, div.am-dimmer').remove();
      break;
    case 'FETCH_LOGIN_ERROR':
      nextState.logined = false;
      $('#loginAlert')
        .html('')
        .append($('<div>')
        .addClass('am-badge am-badge-danger')
        .css('width', '100%')
        .html(action.payload));
      $('#loginModal div.loader').remove();
      break;
    case 'FETCH_TOKEN_SUCCESS':
      nextState.logined = true;
      nextState.infos = {...action.payload};
      localStorage.id = nextState.infos.ID;
      localStorage.token = nextState.infos.token;
      break;
    case 'FETCH_TOKEN_ERROR':
      nextState.logined = false;
      break;
    case 'FETCH_GETPERSON_START':
      $('#personForm')
        .append($('<div>')
        .css('margin-left', '-1rem')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      break;
    case 'FETCH_GETPERSON_SUCCESS':
      $('#personForm div.loader').remove();
      nextState.detail = {...action.payload};
      break;
    case 'FETCH_GETPERSON_ERROR':
      $('#personForm div.loader').remove();
      hint('获取用户信息失败');
      break;
    case 'CHANGE_LOGIN_DETAIL':
      let temp = Object.assign({}, nextState.detail);
      temp[action.payload.name] = action.payload.value;
      nextState.detail = temp;
      break;
    case 'SET_LOGIN_CHANGE':
      nextState.change = action.payload;
      break;
    case 'FETCH_UPDATEPERSON_START':
      $('#personForm')
        .append($('<div>')
        .css('margin-left', '-1rem')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      break;
    case 'FETCH_UPDATEPERSON_SUCCESS':
      hint('修改个人信息成功');
      $('#personForm div.loader').remove();
      break;
    case 'FETCH_UPDATEPERSON_ERROR':
      hint(action.payload);
      $('#personForm div.loader').remove();
      break;
    case 'LOGOUT':
      localStorage.removeItem('id');
      localStorage.removeItem('token');
      const tempNum = nextState.imgNum;
      nextState = Object.assign({}, initState);
      nextState.imgNum = tempNum + 1;
      break;
    default:
      return state;
  }
  return nextState;
};

export default login;
