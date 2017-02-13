const initState = {
  crsData: [
    {
      img: process.env.PUBLIC_URL + '/img/banner1.jpg', title: 'banner1',
      link: {type: 'NEWS', id: 0}
    },
    {
      img: process.env.PUBLIC_URL + '/img/banner2.jpg', title: 'banner2',
      link: {type: 'NOTICE', id: 0}
    },
    {
      img: process.env.PUBLIC_URL + '/img/banner3.jpg', title: 'banner3',
      link: {type: 'TODAY', id: 0}
    },
    {
      img: process.env.PUBLIC_URL + '/img/banner4.jpg', title: 'banner4',
      link: {type: 'NEWS', id: 100}
    },
  ]
};

const carousel = (state = initState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default carousel;
