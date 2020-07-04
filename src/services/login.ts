
// @ts-ignore
import { get, post, postJson, postForm, put, deleteForm } from '../utils/request'

export interface LoginParamsType {
  account: string;
  password: string;
}


export function login (params: LoginParamsType) {
  return postJson(`/login`, params)
}

export function getHi () {
  return get(`/`)
}

export function logout() {
  return post(`/logout`)
}
