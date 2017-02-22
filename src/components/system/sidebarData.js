export const sidebarData = [
  {
    name: '个人中心',
    links: [
      {name: '个人信息', to: '/PersonInfo'},
      {name: '修改密码', to: '/ChangePassword'}
    ]
  },
  {
    name: '管理员中心',
    links: [
      {name: '创建新用户', to: '/NewUser'},
      {name: '权限管理', to: 'ManagerRank'}
    ]
  },
  {
    name: '文章管理',
    links: [
      {name: '发布文章', to: '/NewArticle'},
      {name: '管理文章', to: '/ManagerArticle'}
    ]
  },
  {
    name: '药品库',
    links: [
      {name: '查询药品', to: '/SearchDrug'},
      {name: '药品信息管理', to: '/ManagerDrug'}
    ]
  },
  {
    name: '试剂库',
    links: [
      {name: '查询试剂', to: '/SearchReagent'},
      {name: '试剂信息管理', to: '/ManagerReagent'}
    ]
  },
  {
    name: '仪器库',
    links: [
      {name: '查询仪器', to: '/SearchDevice'},
      {name: '仪器信息管理', to: '/ManagerDevice'}
    ]
  }
];
