
// @ts-ignore
import { get, post, postJson, postForm, put, deleteForm } from '../utils/request'


export function create (params) {
  return postJson(`/articles`, params)
}

export function query (params) {
  return get(`/articles`, params)
}

export function detail (params) {
  const {id} = params;
  return get(`/articles/${id}`)
}

export function update (params) {
  const {id} = params;
  return put(`/articles/${id}`, params)
}

export function remove (params) {
  const {id} = params;
  return deleteForm(`/articles/${id}`)
}

export function setTop (params) {
  const {id} = params;
  return put(`/articles/${id}/setTop`, params)
}

export function queryGroup (params) {
  return get(`/groups`, params)
}
