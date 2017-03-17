import {cont, api} from './exampleData';
import {personChange} from './index';

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

const fetchError = (op, payload = {}) => {
  return {
    type: `FETCH_${op}_ERROR`,
    payload
  };
};

export const personUpdate = () => {
  return (dispatch, getState) => {
    dispatch(fetchStart('UPDATEPERSON'));
    const detailSnap = getState().login.detail;
    const infosSnap = getState().login.infos;
    const phonenumberLong = 'phonenumber_long';
    const phonenumberShort = 'phonenumber_short';
    const temp = {
      type: 'Info_Update',
      id: infosSnap.ID,
      pw: infosSnap.token,
      idebtity: detailSnap.idebtity,
      email: detailSnap.email,
      QQ: detailSnap.QQ,
      'phonenumber_long': detailSnap[phonenumberLong],
      'phonenumber_short': detailSnap[phonenumberShort],
      address: detailSnap.address
    };
    fetch('http://bxw2359770225.my3w.com/Ashx/LoginHandler.ashx', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: 'json=' + escape(JSON.stringify(temp))
    }).then(res => {
      if (res.ok) {
        res.json().then(data => {
          if (data.error === '0') {
            dispatch(personChange(false));
            dispatch(fetchSuccess('UPDATEPERSON'));
          } else {
            dispatch(fetchError('UPDATEPERSON', `修改失败: 代号 ${data.error}`));
          }
        });
      } else {
        dispatch(fetchError('UPDATEPERSON', `修改失败: 响应 ${res.status}`));
      }
    }, e => dispatch(fetchError('UPDATEPERSON', `修改失败: ${e}`)));
  };
};

export const getPerson = (findId) => {
  return (dispatch, getState) => {
    dispatch(fetchStart('GETPERSON'));
    const snapState = getState().login.infos;
    const temp = {
      type: 'GetInfoByID',
      id: snapState.ID,
      pw: snapState.token,
      'find_id': findId
    };
    fetch('http://bxw2359770225.my3w.com/Ashx/LoginHandler.ashx', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: 'json=' + escape(JSON.stringify(temp))
    }).then(res => {
      if (res.ok) {
        res.json().then(data => {
          if (data.error === '0') {
            dispatch(fetchSuccess('GETPERSON', data.data[0]));
          } else {
            dispatch(fetchError('GETPERSON'));
          }
        });
      } else {
        dispatch(fetchError('GETPERSON'));
      }
    }, e => dispatch(fetchError('GETPERSON')));
  };
};

export const token = (cb, temp) => {
  return (dispatch, getState) => {
    dispatch(fetchStart('TOKEN', temp));
    temp.type = 'Login';
    fetch('http://bxw2359770225.my3w.com/Ashx/LoginHandler.ashx', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: 'json=' + escape(JSON.stringify(temp))
    }).then(res => {
      if (res.ok) {
        res.json().then(data => {
          if (data.error === '0') {
            dispatch(fetchSuccess('TOKEN', data.data[0]));
            cb();
          } else {
            dispatch(fetchError('TOKEN', data.error));
            cb();
          }
        });
      } else {
        dispatch(fetchError('TOKEN', `响应错误: ${res.status}`));
        cb();
      }
    }, e => {
      dispatch(fetchError('TOKEN', `请求失败: ${e}`));
      cb();
    });
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
            dispatch(fetchError('LOGIN', `登录失败: 用户不存在或密码错误`));
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
