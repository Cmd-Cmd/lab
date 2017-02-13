const test = [
  {id: 0, title: 'Cmd'},
  {id: 1, title: 'Cmd'},
  {id: 2, title: 'Cmd'},
  {id: 3, title: 'Cmd'},
  {id: 4, title: 'Cmd'},
  {id: 5, title: 'Cmd'},
  {id: 6, title: 'Cmd'},
  {id: 7, title: 'Cmd'},
  {id: 8, title: 'Cmd'}
];

const initState = {
  newsData: test,
  noticeData: test,
  todayData: test
};

const listView = (state = initState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default listView;
