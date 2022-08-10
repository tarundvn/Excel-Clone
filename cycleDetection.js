// Kahn's algo to detect cycle in the formula graph

function detectCycle() {
  let inDeg = [];

  for (let i = 0; i < totVertex; i++) {
    inDeg.push(0);
  }

  for (let i = 0; i < totVertex; i++) {
    for (let nbr of graph[i]) {
      inDeg[nbr]++;
    }
  }

  let bfs = [];

  for (let i = 0; i < totVertex; i++) {
    if (inDeg[i] == 0) {
      bfs.push(i);
    }
  }

  let count = 0;

  while (bfs.length > 0) {
    count++;
    let ele = bfs.shift();

    for (let nbr of graph[ele]) {
      if (--inDeg[nbr] == 0) {
        bfs.push(nbr);
      }
    }
  }

  return count !== totVertex;
}
