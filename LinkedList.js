/* 
----- Singly Linked List(SLL)
# P := JS primitive
# B := Boolean
# SLL := Singly Linked List Object
# SLNode := SLL Node class Object
# Self := Object calling the method
# Wrost-Case time complexity is presented
# The SLL is iterable

----- Read-Only Property
*** length --> P(Int)
*** isEmpty --> B
*** toArray --> []; O(n)
*** tail --> SLNode; O(n)
*** printSLL --> P(Str); O(n)

----- Public Method
*** fromArray([]) --> SLL; O(n)

----- SLL class Method
*** indexOf(P) --> P(Int); O(n)
*** prepend(P) --> Self; O(1)
*** append(P) --> Self; O(n)
*** addNodes(...P) --> Self; O(n)
*** pop() --> P; O(n)
*** shift() --> P; O(1)
*** valueAt(P(Int)) --> P; O(n)
*** hasValue(P) --> B; O(n)
*** insertAt(P, P(Int)) --> Self; O(n)
*** removeAt(P(Int)) --> P; O(n)
*** remove(P) --> P(Int); O(n)
*** removeAll(P) --> Self; O(n)
*** setValueAt(P, P(Int)) --> Self; O(n)
*** reverse() --> Self; O(n)
*** removeDuplicate() --> Self; O(n)
*** contains(sll) --> B; O(n)
*** concat(SLL) --> SLL; O(n)
*** deepConcat(SLL) --> SLL; O(n + m)
*** sort(B, Fx) --> SLL; O(n*LOG2(n));

*/
function defaultCompare(a, b, reverse = false) {
  if (a < b) return [-1, 1][+reverse];
  if (a > b) return [1, -1][+reverse];
  else return 0;
}

class SLNode {
  constructor(value) {
    this.val = value;
    this.next = null;
  }
}

class SLL {
  #length = 0;
  
  constructor() { 
    this.head = null; 
  }

  // Turn the SLL class into Iterable
  *[Symbol.iterator]() {
    for (let node = this.head; node !== null; node = node.next) {
      yield node.val;
    }
  }

  get length() { 
    return this.#length; 
  }

  get isEmpty() { 
    return !this.length;
  }

  // return the reference to last Node
  get tail() {
    let pointer = this.head;
    while (pointer && pointer.next) {
      pointer = pointer.next;
    }
    return pointer;
  }
  
  get toArray() {
    let result = [];
    let pointer = this.head;

    while (pointer) {
      result.push(pointer.val);
      pointer = pointer.next;
    }

    return result;
  }

  get printSLL() {
    let arr = [];
    let pointer = this.head;

    while (pointer) {
      // only work for array
      if (typeof pointer.val === 'object') {
        arr.push('[' + pointer.val.join('|') + ']');
      } else arr.push(pointer.val);
      pointer = pointer.next;
    }

    return arr.length ? arr.join(' -> ') + ' -> NULL' : 'NULL';
  }

// ******* changed it to from, and supports any iterable  
  static fromArray(arr) {
    let result = new SLL;

    return result.addNodes(...arr);
  }

  // Find index of first occurence, else -1;
  indexOf(value) {
    if (value === undefined) {
      throw new Error('Input parameter cannot be empty!');
    }

    let index = 0;
    let pointer = this.head;
    
    while (pointer) {
      if (pointer.val === value) return index;
      index++;
      pointer = pointer.next;
    }

    return -1;
  }
  
  // Add single node at the beginning
  prepend(value = null) {
    let node = new SLNode(value);
    
    node.next = this.head;
    this.head = node;
    this.#length++
    
    return this;
  }

  // Add single node at the end
  append(value = null) {
    let node = new SLNode(value);

    if (!this.head) this.head = node;
    else {
      let pointer = this.head;
      while (pointer.next) {
        pointer = pointer.next;
      }
      pointer.next = node;
    }
    
    this.#length++;
    return this;
  }

  // Add mutiple nodes at the end, good for SLL creation.
  // Optimized for a faster append, maintaing tail during the process.
  addNodes(...args) {
    let tail = this.tail;

    for (let val of args) {
      let node = new SLNode(val);
      
      if (!tail) this.head = tail = node;
      else {
        tail.next = node;
        tail = node;
      }

      this.#length++;
    }

    return this;
  }

  // Shortcut for removing the last element, use this.removeAt()
  pop() {
    return this.removeAt(-1);
  }

  // Shortcut for removing the first element, use this.removeAt()
  shift() {
    return this.removeAt(0);
  }

