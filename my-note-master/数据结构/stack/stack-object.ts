class Stack {
  private count: number;
  private _items = Symbol('items');
  constructor() {
    this.count = 0;
    // this.items = {};
    //修改为外部不能修改,和只能通过特定接口
    this[this._items] = {};
  }
  push(element) {
    this[this._items][this.count++] = element;
  }
  pop() {
    const element = this[this._items][--this.count];
    delete this[this._items][this.count];
    return element;
  }
  peek() {
    return this[this._items][this.count];
  }
  isEmpty() {
    return this.count === 0;
  }
  clear() {
    this.count = 0;
    this[this._items] = {};
    //也可以使用LIFO原则
    // while (!this.isEmpty()) {
    //   this.pop();
    // }
  }
  size() {
    return this.count;
  }
  toString() {
    if (this.isEmpty()) {
      return '';
    } else {
      let objString = '';
      for (let i = 0; i < this.count; i++) {
        objString += ` ${i}=>${this[this._items][i]} `;
      }
      return objString;
    }
  }
}

module.exports = Stack;
