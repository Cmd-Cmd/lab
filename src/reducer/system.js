const initState = {
  active: 0
};

const system = (state = initState, action) => {
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case 'CHANGE_SYSTEM_ACTIVE':
      nextState.active = action.payload;
      break;
    default:
      return state;
  }
  return nextState;
};

export default system;
