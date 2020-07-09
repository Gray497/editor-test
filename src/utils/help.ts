import qs from 'qs'
import _ from 'lodash'

export const getLocationQuery = () => {

  let {search} = window.location;
  let locationQuery = qs.parse(search.substring(1));
  return locationQuery;
}

export const getGoToFilterURL = (value, remove) => {
  let {pathname, search} = window.location;
  let locationQuery = qs.parse(search.substring(1));
  let query = {
    ...locationQuery,
    ...value,
  };
  if (!_.isEmpty(remove) && _.isArray(remove)){
    try {
      remove.map(val => {
        if (!!query[val]){
          delete query[val]
        }
        return null;
      })
    } catch (e) {
      console.log(e)
    }
  }
  return `${pathname}?${qs.stringify(query)}`;
};


/*
 * 输入locationQuery，设置current跟pageSize为初始值然后返回
 * */
export const resetPagination = (query) => {
  return {
    ...query,
    pageNum: 1,
    pageSize: 20,
  };
};
