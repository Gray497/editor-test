import axios from 'axios'
import config from 'utils/config';
import { message } from 'antd'
import qs from 'qs'
import { history } from 'umi';

const instance = axios.create({
  baseURL: config.API,
  // withCredentials: true
})

instance.interceptors.request.use(
  config => {
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    console.log(error.response)
    if (error.response.status === 401){
      window.location = '/login';
      // routerRedux.push('/login');
    }
    message.error(error.response.data.errorMsg)
    // console.log(error.response)
    // console.log(error.response.data.errorMsg)
    // if (error.response) {
    // }
    return Promise.resolve(error.response)
  }
)

export const request = instance

export function get(url, params) {
  console.log('get params============', params)
  return request({
    url,
    method: 'get',
    params,
    headers: {
      'authorization': localStorage.getItem('authorization'),
    }
  })
}

export function deleteParam(url, params) {
  return request({
    url: url + '?' + qs.stringify(params),
    method: 'delete',
    // params,
    headers: {
      'Content-Type': ' application/x-www-form-urlencoded',
      'authorization': localStorage.getItem('authorization'),
    }
  })
}

export function deleteForm(url, params) {
  return request({
    url: url,
    method: 'delete',
    params,
    headers: {
      'Content-Type': ' application/x-www-form-urlencoded',
      'authorization': localStorage.getItem('authorization'),
    }
  })
}



export function post(url, params) {
  console.log('post params============', params)
  return request({
    url,
    method: 'post',
    // data: params,
    data: qs.stringify(params),
    headers: {
      'Content-Type': ' application/x-www-form-urlencoded',
      'authorization': localStorage.getItem('authorization'),
    }
  })
}

export function postJson(url, params) {
  return request({
    method: 'post',
    url,
    data: params,
    headers: {
      'Content-Type': 'application/json',
      'authorization': localStorage.getItem('authorization'),
    }
  })
}

export function put(url, params) {
  console.log('put params============', params)
  return request({
    method: 'put',
    url,
    data: params,
    headers: {
      'authorization': localStorage.getItem('authorization'),
    }
  })
}

export function postForm(url, params) {
  return request({
    method: 'post',
    url,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data',
      'authorization': localStorage.getItem('authorization'),
    }
  })
}

// export function isSuccess(data) {
//   return data.data.httpCode === 200
// }
//
// export function isFail(data) {
//   return data.data.httpCode !== 200
// }
//
// export function getRequestData(data) {
//   if (isFail(data)) {
//     return null
//   }
//   return data.data
// }
