import $ from 'jquery';

import hint from '../hint';

const initState = '';

const addDevice = (state = initState, action) => {
  switch (action.type) {
    case 'RESET_STATE':
      return state;
    case 'FETCH_ADDDEVICE_START':
      $('#addDeviceForm')
        .append($('<div>')
        .css('margin-left', '-1rem')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      return state;
    case 'FETCH_ADDDEVICE_SUCCESS':
      hint('添加成功');
      $('#addDeviceForm').get(0).reset();
      $('#addDeviceForm div.loader').remove();
      return action.payload;
    case 'FETCH_ADDDEVICE_ERROR':
      $('#addDeviceForm div.loader').remove();
      hint(action.payload);
      return state;
    default:
      return state;
  }
};

export default addDevice;
