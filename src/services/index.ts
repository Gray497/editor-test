
// @ts-ignore
import { get, post, postJson, postForm, put, deleteForm } from '../utils/request'


export function getStatus () {
  return get(`/status`)
}
