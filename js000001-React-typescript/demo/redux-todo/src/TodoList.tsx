import React, { useState, useEffect } from 'react';
import TodoListUi from './TodoListUi';
import {
  changeInputAction,
  addListAction,
  deleteItemAction,
  getTodoList
} from './store/actionCreator';
import store from './store';
function TodoList() {
  const [todo, setTodo] = useState(store.getState());
  useEffect(() => {
    // thunk
    const action = getTodoList();
    store.dispatch(action);
  }, []);
  store.subscribe(() => {
    setTodo(store.getState());
  });
  return (
    <TodoListUi
      todo={todo}
      changeValue={changeValue}
      addList={addList}
      deleteItem={deleteItem}
    />
  );
}
function changeValue(e: any) {
  const action = changeInputAction(e.target.value);
  store.dispatch(action);
}
function addList() {
  const action = addListAction();
  store.dispatch(action);
}

function deleteItem(index: number) {
  const action = deleteItemAction(index);
  store.dispatch(action);
}
export default TodoList;
