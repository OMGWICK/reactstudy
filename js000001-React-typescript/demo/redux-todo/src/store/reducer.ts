import { ActionTypes } from './actionType';

const defaultState = {
  inputValue: 'write something',
  list: ['默认'],
  value: ''
};
//reducer只能接受state,不能改变state
//reducer必须是纯函数,只依赖于参数来返回值
export default (state = defaultState, action: any) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case ActionTypes.CHNAGE_INPUT: {
      newState.value = action.value;
      break;
    }
    case ActionTypes.ADD_VALUE: {
      if (state.value.trim() !== '' && !state.list.includes(state.value)) {
        newState.list.push(state.value);
      }
      break;
    }
    case ActionTypes.DELETE_VALUE: {
      newState.list.splice(action.index, 1);
      break;
    }
    case ActionTypes.GET_LIST: {
      newState.list = action.list;
      break;
    }
  }
  return newState;
};
