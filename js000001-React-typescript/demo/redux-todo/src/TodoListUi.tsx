import { Input, Button, List } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';
interface Props {
  todo: any;
  changeValue: Function;
  deleteItem: Function;
  addList: Function;
}
//分离逻辑和UI
function TodoListUi({ todo, changeValue, deleteItem, addList }: Props) {
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ paddingBottom: '20px' }}>
        <Input
          style={{ width: '250px', marginRight: '10px' }}
          placeholder={todo.inputValue}
          onChange={(e) => changeValue(e)}
          value={todo.value}
        ></Input>
        <Button type="primary" onClick={() => addList()}>
          增加
        </Button>
      </div>
      <div style={{ marginRight: '10px', width: '300px' }}>
        <List
          bordered
          renderItem={(item, index) => (
            <List.Item onClick={() => deleteItem(index)}>{item}</List.Item>
          )}
          dataSource={todo.list as string[]}
        ></List>
      </div>
    </div>
  );
}
export default TodoListUi;
