import request from '@/utils/request'

//登录api
export function login(data) {
  return request({
    url: '/admin/acl/index/login',
    method: 'post',
    data
  })
}

//从token获取用户信息api
export function getInfo(token) {
  return request({
    url: '/admin/acl/index/info',
    method: 'get',
    params: { token }
  })
}

//退出登录api
export function logout() {
  return request({
    url: '/admin/acl/index/logout',
    method: 'post'
  })
}
