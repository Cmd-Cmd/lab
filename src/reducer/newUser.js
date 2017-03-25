import $ from 'jquery';

import hint from '../hint';

const initState = '';

const newUser = (state = initState, action) => {
  switch (action.type) {
    case 'RESET_STATE':
      return state;
    case 'FETCH_NEWUSER_START':
      $('#newUserForm')
        .append($('<div>')
        .css('margin-left', '-1rem')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      return state;
    case 'FETCH_NEWUSER_SUCCESS':
      hint(`用户 ${action.payload} 创建成功`);
      $('#newUserForm input').val('');
      $($('#newUserForm :radio')).each((inx, ele) => {
        if (inx % 3 === 2) {
          $(ele).prop('checked', 'checked');
        }
      });
      $('#newUserForm div.loader').remove();
      return action.payload;
    case 'FETCH_NEWUSER_ERROR':
      $('#newUserForm div.loader').remove();
      hint(action.payload);
      return state;
    default:
      return state;
  }
};

export default newUser;
