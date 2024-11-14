function shortestDist(start,end,edges){
  //create adjacency list
  let adjList = {}
  for(let i=0;i<edges.length;i++){
    if(!adjList[edges[i][0]]) adjList[edges[i][0]]=[]
    if(!adjList[edges[i][1]]) adjList[edges[i][1]]=[]
    adjList[edges[i][0]].push(edges[i][1])
    adjList[edges[i][1]].push(edges[i][0])
  }
  
  //traverse nodes in adjacency list
  let queue = []
  let traversed = new Set()
  queue.push([start,0]) // initialize start node with dist =0
  traversed.add(start)
  while(queue.length>0){
    const [node, dist] = queue.shift()
    for(let newNode of adjList[node]){
      if(traversed.has(newNode)){
        continue
      }
      if(newNode == end){
        console.log(dist)
        return dist
      }
      queue.push([newNode,dist+1])
      traversed.add(newNode)
    }
  }
  //add travelled nodes into a Set
  //do not repeat nodes alr travelled
}

const edges = [
  [1, 2],
  [1, 3],
  [2, 3],
  [2, 4],
  [2, 5],
  [3, 5],
  [4, 6],
  [5, 4],
  [5, 6]
];

console.log(shortestDist(1, 6, edges));  // Output: 3