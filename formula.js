// Adding blur event listener

for (let cell of allCells) {
  cell.addEventListener("blur", handleValue);
  cell.addEventListener("click", displayFormula);
}

// Storing the value on the cell when it gets blurred

function handleValue() {
  const cell = this;
  const ridx = cell.getAttribute("rowIdx");
  const cidx = cell.getAttribute("colIdx");
  valueFormulaMat[ridx][cidx].value = cell.innerText;
}

// Selecting the formula bar

const formula = document.querySelector(".formula");

//Adding keydown event listener

formula.addEventListener("keydown", handleFormula);


function handleFormula(event) {
  if (selCell == undefined) {
    return;
  }

  const key = event.key;
  if (key === "Enter") {
    removeVertex();

    const ridx = selCell.getAttribute("rowIdx");
    const cidx = selCell.getAttribute("colIdx");

    addVertex(formula.value);

    if (detectCycle()) {
      alert(
        "Sorry, this formula : " +
          formula.value +
          " , can't be applied to the cell : " +
          selCell.getAttribute("id") +
          "\nYou have created a cyclic formula!!"
      );

      formula.value = valueFormulaMat[ridx][cidx].formula;
      removeVertex();
      return;
    }
    // Value gotten by evalating the excel formula
    const val = getValue(formula.value);
    selCell.innerText = val;
    valueFormulaMat[ridx][cidx].formula = formula.value;
    valueFormulaMat[ridx][cidx].value = val;
    updateValues();
  }
}

// To display the previously activated formula

function displayFormula() {
  const cell = this;
  const ridx = cell.getAttribute("rowIdx");
  const cidx = cell.getAttribute("colIdx");

  formula.value = valueFormulaMat[ridx][cidx].formula;
}
