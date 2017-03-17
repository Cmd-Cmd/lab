import $ from 'jquery';

const initState = {
  step: 0,
  question: '',
  result: ''
};

const reset = (state = initState, action) => {
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case 'FETCH_GETQA_START':
      $('#Reset')
        .append($('<div>')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      break;
    case 'FETCH_GETQA_SUCCESS':
      nextState.step = 1;
      nextState.question = action.payload;
      $('#Reset div.loader').remove();
      break;
    case 'FETCH_GETQA_ERROR':
      alert(action.payload);
      $('#Reset div.loader').remove();
      break;
    case 'FETCH_RESETBYQA_START':
      $('#Reset')
        .append($('<div>')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      break;
    case 'FETCH_RESETBYQA_SUCCESS':
      nextState.step = 2;
      nextState.result = '密码已重置为用户名，请登陆后修改密码';
      $('#Reset div.loader').remove();
      break;
    case 'FETCH_RESETBYQA_ERROR':
      alert(action.payload);
      $('#Reset div.loader').remove();
      break;
    case 'INIT_RESET':
      return initState;
    default:
      return state;
  }
  return nextState;
};

export default reset;
