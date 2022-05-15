const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  //用户角色
  roles: state => state.user.roles,
  //最终用户可拥有的路由
  currentAsyncRoutes: state => state.user.currentAsyncRoutes,
}
export default getters
