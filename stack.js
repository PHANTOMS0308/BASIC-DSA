class Stack extends Array {
  constructor(...args) {
    super(...args);
  }

  get size() {
    return this.length;
  }

  peek() {
    return this.at(-1);
  }
}

module.exports = Stack;
