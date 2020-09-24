class Deque<T> {
  private items: any;
  private count: number;
  private lowerCount: number;
  constructor() {
    this.items = {};
    this.count = 0;
    this.lowerCount = 0;
  }
  isEmpty() {
    return this.size() === 0;
  }
  clear() {
    this.items = {};
    this.count = 0;
    this.lowerCount = 0;
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
  addFront(element: T) {
    //添加到双端队列的前端
    if (this.isEmpty()) {
      this.addBack(element);
      return;
    } else if (this.lowerCount > 0) {
      this.items[--this.lowerCount] = element;
      return;
    }
    for (let i = this.count; i > 0; i--) {
      this.items[i + 1] = this.items[i];
    }
    this.items[this.lowerCount] = element;
    this.count++;
  }
  addBack(element: T) {
    //添加到双端队列的后端
    this.items[this.count++] = element;
  }
  removeFront() {
    if (this.isEmpty()) {
      return false;
    }
    const element = this.items[this.lowerCount];
    delete this.items[this.lowerCount++];
    return element;
  }
  removeBack() {
    if (this.isEmpty()) {
      return false;
    }
    const element = this.items[this.count - 1];
    delete this.items[--this.count];
    return element;
  }
  peekFront() {
    //展示前端
    return this.items[this.lowerCount];
  }
  peekBack() {
    //展示后端
    return this.items[this.count];
  }
}
