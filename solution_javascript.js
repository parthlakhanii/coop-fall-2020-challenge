class EventSourcer {
  constructor() {
    this.value = 0;
    this.stack = []
    this.history = []
  }
  add(num) {
    this.value += num
    this.stack.push([num, 'add'])
    return this.value
  }
  subtract(num) {
    this.value -= num
    this.stack.push([num, 'sub'])
    return this.value
  }
  undo() {
    if (this.stack.length == 0) {
      return this.value
    }
    this.stack[this.stack.length - 1][1] == 'add' ?
      this.value -= this.stack[this.stack.length - 1][0] :
      this.value += this.stack[this.stack.length - 1][0]
    this.history.push(this.stack.pop())
    return this.value
  }
  redo() {
    if (this.history.length == 0) {
      return this.value
    } else {
      this.history[this.history.length - 1][1] == 'add' ?
        this.value += this.history[this.history.length - 1][0] :
        this.value -= this.history[this.history.length - 1][0]
      this.stack.push(this.history.pop())
    }
    return this.value
  }
  bulk_undo(num) {
    for (let i = 0; i < num; i++) this.undo()
  }
  bulk_redo(num) {
    for (let i = 0; i < num; i++) this.redo()
  }
}

// ----- Do not modify anything below this line (needed for test suite) ------
module.exports = EventSourcer;
