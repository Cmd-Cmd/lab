import {cont, api} from './exampleData';

const fetchStart = (op, payload = {}) => {
  return {
    type: `FETCH_${op}_START`,
    payload
  };
};

const fetchSuccess = (op, payload = {}) => {
  return {
    type: `FETCH_${op}_SUCCESS`,
    payload
  };
};

const fetchError = (op, payload) => {
  return {
    type: `FETCH_${op}_ERROR`,
    payload
  };
};

export const login = form => {
  return (dispatch, getState) => {
    dispatch(fetchStart('LOGIN', form));
    form.type = 'Login';
    fetch('http://bxw2359770225.my3w.com/Ashx/LoginHandler.ashx', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: 'json=' + escape(JSON.stringify(form))
    }).then(res => {
      if (res.ok) {
        res.json().then(data => {
          if (data.error === '0') {
            dispatch(fetchSuccess('LOGIN', data.data[0]));
          } else {
            dispatch(fetchError('LOGIN', data.error));
          }
        });
      } else {
        dispatch(fetchError('LOGIN', `响应错误: ${res.status}`));
      }
    }, e => dispatch(fetchError('LOGIN', `请求失败: ${e}`)));
  };
};

export const getEssay = (housing, id) => {
  return (dispatch, getState) => {
    dispatch(fetchStart(`GET${housing}`, {id}));
    switch (id) {
      case 0:
        dispatch(fetchSuccess(`GET${housing}`, {cont}));
        break;
      case 1:
        fetch(api).then(res => {
          if (res.ok) {
            res.json().then(data => {
              data = JSON.stringify(data);
              dispatch(fetchSuccess(`GET${housing}`, {cont: data}));
            });
          } else {
            dispatch(fetchError(`GET${housing}`), {id, res});
          }
        });
        break;
      default:
        dispatch(fetchError(`GET${housing}`));
    }
  };
};
