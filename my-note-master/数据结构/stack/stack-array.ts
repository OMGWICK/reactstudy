//LIFO后进先出
class Stack2 {
  private items: any[];
  constructor() {
    this.items = [];
  }
  push(element: any) {
    //推入栈顶
    this.items.push(element);
  }
  pop() {
    //从栈顶取出
    return this.items.pop();
  }
  peek() {
    //展示栈顶元素
    return this.items[this.items.length - 1];
  }
  isEmpty() {
    //是否为空
    return this.items.length === 0;
  }
  clear() {
    //清空栈
    this.items = [];
  }
  size() {
    //返回栈个数
    return this.items.length;
  }
}
