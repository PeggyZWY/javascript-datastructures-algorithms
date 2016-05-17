function Graph() {
  var vertices = [];
  var adjList = new Dictionary();


  this.addVertex = function(v) {
    vertices.push(v);
    adjList.set(v, []);
  };


  this.addEdge = function(v, w) {
    adjList.get(v).push(w);
    // 下面这个是为了DFS的拓扑排序注释掉的。如果图是无向图，下面这句代码必须要
    // adjList.get(w).push(v);
  };


  this.toString = function() {
    var s = '';
    for (let i = 0; i < vertices.length; i++) {
      s += vertices[i] + ' -> ';
      var neighbors = adjList.get(vertices[i]);
      for (let j = 0; j < neighbors.length; j++) {
        s += neighbors[j] + ' ';
      }
      s += '\n';
    }
    return s;
  };


  var initializeColor = function() {
    var color = {};
    for (let i = 0; i < vertices.length; i++) {
      color[vertices[i]] = 'white';
    }
    return color;
  };


  // 广度优先搜索
  this.bfs = function(v, callback) {
    var color = initializeColor(),
        queue = new Queue();
    queue.enqueue(v);

    while (!queue.isEmpty()) {
      var u = queue.dequeue(),
          neighbors = adjList.get(u);
      color[u] = 'grey';
      for (let i = 0; i < neighbors.length; i++) {
        var w = neighbors[i];
        if (color[w] === 'white') {
          color[w] = 'grey';
          queue.enqueue(w);
        }
      }
      color[u] = 'black';
      if (callback) {
        callback(u);
      }
    }
  };


  // 使用BFS寻找最短路径
  this.BFS = function(v) {
    var color = initializeColor(),
        queue = new Queue(),
        d = {},
        pred = {};
    queue.enqueue(v);

    for (let i = 0; i < vertices.length; i++) {
      d[vertices[i]] = 0;
      pred[vertices[i]] = null;
    }

    while (!queue.isEmpty()) {
      var u = queue.dequeue(),
          neighbors = adjList.get(u);
      color[u] = 'grey';
      for (let i = 0; i < neighbors.length; i++) {
        var w = neighbors[i];
        if (color[w] === 'white') {
          color[w] = 'grey';
          d[w] = d[u] + 1;
          pred[w] = u;
          queue.enqueue(w);
        }
      }
      color[u] = 'black';
    }
    return {
      distances: d,
      predecessors: pred
    };
  };


  // 深度优先搜索
  var dfsVisit = function(u, color, callback) {
    color[u] = 'grey';
    if (callback) {
      callback(u);
    }
    console.log('Discovered ' + u);

    var neighbors = adjList.get(u);
    for (let i = 0; i < neighbors.length; i++) {
      var w = neighbors[i];
      if (color[w] === 'white') {
        dfsVisit(w, color, callback);
      }
    }
    color[u] = 'black';
    console.log('explored ' + u);
  };  


  this.dfs = function(callback) {
    var color = initializeColor();

    for (var i = 0; i < vertices.length; i++) {
      if (color[vertices[i]] === 'white') {
        dfsVisit(vertices[i], color, callback);
      }
    }
  };


  // 用深度优先搜索输出发现时间和完成探索时间
  var time = 0;

  var DFSVisit = function(u, color, d, f, p) {
    console.log('discovered ' + u);
    color[u] = 'grey';
    d[u] = ++time;

    var neighbors = adjList.get(u);

    for (let i = 0; i < neighbors.length; i++) {
      var w = neighbors[i];
      if (color[w] === 'white') {
        p[w] = u;
        DFSVisit(w, color, d, f, p);
      }
    }
    color[u] = 'black';
    f[u] = ++time;
    console.log('explored ' + u);
  };


  this.DFS = function() {
    var color = initializeColor(),
        d = {}, // 发现时间
        f = {}, // 完成探索时间
        p = {}; // 前溯点
    
    for (let i = 0; i < vertices.length; i++) {
      f[vertices[i]] = 0;
      d[vertices[i]] = 0;
      p[vertices[i]] = null;
    }

    for (let i = 0; i < vertices.length; i++) {
      if (color[vertices[i]] === 'white') {
        DFSVisit(vertices[i], color, d, f, p);
      }
    }

    return {
      discovery: d,
      finished: f,
      predecessors: p
    };
  };
}





var graph = new Graph();

var myVertices = ['A','B','C','D','E','F','G','H','I'];

for (var i=0; i<myVertices.length; i++){
    graph.addVertex(myVertices[i]);
}
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');

console.log('********* printing graph ***********');

console.log(graph.toString());

console.log('********* bfs ***********');

function printNode(value) {
  console.log('Visited vertex: ' + value);
}

graph.bfs(myVertices[0], printNode);

console.log('********* sorthest path - BFS ***********');
var shortestPathA = graph.BFS(myVertices[0]);
console.log(shortestPathA);
console.log(shortestPathA.distances);
console.log(shortestPathA.predecessors);



// 构建从顶点A到其他顶点的路径
var fromVertex = myVertices[0];

for (let i = 1; i < myVertices.length; i++) {
  var toVertex = myVertices[i],
      path = new Stack();

  for (let v = toVertex; v !== fromVertex; v = shortestPathA.predecessors[v]) {
    path.push(v);
  }
  path.push(fromVertex);
  var s = path.pop();
  while (!path.isEmpty()) {
    s += ' - ' + path.pop();
  }
  console.log(s);
}


console.log('********* dfs ***********');

graph.dfs();


console.log('********* topological sort - DFS ***********');

graph = new Graph();

myVertices = ['A','B','C','D','E','F'];
for (i=0; i<myVertices.length; i++){
    graph.addVertex(myVertices[i]);
}
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('B', 'D');
graph.addEdge('B', 'E');
graph.addEdge('C', 'F');
graph.addEdge('F', 'E');


var result = graph.DFS();
console.log(result.discovery);
console.log(result.finished);
console.log(result.predecessors);

var fTimes = result.finished;
// 以倒序来排序完成时间的数组；每次找出最大的，然后删除，再在剩下数组里找出最大的...
for (let count = 0; count < myVertices.length; count++) {
  var max = 0;
  var maxName = null;
  for (let i = 0; i < myVertices.length; i++) {
    if (fTimes[myVertices[i]] > max) {
      max = fTimes[myVertices[i]];
      maxName = myVertices[i];
    }
  }
  if (count === 0) {
    s = maxName;
  } else {
    s += ' - ' + maxName;
  }
  delete fTimes[maxName];
}
console.log(s);

