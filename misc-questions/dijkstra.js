//     (10)       (2)
// 0 -------> 1 ------> 3
//  \        /         / \
//   \      /         /   \
//    (3) (4) ______(8)   (5)
//      \ /__/              \
//       2 ----------------> 4
//                (20)

class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(node, priority) {
    this.values.push({ node, priority });
    this.sort();
  }

  dequeue() {
    return this.values.shift();
  }

  sort() {
    // Sort by priority, so that the lowest priority is dequeued first
    this.values.sort((a, b) => a.priority - b.priority);
  }
}

function createAdjacencyList(edges) {
  const graph = {};

  edges.forEach(([src, dst, weight]) => {
    if (!graph[src]) graph[src] = [];
    if (!graph[dst]) graph[dst] = []; // Only needed if we expect all nodes to be represented

    graph[src].push({ node: dst, weight });
  });

  return graph;
}

function dijkstra(edges, start, end) {
  const graph = createAdjacencyList(edges);
  const distances = {}; // Holds the distance from start to each node
  const pq = new PriorityQueue();
  const previous = {}; // Tracks the previous node for each node
  let path = []; // To return the shortest path

  // Initialize distances and previous
  for (let node in graph) {
    distances[node] = Infinity; // Initialize all distances to infinity
    previous[node] = null; // Initialize all previous node to null
  }

  distances[start] = 0; // Distance from start to itself is 0
  pq.enqueue(start, 0); // Enqueue the start node with priority 0

  // Process the priority queue, while there is still nodes in Priority Queue
  while (pq.values.length) {
    let currNode = pq.dequeue().node; // Get the next node with the shortest distance

    // If we reach the end node, we can construct the path and return it
    if (currNode == end) {
      while (previous[currNode] !== null) {
        path.push(currNode);
        currNode = previous[currNode];
      }
      path.push(start);
      return path.reverse(); // Return the path from start to end
    }

    // If the current node has neighbors, check their distances
    if (graph[currNode]) {
      //iterate through neighbors of current node
      for (let neighbor of graph[currNode]) {
        let nextNode = neighbor.node;
        let newDist = distances[currNode] + neighbor.weight; //distance to current node + distance to neighbor

        // If a shorter distance is found, update the distances and enqueue (this inherently skips visited nodes)
        if (newDist < distances[nextNode]) {
          distances[nextNode] = newDist;  //update old distance to new distance
          previous[nextNode] = currNode;  //update old previous node, to new previous node
          pq.enqueue(nextNode, newDist); // Enqueue the neighbor with the new shorter distance
        }
      }
    }
  }

  return path; // Return the path, even if it is empty (no path found)
}

// Example input: [[0,1,10],[0,2,3],[1,3,2],[2,1,4],[2,3,8],[2,4,2],[3,4,5]]
const edges = [
  [0, 1, 10],
  [0, 2, 3],
  [2, 0, 5],
  [1, 3, 2],
  [2, 1, 4],
  [2, 3, 8],
  [2, 4, 20],
  [3, 4, 5],
];

//     (10)       (2)
// 0 -------> 1 ------> 3
//  \        /         / \
//   \      /         /   \
//    (3) (4) ______(8)   (5)
//      \ /__/              \
//       2 ----------------> 4
//                (20)

// Example usage
const startNode = 0;
const endNode = 4;
const shortestPath = dijkstra(edges, startNode, endNode);
console.log(shortestPath); // Output: ['0', '2', '4']
