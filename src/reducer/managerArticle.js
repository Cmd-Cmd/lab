function formatNowDate(delta = 0) {
  let temp = new Date();
  temp.setTime(temp.getTime() + 86400000 * delta);
  const year = temp.getFullYear();
  const month = temp.getMonth() + 1;
  const day = temp.getDate();
  return `${year}-${month}-${day}`;
}

const initState = {
  startTime: formatNowDate(-3),
  endTime: formatNowDate()
};

const managerArticle = (state = initState, action) => {
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case 'CHANGE_MANAGER_ARTICLE_TIME':
      if (action.payload.type === 'start') {
        nextState.startTime = action.payload.time;
      }
      if (action.payload.type === 'end') {
        nextState.endTime = action.payload.time;
      }
      break;
    default:
      return state;
  }
  return nextState;
};

export default managerArticle;
