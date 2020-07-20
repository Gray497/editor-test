
// @ts-ignore
import { get, post, postJson, postForm, put, deleteForm } from '../utils/request'


export function getGroupDetail (params: { id: any }) {
  return get(`/groups/${params.id}`)
}
