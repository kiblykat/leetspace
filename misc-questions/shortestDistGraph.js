function shortestDist(start, end, edges) {
  const graph = {};  // Initialize an empty object to represent the adjacency list.

  // Step 1: Create the adjacency list from the edges list.
  // Loop through the edges to create a graph where each node points to its neighbors.
  edges.forEach(([src, dst]) => {
      if (!graph[src]) graph[src] = [];  // If the source node doesn't exist, create an empty array.
      if (!graph[dst]) graph[dst] = [];  // Similarly, create an empty array for the destination node.
      graph[src].push(dst);              // Add the destination node as a neighbor of the source node.
      graph[dst].push(src);              // Since the graph is undirected, add the source node as a neighbor of the destination node.
  });

  // At this point, the graph (adjacency list) looks like this:
  // {
  //   1: [2, 3],
  //   2: [1, 3, 4, 5],
  //   3: [1, 2],
  //   4: [2, 6],
  //   5: [2, 4, 6],
  //   6: [4, 5]
  // }

  // Step 2: Initialize the BFS queue and visited set.
  // BFS uses a queue to process nodes level by level.
  const queue = [[start, 0]];  // The queue stores pairs: [node, distance from start].
  const visited = new Set();   // Use a Set to track visited nodes and avoid revisiting them.
  visited.add(start);          // Mark the start node as visited.

  // Step 3: Perform the BFS traversal.
  while (queue.length > 0) {
      // Remove the first node from the queue. This is the current node being processed.
      const [currentNode, distance] = queue.shift();

      // Check if we have reached the end node.
      if (currentNode == end) return distance;  // Return the distance when the end node is reached.

      // Step 4: Explore neighbors of the current node.
      // For each neighbor of the current node, if it's not visited yet, add it to the queue.
      for (let neighbor of graph[currentNode]) {
          if (!visited.has(neighbor)) {         // If the neighbor hasn't been visited yet:
              visited.add(neighbor);            // Mark it as visited.
              queue.push([neighbor, distance + 1]);  // Add the neighbor to the queue with updated distance.
          }
      }
  }

  // If we exhaust the search without finding the end node, return -1 (end node unreachable).
  return -1;
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