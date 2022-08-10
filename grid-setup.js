const cols = 26;
const rows = 100;

const colHead = document.querySelector(".col-head");
const rowNo = document.querySelector(".row-no");
const cells = document.querySelector(".cells");

let selCell = undefined;
// Loop to set the column titles

for (let i = 0; i < cols; i++) {
  let colTitle = document.createElement("div");
  colTitle.classList.add("cell-wt", "cell", "border");
  colTitle.innerText = String.fromCharCode(65 + i);
  colHead.appendChild(colTitle);
}

// Loop to set the row numbers

for (let i = 0; i < rows; i++) {
  let currRow = document.createElement("div");
  currRow.classList.add("cell-ht", "cell", "border");
  currRow.innerText = i + 1;
  rowNo.appendChild(currRow);
}

// Loop to fill the grid

for (let i = 0; i < rows; i++) {
  let currRow = document.createElement("div");
  currRow.classList.add("excel-row");

  for (let j = 0; j < cols; j++) {
    let currCell = document.createElement("div");
    currCell.classList.add("cell-wt", "act-cell", "border", "excel-cell");
    currCell.setAttribute("contenteditable", "true");
    const cellId = String.fromCharCode(65 + j) + (i + 1);
    currCell.setAttribute("id", cellId);
    currCell.setAttribute("rowIdx", i);
    currCell.setAttribute("colIdx", j);
    currCell.setAttribute("spellcheck", "false");
    currRow.appendChild(currCell);
  }

  cells.appendChild(currRow);
}

const allCells = $(".excel-cell");

allCells.on("click", handleClick);

function handleClick() {
  if (selCell != undefined) {
    selCell.classList.remove("active-cell");
  }

  selCell = this;
  selCell.classList.add("active-cell");
  const currCell = this;
  const id = currCell.getAttribute("id");
  const cellDisplay = document.querySelector(".cell-display");
  cellDisplay.innerText = id;
}