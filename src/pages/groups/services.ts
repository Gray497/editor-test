
// @ts-ignore
import { get, post, postJson, postForm, put, deleteForm } from '@/utils/request'


export function create (params) {
  return postJson(`/groups`, params)
}

export function query (params) {
  return get(`/groups`, params)
}

export function detail (params) {
  const {id} = params;
  return get(`/groups/${id}`)
}

export function update (params) {
  const {id} = params;
  return put(`/groups/${id}`, params)
}

export function remove (params) {
  const {id} = params;
  return deleteForm(`/groups/${id}`)
}

export function setTop (params) {
  const {id} = params;
  return put(`/groups/${id}/setTop`, params)
}
