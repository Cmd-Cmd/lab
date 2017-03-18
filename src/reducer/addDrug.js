import $ from 'jquery';

const initState = '';

const addDrug = (state = initState, action) => {
  switch (action.type) {
    case 'RESET_STATE':
      return state;
    case 'FETCH_ADDDRUG_START':
      $('#addDrugForm')
        .append($('<div>')
        .css('margin-left', '-1rem')
        .addClass('loader')
        .append($('<div>')
        .addClass('loader-inner square-spin')
        .append($('<div>'))));
      return state;
    case 'FETCH_ADDDRUG_SUCCESS':
      alert('添加成功');
      $('#addDrugForm').get(0).reset();
      $('#addDrugForm div.loader').remove();
      return action.payload;
    case 'FETCH_ADDDRUG_ERROR':
      $('#addDrugForm div.loader').remove();
      alert(action.payload);
      return state;
    default:
      return state;
  }
};

export default addDrug;
