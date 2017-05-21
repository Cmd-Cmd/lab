export const imgNumRefresh = () => {
  return {
    type: 'IMGNUM_REFRESH'
  };
};

export const changeCheckInfoTime = (time, type) => {
  return {
    type: 'CHANGE_CHECK_INFO_TIME',
    payload: {
      time,
      type
    }
  };
};

export const checkSearchFilter = (val, key) => {
  return {
    type: 'CHECK_SEARCH_FILTER',
    payload: {
      val,
      key
    }
  };
};

export const changeCheckSearchTime = (time, type) => {
  return {
    type: 'CHANGE_CHECK_SEARCH_TIME',
    payload: {
      time,
      type
    }
  };
};

export const workTimeMineChange = payload => {
  return {
    type: 'WORKTIME_MINE_CHANGE',
    payload
  };
};

export const workTimeAllModalChange = payload => {
  return {
    type: 'WORKTIME_ALL_MODAL_CHANGE',
    payload
  };
};

export const workTimeAllChange = payload => {
  return {
    type: 'WORKTIME_ALL_CHANGE',
    payload
  };
};

export const freeTimeChange = payload => {
  return {
    type: 'FREE_TIME_CHANGE',
    payload
  };
};

export const deleteNewDeviceLoc = () => {
  return {
    type: 'DELETE_NEW_DEVICE_LOC'
  };
};

export const newDeviceLoc = () => {
  return {
    type: 'NEW_DEVICE_LOC'
  };
};

export const deviceLocChange = e => {
  let value = e.target.value;
  return {
    type: 'DEVICE_LOC_CHANGE',
    payload: {
      inx: e.currentTarget.dataset.key,
      name: e.target.name,
      value
    }
  };
};

export const deviceDetailChange = e => {
  return {
    type: 'DEVICE_DETAIL_CHANGE',
    payload: {
      name: e.target.name,
      value: e.target.value.trim()
    }
  };
};

export const managerDevicePageTo = payload => {
  return {
    type: 'MANAGER_DEVICE_PAGE_TO',
    payload
  };
};

export const setDeviceDetail = payload => {
  return {
    type: 'SET_DEVICE_DETAIL',
    payload
  };
};

export const resetArticle = () => {
  return {
    type: 'RESET_ARTICLE'
  };
};

export const changeArticleText = payload => {
  return {
    type: 'CHANGE_ARTICLE_TEXT',
    payload
  };
};

export const changeArticleId = payload => {
  return {
    type: 'CHANGE_ARTICLE_ID',
    payload
  };
};

export const changeArticleHits = payload => {
  return {
    type: 'CHANGE_ARTICLE_HITS',
    payload
  };
};

export const changeArticleContent = payload => {
  return {
    type: 'CHANGE_ARTICLE_CONTENT',
    payload
  };
};

export const changeArticleTitle = payload => {
  return {
    type: 'CHANGE_ARTICLE_TITILE',
    payload
  };
};

export const changeArticleType = payload => {
  return {
    type: 'CHANGE_ARTICLE_TYPE',
    payload
  };
};

export const changeManagerArticleTime = (time, type) => {
  return {
    type: 'CHANGE_MANAGER_ARTICLE_TIME',
    payload: {
      time,
      type
    }
  };
};

export const managerMixPageTo = payload => {
  return {
    type: 'MANAGER_MIX_PAGE_TO',
    payload
  };
};

export const deleteStruct = (flag, payload) => {
  return {
    type: 'DELETE_STRUCT',
    flag,
    payload
  };
};

export const addToStruct = (flag, payload) => {
  return {
    type: 'ADD_TO_STRUCT',
    flag,
    payload
  };
};

export const mixDetailChange = e => {
  return {
    type: 'MIX_DETAIL_CHANGE',
    payload: {
      name: e.target.name,
      value: e.target.value.trim()
    }
  };
};

export const setMixDetail = payload => {
  return {
    type: 'SET_MIX_DETAIL',
    payload
  };
};

export const changeRankFilter = payload => {
  return {
    type: 'CHANGE_RANK_FILTER',
    payload
  };
};

export const changeUserFilter = payload => {
  return {
    type: 'CHANGE_USER_FILTER',
    payload
  };
};

export const changeInOutTime = (time, type) => {
  return {
    type: 'CHANGE_INOUT_TIME',
    payload: {
      time,
      type
    }
  };
};

export const managerDrugPageTo = payload => {
  return {
    type: 'MANAGER_DRUG_PAGE_TO',
    payload
  };
};

export const deleteNewDrugLoc = () => {
  return {
    type: 'DELETE_NEW_DRUG_LOC'
  };
};

export const newDrugLoc = () => {
  return {
    type: 'NEW_DRUG_LOC'
  };
};

export const drugLocChange = (e) => {
  let value = e.target.value;
  if (e.target.name !== 'position') {
    value = Number(e.target.value.trim());
    if (isNaN(value) || value < 0) {
      value = 0;
    }
  }
  return {
    type: 'DRUG_LOC_CHANGE',
    payload: {
      inx: e.currentTarget.dataset.key,
      name: e.target.name,
      value
    }
  };
};

export const drugDetailChange = e => {
  return {
    type: 'DRUG_DETAIL_CHANGE',
    payload: {
      name: e.target.name,
      value: e.target.value.trim()
    }
  };
};

export const setDrugDetail = payload => {
  return {
    type: 'SET_DRUG_DETAIL',
    payload
  };
};

export const initReset = () => {
  return {
    type: 'INIT_RESET'
  };
};

export const logout = payload => {
  return {
    type: 'LOGOUT'
  };
};

export const personChange = payload => {
  return {
    type: 'SET_LOGIN_CHANGE',
    payload
  };
};

export const personForm = e => {
  return {
    type: 'CHANGE_LOGIN_DETAIL',
    payload: {
      name: e.target.name,
      value: e.target.value.trim()
    }
  };
};

export const changeSystemActive = payload => {
  return {
    type: 'CHANGE_SYSTEM_ACTIVE',
    payload
  };
};

export const navChangeTo = payload => {
  return {
    type: 'CHANGE_NAV',
    payload
  };
};

export const listingPageTo = payload => {
  return {
    type: 'CHANGE_PAGE',
    payload
  };
};

export const enterListing = payload => {
  return {
    type: 'ENTER_LISTING',
    payload
  };
};

export const enterSearch = () => {
  return {
    type: 'ENTER_SEARCH'
  };
};

export const searchPageTo = payload => {
  return {
    type: 'CHANGE_SEARCH_PAGE',
    payload
  };
};

export const tableViewTime = payload => {
  if (payload === 0) {
    return {
      type: 'RESET_TABLEVIEW_TIME'
    };
  }
  return {
    type: 'SET_TABLEVIEW_TIME',
    payload
  };
};

export const tablingTime = payload => {
  if (payload === 0) {
    return {
      type: 'RESET_TABLING_TIME'
    };
  }
  return {
    type: 'SET_TABLING_TIME',
    payload
  };
};