  // Helper function for index validation
  #validateIndex(index, max) {
    if (typeof index !== 'number' || Math.trunc(index) !== index) {
      throw new Error('Index has to be Integer type!');
    } else if (index < 0 || index > max) {
      throw new Error('Index out of Range!');
    }
  }
  
  // Return the value at specific index, if empty string return NULL
  // Suport -1 as last element
  valueAt(index) {
    if (index === -1) index = this.length - 1;
    if (!this.length) return null;

    this.#validateIndex(index, this.length - 1);

    let pointer = this.head;
    let count = 0;

    while (count < index) {
      pointer = pointer.next;
      count++;
    }

    return pointer.val;
  }

  hasValue(value) {
    return this.indexOf(value) >= 0;
  }
  
  // Add signle node in the middle, with a specific index;
  insertAt(value, index) {
    if (value === undefined) throw new Error('Value cannot be Empty!');
    this.#validateIndex(index, this.length);

    let node = new SLNode(value);
    let count = 0;
    let pointerA = this.head;

    if (index === 0) this.prepend(value);
    else if (index === this.#length) this.append(value);
    else {
      while (count < index - 1) {
        pointerA = pointerA.next;
        count++;
      }

      let pointerB = pointerA.next;
      node.next = pointerB;
      pointerA.next = node;

      this.#length++;
    }
    
    return this;
  }

  // Remove node at a specifc index, return the removed node value;
  removeAt(index) {
    if (index === -1) index = this.length - 1;
    if (!this.length) return null;

    this.#validateIndex(index, this.length - 1);

    let removed;
    
    if (index === 0) {
      removed = this.head.val;
      this.head = this.head.next;      
    } else {
      let pointer = this.head;
      let count = 0;

      while (count < index - 1) {
        pointer = pointer.next;
        count++;
      }

      removed = pointer.next.val;
      pointer.next = pointer.next.next;
    }

    this.#length--;
    return removed;
  }
  
  // Remove the first occurence, return the index, -1 if not found;
  remove(value) {
    if (value === undefined) throw new Error('Value cannot be empty!');
    if (!this.length) throw new Error('The linked list is empty!');

    let pointer = this.head;
    let previous = null;
    let index = 0;

    while (pointer) {
      if (pointer.val === value) {
        if (previous === null) this.head = this.head.next;
        else previous.next = pointer.next;
        
        this.#length--;
        return index;
      }

      previous = pointer;
      pointer = pointer.next;
      index++;
    }

    return -1;
  }

  // Remove all nodes whose value equals the input
  removeAll(value) {
    if (value === undefined) throw new Error('Value cannot be empty!');

    let pointer = this.head;
    let previous = null;

    while (pointer) {
      if (pointer.val === value) {
        if (!previous) this.head = pointer.next;
        else previous.next = pointer.next;
        
        this.#length--;
      } 
      else previous = pointer;

      pointer = pointer.next;
    }
    return this;
  }

  // Alter the node value at a specific index
  setValueAt(value, index) {
    if (index === -1) index = this.#length - 1;
    if (value === undefined) throw new Error('Value cannot be empty!');
    this.#validateIndex(index, this.length - 1);

    let count = 0;
    let pointer = this.head;

    while (count < index) {
      pointer = pointer.next;
      count++;
    }

    pointer.val = value;
    return this;
  }

  // Reverse the SLL;
  reverse() {
    let prev = null;
    let pointer = this.head;

    while (pointer) {
      [pointer.next, prev, pointer] = [prev, pointer, pointer.next];
    }

    this.head = prev;
    return this;
  }

  // Remove all duplicate Nodes
  removeDuplicate() {
    let hashset = new Set;
    let current = this.head;
    let prev = current;
    let count = 0;

    while (current) {
      if (hashset.has(current.val)) {
        count++;
        prev.next = current.next;
      } 
      else prev = current;

      hashset.add(current.val);
      current = current.next;
    }

    this.#length -= count;
    return this;
  }

  // Check if the input SLL is a sublist of Self;
  contains(sll) {
    let mainPointer = this.head;
    let subPointer = sll.head;

    while (mainPointer && subPointer) {
      if (mainPointer.val === subPointer.val) {
        subPointer = subPointer.next;
      }
      mainPointer = mainPointer.next;
    }

    return subPointer ? false : true;
  }

  // Simply Merging two SLL into one;
  // Operation in either SLL will affect the other;
  concat(sll) {
    if (!this.head || !sll.head) {
      throw Error('Both lists should not be empty!');
    }
    
    let tail = this.tail;
    tail.next = sll.head;

    this.#length += sll.length;
    return this;
  }

  // Copy the other SLL at the end of Self
  // Two SLL will be independent
  deepConcat(sll) {
    let pointer = sll.head;
    let tail = this.tail;

    while (pointer)  {
      if (!this.head) {
        this.head = new SLNode(pointer.val);
        tail = this.head;
      } else {
        tail.next = new SLNode(pointer.val);
        tail = tail.next;
      }

      pointer = pointer.next;
      this.#length++;
    }

    return this;
  }

  // Use a two-way mergeSort, in-place, constant space complexity O(32)
  sort(reverse = false, compare = defaultCompare) {
    let hashTable = new Array(32).fill(null);
    let pointer = this.head;

    while (pointer) {
      let listB = pointer;
      pointer = pointer.next;
      listB.next = null;

      let index = 0;
      while (index < 32 && hashTable[index]) {
        listB = this.merge(hashTable[index], listB, reverse, compare);
        hashTable[index] = null;
        index++;
      }

      if (index === 32) index--;
      hashTable[index] = listB;
    }

    let result = null;
    for (let i = 0; i < 32; i++) {
      result = this.merge(result, hashTable[i], reverse, compare);
    }

    this.head = result;
    return this;
  }

  // Merge two SLL into one;
  merge(listA, listB, reverse, compare = defaultCompare) {
    let pointerA = listA;
    let pointerB = listB;
    let dummy = new SLNode(null);
    let pointerC = dummy;

    while (pointerA && pointerB) {
      let res = compare(pointerA.val, pointerB.val, reverse);
      if (res < 0) {
        pointerC.next = pointerA;
        pointerA = pointerA.next;
      } else {
        pointerC.next = pointerB;
        pointerB = pointerB.next;
      }
      pointerC = pointerC.next;
    }

    if (pointerA) pointerC.next = pointerA;
    if (pointerB) pointerC.next = pointerB;

    return dummy.next;
  }

}


module.exports = SLL;
