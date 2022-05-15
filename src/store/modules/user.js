import { login, logout, getInfo } from '@/api/user'
// 通过cookie存储用户token
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
//3种路由全选
import {constantRoutes,asyncRoutes,anyRoutes} from "@/router"
const getDefaultState = () => {
  return {
    //第一次从cookie当中读取
    token: getToken(),
    //用户名
    name: '',
    //头像
    avatar: '',
    //可操作按钮
    buttons:[],
    //角色
    roles:[],
    //服务器获取的当前用户可以操作的全部异步路由数据
    allAsyncRoutes:[],
    //当前登录用户可具有的路由全选
    currentAsyncRoutes:[]
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERINFO(state,info){
    //用户名
    state.name = info.name;
    //头像
    state.avatar = info.avatar;
    //角色
    state.roles = info.roles;
    //所有异步路由数据
    state.allAsyncRoutes = info.routes;
  },
  //设置最终用户可拥有的路由
  SET_ROUTES(state,userAsyncRoutes){
    //常量路由和异步路由和任意路由合并
    state.currentAsyncRoutes = constantRoutes.concat(userAsyncRoutes,anyRoutes);
    //动态给路由器添加路由
    router.addRoutes([...userAsyncRoutes,...anyRoutes]);
  }
}

/**
 * 
 * @param {array} all 所有的异步路由信息
 * @param {array} selfRoutes 服务器获取到的当前账户所具有的异步路由信息
 */
function getOwnAsyncRoutes(allAsyncRoutes,selfRoutes){
  return allAsyncRoutes.filter(item => {
    //当前账户异步路由信息包含了正在遍历的路由的name,则存入
    if(selfRoutes.includes(item.name)){
      //含有二级路由
      if(item.children && item.children.length){
        getOwnAsyncRoutes(item.children,selfRoutes);
      }
      return true;
    }
  });
}

const actions = {
  // 用户登录
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        //解构复制获取数据
        const { data } = response;
        //存储token
        commit('SET_TOKEN', data.token);
        //设置token到cookie
        setToken(data.token);
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 从token获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response;
        if (!data) {
          return reject('认证失败!请再次尝试登录!')
        }
         //成功获取到用户数据,设置用户路由到state当中
        commit("SET_ROUTES",getOwnAsyncRoutes(asyncRoutes,data.routes))
        //设置用户基本信息
        commit("SET_USERINFO",data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 用户退出登录
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 移除token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

