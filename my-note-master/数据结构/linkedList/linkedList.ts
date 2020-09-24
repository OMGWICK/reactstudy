import defaultEqualsFn from './defaultEqualsFn';
import MNode from './node';

class LinkedList {
  private count: number;
  private equalsFn: (a: any, b: any) => boolean;
  private head: MNode;
  constructor(equalsFn = defaultEqualsFn) {
    //存储元素数量
    this.count = 0;
    //因为链表是动态的,所以需要一个地方来放头部的引用
    this.head = null;
    this.equalsFn = equalsFn;
  }
  push(element: any) {
    //向链表尾部添加元素
    const node = new MNode(element);
    let current: MNode;
    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      //遍历链表
      while (current.next !== null) {
        current = current.next;
      }
      //建立连接
      current.next = node;
    }
    this.count++;
  }
  insert(element: any, position: number) {
    const node = new MNode(element);
    let current = this.head;
    if (position === 0) {
      node.next = current;
      this.head = node;
      return;
    }
    //获取插入位置的前一个
    current = this.getElementAt(position - 1);
    //重新组装
    node.next = current.next;
    current.next = node;
    this.count++;
  }
  getElementAt(index: number) {
    let postion = 0;
    let current = this.head;
    if (!current) {
      return;
    }
    if (this.isEmpty()) {
      return;
    }
    while (postion !== index) {
      current = current.next;
      postion++;
    }
    return current;
  }
  remove(element: any) {
    let current = this.head;
    if (!current) {
      return;
    }
    if (this.equalsFn(current.element, element)) {
      this.count--;
      this.head = current.next;
      return current.element;
    }
    while (current.next !== null) {
      if (this.equalsFn(element, current.next.element)) {
        const result = current.next;
        current.next = current.next.next;
        this.count--;
        return result;
      }
    }
    return;
  }
  removeAt(index: number) {
    let position = 0;
    let current = this.head;
    if (!current) {
      return;
    }
    if (index === 0) {
      this.head = current.next;
      this.count--;
      return current;
    }
    while (index < this.count && position !== index - 1) {
      current = current.next;
      position++;
    }
    if (position === index - 1) {
      const result = current.next;
      current.next = current.next.next;
      this.count--;
      return result;
    }
    return;
  }
  indexOf(element: any) {
    let current = this.head;
    let postion = 0;
    if (!current) {
      return -1;
    }
    while (postion < this.count && !this.equalsFn(element, current.element)) {
      current = current.next;
      postion++;
    }
    if (this.equalsFn(element, current.element)) {
      return postion;
    }
    return -1;
  }
  toString() {
    if (this.isEmpty()) {
      return '';
    }
    let current = this.head;
    let string = current.element.toString();
    while (current.next !== null) {
      string = `${string},${current.element}`;
      current = current.next;
    }
    return string;
  }
  size() {
    return this.count;
  }
  isEmpty() {
    return this.count === 0;
  }
}
const linkedList = new LinkedList();
linkedList.push(1);
linkedList.insert(123, 1);
console.log(linkedList.getElementAt(1));
console.log(linkedList.isEmpty());
console.log(linkedList.remove(123));
console.log(linkedList);
linkedList.push('我是我是');
linkedList.push('张飞');
console.log(linkedList);
console.log(`------------------------------------------------`);
console.log(linkedList.indexOf('张飞'));
console.log(linkedList.toString());
