function PriorityQueue() {
  var items = [];

  function QueueElement(element, priority) {
    this.element = element;
    this.priority = priority;
  }

  this.enqueue = function(element, priority) {
    var queueElement = new QueueElement(element, priority);
    var added = false;
    if (items.length == 0) {
      items.push(queueElement);
    } else {
      for (let i = 0; i < items.length; i++) {
        if (queueElement.priority < items[i].priority) {
          items.splice(i, 0, queueElement);
          added = true;
          break;
        }
      }
      if (!added) {
        items.push(queueElement);
      }
    }
  }

  this.print = function() {
    console.log('-----');
    var temList = [];
    for (let i = 0; i < items.length; i++) {
      temList.push(items[i].element);
      console.log(items[i].element + ' ... ' + items[i].priority);
    }
    console.log('Now the list is: ' + temList.toString());
  }
}


var priorityQueue = new PriorityQueue();

priorityQueue.enqueue('i\'m 2-1', 2);
priorityQueue.print();
priorityQueue.enqueue('i\'m 1-1', 1);
priorityQueue.print();
priorityQueue.enqueue('i\'m 1-2', 1);
priorityQueue.print();
