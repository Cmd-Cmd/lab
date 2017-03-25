import {cont, api} from './exampleData';
import {personChange} from './index';
import {setDrugDetail, setMixDetail} from './index';

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

const fetchTemplete = (type, form) => {
  return fetch(`http://bxw2359770225.my3w.com/Ashx/${type}.ashx`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/javascript, */*; q=0.01',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    body: 'json=' + escape(JSON.stringify(form))
  });
};

export const getMixDetail = mix => {
  return (dispatch, getState) => {
    dispatch(fetchStart('GETMIXDETAIL'));
    const temp = {
      type: 'GetDrugMixByName',
      id: getState().login.infos.ID,
      pw: getState().login.infos.token,
      mix
    };
    fetchTemplete('DrugHandler', temp).then(res => {
      if (res.ok) {
        res.json().then(data => {
          if (data.error === '0') {
            dispatch(fetchSuccess('GETMIXDETAIL', data.data[0]));
          } else {
            dispatch(fetchError('GETMIXDETAIL',
                                `获取药品详情失败: ERR-${data.error}`));
          }
        });
      } else {
        dispatch(fetchError('GETMIXDETAIL',
                            `获取药品详情失败: RES-${res.status}`));
      }
    }, e => dispatch(fetchError('GETDRUGDETAIL', `获取药品详情失败: ${e}`)));
  };
};

export const getMixStruct = mix => {
  return (dispatch, getState) => {
    dispatch(fetchStart('GETMIXSTRUCT'));
    const temp = {
      type: 'GetDrugMix_Struct',
      id: getState().login.infos.ID,
      pw: getState().login.infos.token,
      mix
    };
    fetchTemplete('DrugHandler', temp).then(res => {
      if (res.ok) {
        res.json().then(data => {
          if (data.error === '0') {
            dispatch(fetchSuccess('GETMIXSTRUCT', data.data));
          } else {
            dispatch(fetchError('GETMIXSTRUCT',
                                `获取试剂配方失败: ERR-${data.error}`));
          }
        });
      } else {
        dispatch(fetchError('GETMIXSTRUCT',
                            `获取试剂配方失败: RES-${res.status}`));
      }
    }, e => dispatch(fetchError('GETMIXSTRUCT', `获取试剂配方失败: ${e}`)));
  };
};

export const mixUpdate = form => {
  return (dispatch, getState) => {
    dispatch(fetchStart('UPDATEMIX'));
    const drugMix = 'drug_mix';
    const temp = {
      type: 'DrugMix_Insert_Update',
      id: getState().login.infos.ID,
      pw: getState().login.infos.token,
      mix: form[drugMix],
      'mix_old': getState().mixDetail.mix,
      ...form
    };
    delete temp[drugMix];
    fetchTemplete('DrugHandler', temp).then(res => {
      if (res.ok) {
        res.json().then(data => {
          if (data.error === '0') {
            dispatch(fetchSuccess('UPDATEMIX'));
            dispatch(setMixDetail(form[drugMix]));
            dispatch(getMixDetail(form[drugMix]));
            dispatch(getMixStruct(form[drugMix]));
          } else {
            dispatch(fetchError('UPDATEMIX', `修改信息失败: ERR-${data.error}`));
          }
        });
      } else {
        dispatch(fetchError('UPDATEMIX', `修改信息失败: RES-${res.status}`));
      }
    }, e => dispatch(fetchError('UPDATEMIX', `修改信息失败: ${e}`)));
  };
};

export const addMix = form => {
  return (dispatch, getState) => {
    dispatch(fetchStart('ADDMIX'));
    const temp = {
      type: 'DrugMix_Insert_Update',
      id: getState().login.infos.ID,
      pw: getState().login.infos.token,
      ...form,
      'mix_old': '-1',
    };
    fetchTemplete('DrugHandler', temp).then(res => {
      if (res.ok) {
        res.json().then(data => {
          if (data.error === '0') {
            dispatch(setMixDetail(form.mix));
            dispatch(fetchSuccess('ADDMIX', form.mix));
          } else {
            dispatch(fetchError('ADDMIX', `新增试剂失败: ERR-${data.error}`));
          }
        });
      } else {
        dispatch(fetchError('ADDMIX', `新增试剂失败: RES-${res.status}`));
      }
    }, e => dispatch(fetchError('ADDMIX', `新增试剂失败: ${e}`)));
  };
};

export const getAllRanks = () => {
  return (dispatch, getState) => {
    dispatch(fetchStart('GET_ALL_RANKS'));
    const temp = {
      type: 'GetRankAll',
      id: getState().login.infos.ID,
      pw: getState().login.infos.token
    };
    fetchTemplete('LoginHandler', temp).then(res => {
      if (res.ok) {
        res.json().then(data => {
          if (data.error === '0') {
            dispatch(fetchSuccess('GET_ALL_RANKS', data.data));
          } else {
            dispatch(fetchError('GET_ALL_RANKS',
                                `获取用户权限信息失败: ERR-${data.error}`));
          }
        });
      } else {
        dispatch(fetchError('GET_ALL_RANKS',
                            `获取用户权限信息失败: RES-${res.status}`));
      }
    }, e => dispatch(fetchError('GET_ALL_RANKS', `获取用户权限信息失败: ${e}`)));
  };
};

export const getAllUsers = () => {
  return (dispatch, getState) => {
    dispatch(fetchStart('GET_ALL_USERS'));
    const temp = {
      type: 'GetInfoAll',
      id: getState().login.infos.ID,
      pw: getState().login.infos.token
    };
    fetchTemplete('LoginHandler', temp).then(res => {
      if (res.ok) {
        res.json().then(data => {
          if (data.error === '0') {
            dispatch(fetchSuccess('GET_ALL_USERS', data.data));
          } else {
            dispatch(fetchError('GET_ALL_USERS',
                                `获取用户基本信息失败: ERR-${data.error}`));
          }
        });
      } else {
        dispatch(fetchError('GET_ALL_USERS',
                            `获取用户基本信息失败: RES-${res.status}`));
      }
    }, e => dispatch(fetchError('GET_ALL_USERS', `获取用户基本信息失败: ${e}`)));
  };
};

export const updateRank = form => {
  return (dispatch, getState) => {
    dispatch(fetchStart('UPDATE_RANK'));
    form.type = 'Rank_UpdateAll';
    form.id = getState().login.infos.ID;
    form.pw = getState().login.infos.token;
    fetchTemplete('LoginHandler', form).then(res => {
      if (res.ok) {
        res.json().then(data => {
          if (data.error === '0') {
            dispatch(fetchSuccess('UPDATE_RANK'));
            dispatch(getAllRanks());
          } else {
            dispatch(fetchError('UPDATE_RANK',
                                `修改用户权限失败: ERR-${data.error}`));
          }
        });
      } else {
        dispatch(fetchError('UPDATE_RANK',
                            `修改用户权限失败: RES-${res.status}`));
      }
    }, e => dispatch(fetchError('UPDATE_RANK', `修改用户权限失败: ${e}`)));
  };
};

export const deleteUser = inx => {
  return (dispatch, getState) => {
    dispatch(fetchStart('RESET_USER'));
    const user = getState().managerUser.users[inx];
    const temp = {
      type: 'Rank_Delete',
      id: getState().login.infos.ID,
      pw: getState().login.infos.token,
      'find_id': user.ID
    };
    fetchTemplete('LoginHandler', temp).then(res => {
      if (res.ok) {
        res.json().then(data => {
          if (data.error === '0') {
            dispatch(fetchSuccess('DELETE_USER', inx));
            dispatch(getAllUsers());
          } else {
            dispatch(fetchError('DELETE_USER',
                                `删除用户失败: ERR-${data.error}`));
          }
        });
      } else {
        dispatch(fetchError('DELETE_USER',
                            `删除用户失败: RES-${res.status}`));
      }
    }, e => dispatch(fetchError('DELETE_USER', `删除用户失败: ${e}`)));
  };
};

export const resetUser = inx => {
  return (dispatch, getState) => {
    dispatch(fetchStart('RESET_USER'));
    const user = getState().managerUser.users[inx];
    const temp = {
      type: 'ResetPWQAByID',
      id: getState().login.infos.ID,
      pw: getState().login.infos.token,
      'find_id': user.ID
    };
    fetchTemplete('LoginHandler', temp).then(res => {
      if (res.ok) {
        res.json().then(data => {
          if (data.error === '0') {
            dispatch(fetchSuccess('RESET_USER'));
          } else {
            dispatch(fetchError('RESET_USER',
                                `重置用户失败: ERR-${data.error}`));
          }
        });
      } else {
        dispatch(fetchError('RESET_USER',
                            `重置用户失败: RES-${res.status}`));
      }
    }, e => dispatch(fetchError('RESET_USER', `重置用户失败: ${e}`)));
  };
};

export const newUser = form => {
  return (dispatch, getState) => {
    dispatch(fetchStart('NEWUSER'));
    const temp = {
      type: 'Rank_Insert',
      id: getState().login.infos.ID,
      pw: getState().login.infos.token,
      ...form
    };
    fetchTemplete('LoginHandler', temp).then(res => {
      if (res.ok) {
        res.json().then(data => {
          if (data.error === '0') {
            dispatch(fetchSuccess('NEWUSER', form.name));
          } else {
            dispatch(fetchError('NEWUSER', `新建用户失败: ERR-${data.error}`));
          }
        });
      } else {
        dispatch(fetchError('NEWUSER', `新建用户失败: RES-${res.status}`));
      }
    }, e => dispatch(fetchError('NEWUSER', `新建用户失败: ${e}`)));
  };
};

export const getDrugInOut = drug => {
  return (dispatch, getState) => {
    dispatch(fetchStart('GETDRUGINOUT'));
    const temp = {
      type: 'GetDrugInOutByName',
      id: getState().login.infos.ID,
      pw: getState().login.infos.token,
      from: getState().drugInOut.startTime,
      to: getState().drugInOut.endTime,
      drug
    };
    fetchTemplete('DrugHandler', temp).then(res => {
      if (res.ok) {
        res.json().then(data => {
          if (data.error === '0') {
            dispatch(fetchSuccess('GETDRUGINOUT', data.data));
          } else {
            dispatch(fetchError('GETDRUGINOUT',
                                `获取出入库信息失败: ERR-${data.error}`));
          }
        });
      } else {
        dispatch(fetchError('GETDRUGINOUT',
                            `获取出入库信息失败: RES-${res.status}`));
      }
    }, e => dispatch(fetchError('GETDRUGINOUT', `获取出入库信息失败: ${e}`)));
  };
};

export const managerDeleteDrug = inx => {
  return (dispatch, getState) => {
    dispatch(fetchStart('MANAGERDELETEDRUG'));
    const drug = getState().managerDrug.drugs[inx];
    const drugName = 'drug_name';
    const temp = {
      type: 'Drug_Delete',
      id: getState().login.infos.ID,
      pw: getState().login.infos.token,
      drug: drug[drugName]
    };
    fetchTemplete('DrugHandler', temp).then(res => {
      if (res.ok) {
        res.json().then(data => {
          if (data.error === '0') {
            dispatch(fetchSuccess('MANAGERDELETEDRUG', inx));
          } else {
            dispatch(fetchError('MANAGERDELETEDRUG',
                                `删除药品失败: ERR-${data.error}`));
          }
        });
      } else {
        dispatch(fetchError('MANAGERDELETEDRUG',
                            `删除药品失败: RES-${res.status}`));
      }
    }, e => dispatch(fetchError('MANAGERDELETEDRUG', `删除药品失败: ${e}`)));
  };
};

export const getDrug = (drug) => {
  return (dispatch, getState) => {
    dispatch(fetchStart('GETDRUG'));
    const temp = {
      type: 'GetDrug',
      id: getState().login.infos.ID,
      pw: getState().login.infos.token,
      drug
    };
    fetchTemplete('DrugHandler', temp).then(res => {
      if (res.ok) {
        res.json().then(data => {
          if (data.error === '0') {
            dispatch(fetchSuccess('GETDRUG', data.data));
          } else {
            dispatch(fetchError('GETDRUG',
            `获取药品失败: ERR-${data.error}`));
          }
        });
      } else {
        dispatch(fetchError('GETDRUG',
                            `获取药品失败: RES-${res.status}`));
      }
    }, e => dispatch(fetchError('GETDRUG', `获取药品失败: ${e}`)));
  };
};

export const getDrugLoc = (drug) => {
  return (dispatch, getState) => {
    dispatch(fetchStart('GETDRUGLOC'));
    const temp = {
      type: 'GetDrugLoc',
      id: getState().login.infos.ID,
      pw: getState().login.infos.token,
      drug
    };
    fetchTemplete('DrugHandler', temp).then(res => {
      if (res.ok) {
        res.json().then(data => {
          if (data.error === '0') {
            dispatch(fetchSuccess('GETDRUGLOC', data.data));
          } else {
            dispatch(fetchError('GETDRUGLOC',
            `获取药品位置失败: ERR-${data.error}`));
          }
        });
      } else {
        dispatch(fetchError('GETDRUGLOC',
                            `获取药品位置失败: RES-${res.status}`));
      }
    }, e => dispatch(fetchError('GETDRUGLOC', `获取药品位置失败: ${e}`)));
  };
};

export const getDrugDetail = (drug) => {
  return (dispatch, getState) => {
    dispatch(fetchStart('GETDRUGDETAIL'));
    const temp = {
      type: 'GetDrugDetail',
      id: getState().login.infos.ID,
      pw: getState().login.infos.token,
      drug
    };
    fetchTemplete('DrugHandler', temp).then(res => {
      if (res.ok) {
        res.json().then(data => {
          if (data.error === '0') {
            dispatch(fetchSuccess('GETDRUGDETAIL', data.data[0]));
          } else {
            dispatch(fetchError('GETDRUGDETAIL',
                                `获取药品详情失败: ERR-${data.error}`));
          }
        });
      } else {
        dispatch(fetchError('GETDRUGDETAIL',
                            `获取药品详情失败: RES-${res.status}`));
      }
    }, e => dispatch(fetchError('GETDRUGDETAIL', `获取药品详情失败: ${e}`)));
  };
};

export const deleteDrugLoc = loc => {
  return (dispatch, getState) => {
    dispatch(fetchStart('DELETEDRUG_LOC'));
    const temp = {
      type: 'Drug_DeleteLoc',
      id: getState().login.infos.ID,
      pw: getState().login.infos.token,
      loc
    };
    fetchTemplete('DrugHandler', temp).then(res => {
      if (res.ok) {
        res.json().then(data => {
          if (data.error === '0') {
            dispatch(fetchSuccess('DELETEDRUG_LOC'));
            dispatch(getDrugLoc(getState().drugDetail.drug));
          } else {
            dispatch(fetchError('DELETEDRUG_LOC',
                                `删除药品位置失败: ERR-${data.error}`));
          }
        });
      } else {
        dispatch(fetchError('DELETEDRUG_LOC',
                            `删除药品位置失败: RES-${res.status}`));
      }
    }, e => dispatch(fetchError('UPDATEDRUG_LOC', `删除药品位置失败: ${e}`)));
  };
};

export const deleteDrug = drug => {
  return (dispatch, getState) => {
    dispatch(fetchStart('DELETEDRUG'));
    const temp = {
      type: 'Drug_Delete',
      id: getState().login.infos.ID,
      pw: getState().login.infos.token,
      drug
    };
    fetchTemplete('DrugHandler', temp).then(res => {
      if (res.ok) {
        res.json().then(data => {
          if (data.error === '0') {
            dispatch(fetchSuccess('DELETEDRUG'));
          } else {
            dispatch(fetchError('DELETEDRUG',
                                `删除药品失败: ERR-${data.error}`));
          }
        });
      } else {
        dispatch(fetchError('DELETEDRUG',
                            `删除药品失败: RES-${res.status}`));
      }
    }, e => dispatch(fetchError('DELETEDRUG', `删除药品失败: ${e}`)));
  };
};

export const drugLocUpdate = form => {
  return (dispatch, getState) => {
    dispatch(fetchStart('UPDATEDRUG_LOC'));
    const temp = {
      type: 'Drug_Insert_UpdateLoc',
      id: getState().login.infos.ID,
      pw: getState().login.infos.token,
      people: getState().login.infos.name,
      ...form
    };
    fetchTemplete('DrugHandler', temp).then(res => {
      if (res.ok) {
        res.json().then(data => {
          if (data.error === '0') {
            dispatch(fetchSuccess('UPDATEDRUG_LOC'));
            dispatch(getDrugLoc(getState().drugDetail.drug));
          } else {
            dispatch(fetchError('UPDATEDRUG_LOC',
                                `修改位置信息失败: ERR-${data.error}`));
          }
        });
      } else {
        dispatch(fetchError('UPDATEDRUG_LOC',
                            `修改位置信息失败: RES-${res.status}`));
      }
    }, e => dispatch(fetchError('UPDATEDRUG_LOC', `修改位置信息失败: ${e}`)));
  };
};

export const drugUpdate = form => {
  return (dispatch, getState) => {
    dispatch(fetchStart('UPDATEDRUG'));
    const drugName = 'drug_name';
    const temp = {
      type: 'Drug_Insert_Update',
      id: getState().login.infos.ID,
      pw: getState().login.infos.token,
      people: getState().login.infos.name,
      'drug_old': getState().drugDetail.drug,
      ...form,
      'drug': form[drugName],
    };
    delete temp[drugName];
    fetchTemplete('DrugHandler', temp).then(res => {
      if (res.ok) {
        res.json().then(data => {
          if (data.error === '0') {
            dispatch(fetchSuccess('UPDATEDRUG'));
            dispatch(setDrugDetail(form[drugName]));
            dispatch(getDrugDetail(form[drugName]));
            dispatch(getDrugLoc(form[drugName]));
          } else {
            dispatch(fetchError('UPDATEDRUG', `修改信息失败: ERR-${data.error}`));
          }
        });
      } else {
        dispatch(fetchError('UPDATEDRUG', `修改信息失败: RES-${res.status}`));
      }
    }, e => dispatch(fetchError('UPDATEDRUG', `修改信息失败: ${e}`)));
  };
};

export const addDrug = form => {
  return (dispatch, getState) => {
    dispatch(fetchStart('ADDDRUG'));
    const temp = {
      type: 'Drug_Insert_Update',
      id: getState().login.infos.ID,
      pw: getState().login.infos.token,
      people: getState().login.infos.name,
      ...form,
      'drug_old': '-1',
    };
    fetchTemplete('DrugHandler', temp).then(res => {
      if (res.ok) {
        res.json().then(data => {
          if (data.error === '0') {
            dispatch(setDrugDetail(form.drug));
            dispatch(fetchSuccess('ADDDRUG', form.drug));
          } else {
            dispatch(fetchError('ADDDRUG', `新增药品失败: ERR-${data.error}`));
          }
        });
      } else {
        dispatch(fetchError('ADDDRUG', `新增药品失败: RES-${res.status}`));
      }
    }, e => dispatch(fetchError('ADDDRUG', `新增药品失败: ${e}`)));
  };
};

export const resetByQA = (id, answer) => {
  return (dispatch, getState) => {
    dispatch(fetchStart('RESETBYQA'));
    const temp = {
      type: 'ResetPWByID',
      id,
      answer
    };
    fetchTemplete('LoginHandler', temp).then(res => {
      if (res.ok) {
        res.json().then(data => {
          if (data.error === '0') {
            dispatch(fetchSuccess('RESETBYQA'));
          } else {
            dispatch(fetchError('RESETBYQA', `重置失败: ERR-${data.error}`));
          }
        });
      } else {
        dispatch(fetchError('RESETBYQA', `重置失败: RES-${res.status}`));
      }
    }, e => dispatch(fetchError('RESETBYQA', `重置失败: ${e}`)));
  };
};

export const getQA = (id) => {
  return (dispatch, getState) => {
    dispatch(fetchStart('GETQA'));
    const temp = {
      type: 'GetQA',
      id
    };
    fetchTemplete('LoginHandler', temp).then(res => {
      if (res.ok) {
        res.json().then(data => {
          if (data.error === '0') {
            dispatch(fetchSuccess('GETQA', data.data[0].question));
          } else {
            dispatch(fetchError('GETQA', `获取问题失败: ERR-${data.error}`));
          }
        });
      } else {
        dispatch(fetchError('GETQA', `获取问题失败: RES-${res.status}`));
      }
    }, e => dispatch(fetchError('GETQA', `获取问题失败: ${e}`)));
  };
};

export const changePassword = (payload) => {
  return (dispatch, getState) => {
    dispatch(fetchStart('CHANGEPW'));
    const temp = {
      type: 'Rank_UpdatePW',
      id: getState().login.infos.ID,
      pw: getState().login.infos.token,
      'old_pw': payload.oldPW,
      'new_pw': payload.newPW
    };
    fetchTemplete('LoginHandler', temp).then(res => {
      if (res.ok) {
        res.json().then(data => {
          if (data.error === '0') {
            dispatch(fetchSuccess('CHANGEPW', '更改密码成功'));
          } else {
            dispatch(fetchError('CHANGEPW', `更改密码失败: ERR-${data.error}`));
          }
        });
      } else {
        dispatch(fetchError('CHANGEPW', `更改密码失败: RES-${res.status}`));
      }
    }, e => dispatch(fetchError('CHANGEPW', `更改密码失败: ${e}`)));
  };
};

export const changeQuestion = (payload) => {
  return (dispatch, getState) => {
    dispatch(fetchStart('CHANGEQA'));
    const temp = {
      type: 'Rank_UpdateQA',
      id: getState().login.infos.ID,
      pw: getState().login.infos.token,
      question: payload.question,
      answer: payload.answer,
      'old_pw': payload.oldPW
    };
    fetchTemplete('LoginHandler', temp).then(res => {
      if (res.ok) {
        res.json().then(data => {
          if (data.error === '0') {
            dispatch(fetchSuccess('CHANGEQA', '更改问题成功'));
          } else {
            dispatch(fetchError('CHANGEQA', `更改问题失败: ERR-${data.error}`));
          }
        });
      } else {
        dispatch(fetchError('CHANGEQA', `更改问题失败: RES-${res.status}`));
      }
    }, e => dispatch(fetchError('CHANGEQA', `更改问题失败: ${e}`)));
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
    fetchTemplete('LoginHandler', temp).then(res => {
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
    fetchTemplete('LoginHandler', temp).then(res => {
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
    fetchTemplete('LoginHandler', temp).then(res => {
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
    fetchTemplete('LoginHandler', form).then(res => {
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
