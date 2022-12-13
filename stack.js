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

/**
  [Symbol.toPrimitive](hint) {
    if (hint === 'string') return JSON.stringify(this);
    else if (hint === 'number') return NaN;
    else return null;
  }
**/

  get [Symbol.toStringTag]() {
    return 'Stack'
  }

  toString() {
    return JSON.stringify(this);
  }
}

export {Stack};
