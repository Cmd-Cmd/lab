import $ from 'jquery';

const initState = {
  logined: false,
  infos: {
    ID: '',
    PW: '',
    answer: '',
    name: '',
    question: '',
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
  }
};

const login = (state = initState, action) => {
  let nextState = Object.assign({}, state);
  switch (action.type){
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
      alert('登录失败');
      $('#loginModal div.loader').remove();
      break;
    default:
      return state;
  }
  return nextState;
};

export default login;
