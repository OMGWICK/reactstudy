import { ActionTypes } from './actionType';
import axios from 'axios';

export const changeInputAction = (value: string) => ({
  type: ActionTypes.CHNAGE_INPUT,
  value
});
export const addListAction = () => ({
  type: ActionTypes.ADD_VALUE
});
export const deleteItemAction = (index: number) => ({
  type: ActionTypes.DELETE_VALUE,
  index
});
export const getListAction = (list: string[]) => ({
  type: ActionTypes.GET_LIST,
  list
});
export const getTodoList = () => {
  //通过中间件判断是不是函数
  return (dispatch: Function) => {
    axios.get('http://127.0.0.1:5050/list').then((res) => {
      const action = getListAction(res.data);
      dispatch(action);
    });
  };
};
