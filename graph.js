// Matrix to store the value and formula associated with each cell

let valueFormulaMat = [];
for (let i = 0; i < rows; i++) {
  let currRow = [];
  for (let j = 0; j < cols; j++) {
    const cell = {
      value: "",
      formula: "",
    };

    currRow.push(cell);
  }
  valueFormulaMat.push(currRow);
}

const totVertex = 2600;

let graph = [];
let inDegUpdate = [];

// Building the adjacency list

for (let i = 0; i < totVertex; i++) {
  const list = [];
  graph.push(list);
}

// Initializing the indegree array

for (let i = 0; i < totVertex; i++) {
  inDegUpdate.push(0);
}

// filling the indeg array

function fillIndegree() {
  for (let v = 0; v < totVertex; v++) {
    inDegUpdate[v] = 0;
  }

  for (let v = 0; v < totVertex; v++) {
    for (let nbr of graph[v]) {
      inDegUpdate[nbr]++;
    }
  }
}

// Generic function to convert a cell number to its corresponding index in the graph

function convertToIndex(cellNo) {
  const colidx = cellNo.charCodeAt(0) - 65;
  const rowidx = Number(cellNo.charAt(1)) - 1;

  const graphIdx = rowidx * cols + colidx;

  return graphIdx;
}

// Getting the cell from the given cellidx and rowidx
function convertToCell(ridx, cidx) {
  ridx++;
  const cell = String.fromCharCode(65 + cidx) + "" + ridx;
  return cell;
}
// Function to add u --> v edge when the current cell depends on a cell

function addVertex(expression) {
  const v = convertToIndex(selCell.getAttribute("id"));

  const expArr = expression.split(" ");

  for (let i = 0; i < expArr.length; i++) {
    let currExp = expArr[i];
    let ch1 = expArr[i].charCodeAt(0);

    if (ch1 >= 65 && ch1 <= 90) {
      const u = convertToIndex(currExp);
      graph[u].push(v);
    }
  }
}

// Function to remove the current cell's dependency on other cells when a new formula is entered

function removeVertex() {
  const cellNo = selCell.getAttribute("id");

  const v = convertToIndex(cellNo);

  for (let i = 0; i < totVertex; i++) {
    for (let j = 0; j < graph[i].length; j++) {
      if (graph[i][j] == v) {
        graph[i].splice(j, 1);
      }
    }
  }
}

function updateValues() {
  updateValuesKahnsAlgo();
}

// for updating the values, we'll again have to use the Kahn's Algorithm because a single cell can depend on multiple
// cells. In such a case, this type of vertex must be updated at the last

function updateValuesKahnsAlgo() {
  fillIndegree();

  let bfs = [];

  for (let v = 0; v < totVertex; v++) {
    if (inDegUpdate[v] == 0) {
      bfs.push(v);
    }
  }

  while (bfs.length > 0) {
    const src = bfs.shift();

    const ridx = Math.floor(src / cols);
    const cidx = src % cols;

    const expression = valueFormulaMat[ridx][cidx].formula;
    
    if (expression == "") {
       continue;
    }

    const val = getValue(expression);

    valueFormulaMat[ridx][cidx].value = val;

    const cellid = convertToCell(ridx, cidx);

    const cell = document.querySelector("#" + cellid);

    cell.innerText = val;

    for (let i = 0; i < graph[src].length; i++) {
      if (--inDegUpdate[graph[src][i]] == 0) {
        bfs.push(graph[src][i]);
      }
    }
  }
}

// Function to calculate the value of the numeric formula
// Takes in a string, and returns its value

function getValue(expression) {
  if (expression === "") {
    return "";
  }

  // Splitting the expression about blank spaces

  const expArr = expression.split(" ");

  let finalExp = "";
  // Checking for each element whether it is a cell on whome the current cell will depend

  for (let i = 0; i < expArr.length; i++) {
    // Extratcing the first character of the current element

    let currExp = expArr[i];
    let ch1 = expArr[i].charCodeAt(0);

    // Checking if the first character is an valid alphabet or not. If it is, then we will get that cells value.
    if (ch1 >= 65 && ch1 <= 90) {
      let ch2 = expArr[i].charAt(1);

      let rowidx = Number(ch2) - 1;
      let colidx = ch1 - 65;

      // getting the cell on whom the current cell is dependent
      let cellVal = valueFormulaMat[rowidx][colidx].value;

      finalExp += cellVal;
    } else {
      finalExp += currExp;
    }
  }

  return eval(finalExp);
}
