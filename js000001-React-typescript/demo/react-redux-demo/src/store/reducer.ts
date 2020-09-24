import { ActionTypes } from './ActionTypes';
const initState = {
  value: 'defalut',
  list: ['default']
};
export default (state = initState, action: any) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case ActionTypes.CHANGE_VALUE: {
      newState.value = action.value;
      break;
    }
    case ActionTypes.ADD_LIST: {
      newState.list.push(state.value);
      break;
    }
  }
  return newState;
};
