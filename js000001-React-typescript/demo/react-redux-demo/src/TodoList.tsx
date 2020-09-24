import React from 'react';
import TodoListUi from './TodoListUi';
import { connect } from 'react-redux';
import { ActionTypes } from './store/ActionTypes';
// eslint-disable-next-line no-unused-vars
import { Dispatch } from 'redux';
interface Props {
  todo: any;
  changeValue: Function;
  addList: Function;
}
function TodoList({ todo, changeValue, addList }: Props) {
  const ListItem = todo.list.map((e: string, index: number) => {
    return <li key={index}>{e}</li>;
  });
  return (
    <TodoListUi
      todo={todo}
      changeValue={changeValue}
      addList={addList}
      ListItem={ListItem}
    />
  );
}

//比如这里将state,映射成todolist的props中todo
const stateToProps = (state: any) => ({
  todo: state
});
//将dispatch映射成todolist的props中的changeValue
const dispatchToProps = (dispatch: Dispatch) => ({
  changeValue(e: any) {
    const action = {
      type: ActionTypes.CHANGE_VALUE,
      value: e.target.value
    };
    dispatch(action);
  },
  addList() {
    const action = {
      type: ActionTypes.ADD_LIST
    };
    dispatch(action);
  }
});
//连接器,把state,dispatch映射成当前组件的props
export default connect(stateToProps, dispatchToProps)(TodoList);
