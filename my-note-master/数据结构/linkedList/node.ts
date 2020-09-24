export default class Node {
  public next: Node;
  constructor(public element: any) {
    this.element = element;
    //指向下一个元素的指针
    this.next = null;
  }
}
