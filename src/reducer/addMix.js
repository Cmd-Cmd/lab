import $ from 'jquery';

import hint from '../hint';

const initState = '';

const addMix = (state = initState, action) => {
  switch (action.type) {
    case 'RESET_STATE':
      return state;
    case 'FETCH_ADDMIX_START':
      $('#addMixForm')
        .append($('<div>')
        .css('margin-left', '-1rem')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      return state;
    case 'FETCH_ADDMIX_SUCCESS':
      hint('添加成功');
      $('#addMixForm').get(0).reset();
      $('#addMixForm div.loader').remove();
      return action.payload;
    case 'FETCH_ADDMIX_ERROR':
      $('#addMixForm div.loader').remove();
      hint(action.payload);
      return state;
    default:
      return state;
  }
};

export default addMix;
