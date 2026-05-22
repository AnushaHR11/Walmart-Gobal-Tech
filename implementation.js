class PowerOfTwoMaxHeap {
  constructor(childPower) {
    if (!Number.isInteger(childPower) || childPower < 0) {
      throw new Error("childPower must be a non-negative integer");
    }

    this.childPower = childPower;
    this.childrenPerParent = 1 << childPower; // 2^childPower
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  insert(value) {
    this.heap.push(value);
    this.#bubbleUp(this.heap.length - 1);
  }

  popMax() {
    if (this.heap.length === 0) {
      return null;
    }

    const maxValue = this.heap[0];
    const lastValue = this.heap.pop();

    if (this.heap.length > 0) {
      this.heap[0] = lastValue;
      this.#bubbleDown(0);
    }

    return maxValue;
  }

  peekMax() {
    return this.heap.length === 0 ? null : this.heap[0];
  }

  #parentIndex(childIndex) {
    return Math.floor((childIndex - 1) / this.childrenPerParent);
  }

  #firstChildIndex(parentIndex) {
    return parentIndex * this.childrenPerParent + 1;
  }

  #bubbleUp(index) {
    const heap = this.heap;
    const value = heap[index];

    while (index > 0) {
      const parentIndex = this.#parentIndex(index);

      if (heap[parentIndex] >= value) {
        break;
      }

      heap[index] = heap[parentIndex];
      index = parentIndex;
    }

    heap[index] = value;
  }

  #bubbleDown(index) {
    const heap = this.heap;
    const length = heap.length;
    const childrenCount = this.childrenPerParent;
    const value = heap[index];

    while (true) {
      const firstChild = this.#firstChildIndex(index);

      if (firstChild >= length) {
        break;
      }

      let maxChildIndex = firstChild;
      const lastChild = Math.min(firstChild + childrenCount, length);

      for (let childIndex = firstChild + 1; childIndex < lastChild; childIndex++) {
        if (heap[childIndex] > heap[maxChildIndex]) {
          maxChildIndex = childIndex;
        }
      }

      if (heap[maxChildIndex] <= value) {
        break;
      }

      heap[index] = heap[maxChildIndex];
      index = maxChildIndex;
    }

    heap[index] = value;
  }
}

// Example usage
const heap = new PowerOfTwoMaxHeap(2); // each parent has 2^2 = 4 children

heap.insert(10);
heap.insert(40);
heap.insert(20);
heap.insert(80);
heap.insert(5);

console.log(heap.popMax()); // 80
console.log(heap.popMax()); // 40
console.log(heap.popMax()); // 20
console.log(heap.popMax()); // 10
console.log(heap.popMax()); // 5
console.log(heap.popMax()); // null