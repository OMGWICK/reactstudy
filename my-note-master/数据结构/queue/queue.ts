export class Queue {
  private items: { [x: number]: any };
  private count: number;
  private lowerCount: number;
  constructor() {
    this.items = {};
    this.count = 0;
    this.lowerCount = 0;
  }
  enqueue(element: any) {
    //向队尾添加元素
    this.items[this.count++] = element;
  }
  dequeue() {
    //删除队列第一项并返回
    const element = this.items[this.lowerCount];
    delete this.items[this.lowerCount];
    this.lowerCount++;
    return element;
  }
  peek() {
    //查询队列第一个元素
    return this.items[this.lowerCount];
  }
  isEmpty() {
    return this.count - this.lowerCount === 0;
  }
  size() {
    return this.count - this.lowerCount;
  }
  toString() {
    if (this.isEmpty()) {
      return '';
    }
    return Object.entries(this.items)
      .map(([key, value]) => key + '=>' + value)
      .toString();
  }
}
