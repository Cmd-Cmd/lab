export const changeSystemActive = (payload) => {
  return {
    type: 'CHANGE_SYSTEM_ACTIVE',
    payload
  };
};

export const navChangeTo = (payload) => {
  return {
    type: 'CHANGE_NAV',
    payload
  };
};

export const listingPageTo = (payload) => {
  return {
    type: 'CHANGE_PAGE',
    payload
  };
};

export const enterListing = (payload) => {
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

export const searchPageTo = (payload) => {
  return {
    type: 'CHANGE_SEARCH_PAGE',
    payload
  };
};

export const tableViewTime = (payload) => {
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

export const tablingTime = (payload) => {
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
