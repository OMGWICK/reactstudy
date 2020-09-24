import React from 'react';
interface Props {
  todo: any;
  changeValue: Function;
  addList: Function;
  ListItem: JSX.Element[];
}
export default function TodoListUi({
  todo,
  changeValue,
  addList,
  ListItem
}: Props) {
  return (
    <>
      <input type="text" value={todo.value} onChange={(e) => changeValue(e)} />
      <button onClick={() => addList()}>提交</button>
      <ul>{ListItem}</ul>
    </>
  );
}
