const initState = '首页';

const navTab = (state = initState, action) => {
  switch (action.type) {
    case 'CHANGE_NAV':
      return action.payload;
    default:
      return state;
  }
};

export default navTab;
