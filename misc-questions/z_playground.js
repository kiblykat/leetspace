
class PriorityQueue {
  constructor(){
    this.values = []
  }

  enqueue(node,priority){
    this.values.push({node,priority})
    this.sort()
  }

  dequeue(){
    return this.values.shift()
  }

  sort(){
    this.values.sort((a,b) => a.priority - b.priority)
  }
}

function adjacencyList(edges){
  let graph = {}
  edges.forEach(([src,dst,weight]) => {
      if(!graph[src]) graph[src] = []
      if(!graph[dst]) graph[dst] = []
      graph[src].push([dst,weight])
  });
  return graph
}

//     (10)       (2)
// 0 -------> 1 ------> 3
//  \        /         / \
//   \      /         /   \
//    (3) (4) ______(8)   (5)
//      \ /__/              \
//       2 ----------------> 4
//                (20)

function dijkstra(edges,source,destination){
  let graph = adjacencyList(edges)
  let pq = new PriorityQueue()
  let distances = {}
  let previous = {}
  let path = []

  //initialize distances and previous
  for(let key in graph){
    distances[key] = Infinity
    previous[key] = null 
  }

    
  pq.enqueue(source, 0)
  distances[source] = 0

  while(pq.values.length > 0){
    let currNode = pq.dequeue().node
    if(currNode == destination){
      //end the loop, return path
      let node = previous[currNode]
      while(previous[node] !== null){
        path.push(previous[node])
        node = previous[node]
      }
      path.push(source)
      return path.reverse()
    }

    for(let neighbor of graph[currNode]){
      let [nextNode,weight] = neighbor
      let nextDist = distances[currNode] + weight
      if(nextDist < distances[nextNode]){
        distances[nextNode] = nextDist
        previous[nextNode] = currNode
        pq.enqueue({nextNode, weight})
      }
    }
  }
}


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


// Example usage
const startNode = 0;
const endNode = 4;
const shortestPath = dijkstra(edges, startNode, endNode);
console.log(shortestPath); // Output: ['0', '2', '4']