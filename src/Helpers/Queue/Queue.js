class Queue {
  constructor() {
    this.QueueArray = [];
  }
  Enqueue(data) {
    this.QueueArray.unshift(data);
  }
  Dequeue() {
    return this.QueueArray.pop();
  }
  Peek() {
    return this.QueueArray[this.QueueArray.length - 1];
  }
  GetAll() {
    const arr = [];
    for (let i = this.QueueArray.length - 1; i >= 0; i--) {
      arr.push(this.QueueArray[i]);
    }
    return arr;
  }
  Count() {
    return this.QueueArray.length;
  }
}

export default Queue;
