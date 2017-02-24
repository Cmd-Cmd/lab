const cont = '<h2>《永远的蝴蝶》原文</h2><p>那时候刚好下着雨，柏油路面湿冷冷的，还闪烁着青、黄、红颜色的灯火。我们就在骑楼下躲雨，看绿色的邮筒孤独地站在街的对面。我白色风衣的大口袋里有一封要寄给南部的母亲的信。樱子说她可以撑伞过去帮我寄信。我默默点头。</p><p>“谁叫我们只带来一把小伞哪。”她微笑着说，一面撑起伞，准备过马路帮我寄信。从她伞骨渗下来的小雨点，溅在我的眼镜玻璃上。</p><p>随着一阵拔尖的煞车声，樱子的一生轻轻地飞了起来。缓缓地，飘落在湿冷的街面上，好像一只夜晚的蝴蝶。</p><p>虽然是春天，好像已是秋深了。</p><p>她只是过马路去帮我寄信。这简单的行动，却要叫我终身难忘了。我缓缓睁开眼，茫然站在骑楼下，眼里裹着滚烫的泪水。世上所有的车子都停了下来，人潮涌向马路中央。没有人知道那躺在街面的，就是我的，蝴蝶。这时她只离我五公尺，竟是那么遥远。更大的雨点溅在我的眼镜上，溅到我的生命里来。</p><p>为什么呢？只带一把雨伞？</p><p>然而我又看到樱子穿着白色的风衣，撑着伞，静静地过马路了。她是要帮我寄信的。那，那是一封写给南部母亲的信。我茫然站在骑楼下，我又看到永远的樱子走到街心。其实雨下得并不大，却是一生一世中最大的一场雨。而那封信是这样写的，年轻的樱子知不知道呢？</p><blockquote><p>妈：我打算在下个月和樱子结婚。</p></blockquote><hr class="am-article-divider"/><h2>作者简介</h2><p>《永远的蝴蝶》作者陈启佑，笔名渡也、江山之助，台湾省嘉义市人，中国文化大学中国文学博士，曾任教于嘉义农专、台湾教育学院。</p><hr class="am-article-divider"/><h2>文章赏析</h2><h3>赏析一</h3><p>《永远的蝴蝶》就像一支低沉而哀怨的悲曲，幽幽道来，委婉动人。读罢此文，脑海中一直浮现着这样一个场景：阴雨中，樱子如蝴蝶般轻轻飞了起来，又缓缓落到了街面上。雨是冰凉的，街面是湿冷的，蝴蝶的飘飞是凄美的，又是令人伤痛的。</p><h3>赏析二</h3><p>文章有几点尤值得我们好好品味。一是作品以“雨”为线索，贯穿全文的始终。悲剧因“雨”而生，小说开篇写“雨”，正是对不幸和灾难起因的一个交代。樱子遭遇不幸后，又写“更大的雨点溅在我的眼镜上，溅到我的生命里来”，“成为一生一世的一场雨”。显然，“雨”又成为泪水和痛苦的象征。同时，以“雨”贯穿全文，也造成笼罩全文的阴冷凄凉的氛围。二是作家善于反复运用细节。如三次写到“站在骑楼下”，以此使“我”的情感思绪变化的脉络和层次更加清楚明显；两次写到樱子“穿着白色的风衣，撑着伞”，这是对“我”的心理刻画，突出了樱子美丽清纯的形象，也表达了“我”对樱子永不磨灭的爱。三是高超的谋篇布局技巧。直到作品的结尾处才告诉读者信的内容，这样构思，无疑加重了作品的悲剧色彩，让人哀痛欲绝，心不堪受。正因为作家善于谋篇布局，匠心独运，作品才有了很强的感染力。</p>';

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

const getStart = (housing, id) => {
  console.log(`GET_START - ${housing} - ${id}`);
  return {
    type: 'GET_START'
  };
};

const getSuccess = (housing, id, content) => {
  console.log(`GET_SUCCESS - ${housing} - ${id}`);
  return {
    type: 'GET_FINISH',
    payload: content
  };
};

const getError = (housing, id, content) => {
  console.log(`GET_ERROR - ${housing} - ${id}`);
  return {
    type: 'GET_FINISH',
    payload: content
  };
};

export const getEssay = (housing, id) => {
  if (id === 0) {
    return (dispatch, getState) => {
      dispatch(getStart(housing, id));
      dispatch(getSuccess(housing, id, cont));
    };
  } else if (id === 1) {
    return (dispatch, getState) => {
      dispatch(getStart(housing, id));
      fetch('https://api.github.com/repos/gaearon/redux-thunk/readme')
      .then(res => {
        if (res.ok) {
          res.json().then(data => {
            dispatch(getSuccess(housing, id, JSON.stringify(data)));
          });
        } else {
          dispatch(dispatch(getError(housing, id, res.status)));
        }
      });
    };
  }
  return (dispatch, getState) => {
    dispatch(getStart(housing, id));
    dispatch(getError(housing, id, ''));
  };
};
