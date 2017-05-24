export const sidebarData = [
  {
    name: '个人中心',
    links: [
      {name: '个人信息', to: '/system/person'},
      {name: '修改密码和问题', to: '/system/changePassword'}
    ]
  },
  {
    name: '管理员中心',
    // level: {type: 'control', needs: ['管理权限']},
    links: [
      {name: '创建新用户', to: '/system/newUser'},
      {name: '用户信息管理', to: '/system/userInfoList'},
      {name: '用户权限管理', to: '/system/userRankList'},
    ]
  },
  {
    name: '药品库',
    links: [
      {
        name: '新增药品',
        to: '/system/addDrug',
        // level: {type: 'drug', needs: ['管理权限']}
      },
      {name: '药品信息管理', to: '/system/managerDrug'},
      {name: '药品出入库记录', to: '/system/drugInOut'}
    ]
  },
  {
    name: '试剂库',
    links: [
      {name: '新增试剂', to: '/system/addMix'},
      {name: '试剂信息管理', to: '/system/managerMix'}
    ]
  },
  {
    name: '文章管理',
    links: [
      {name: '发布文章', to: '/system/newArticle'},
      {name: '管理文章', to: '/system/managerArticle'}
    ]
  },
  {
    name: '仪器库',
    links: [
      {name: '新增仪器', to: '/system/addDevice'},
      {name: '仪器信息管理', to: '/system/managerDevice'}
    ]
  },
  {
    name: '助理中心',
    // level: {type: 'student', needs: ['管理权限', '一般权限']},
    links: [
      {name: '签到信息', to: 'system/checkInfo'},
      {name: '签到查询', to: 'system/checkSearch'},
      {name: '空闲时间表', to: 'system/freeTime'},
      {name: '我的排班表', to: 'system/workTimeMine'},
      {name: '每周排班表', to: 'system/workTimeAll'}
    ]
  }
];
