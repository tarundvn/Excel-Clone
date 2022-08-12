const cols = 26;
const rows = 100;

const addressColCont = document.querySelector(".address-col-cont");
const addressRowCont = document.querySelector(".address-row-cont");
const cellsCont = document.querySelector(".cells-cont");
const addressBar = document.querySelector(".address-bar");

// Loop to set the row numbers
for(let i = 0;i<rows;i++)
{
    let addressCol = document.createElement("div");
    addressCol.setAttribute("class" , "address-col");
    addressCol.innerText = i+1;
    addressColCont.appendChild(addressCol);
}

// Loop to set the column titles
for(let i = 0;i<cols;i++)
{
    let addressRow = document.createElement("div");
    addressRow.setAttribute("class" , "address-row");
    addressRow.innerText = String.fromCharCode(65 + i);
    addressRowCont.appendChild(addressRow);
}

// Loop to fill the grid
for(let i = 0;i<rows;i++)
{
    let rowCont = document.createElement("div");
    rowCont.setAttribute("class" , "row-cont");
    for(let j= 0;j<cols;j++)
    {
        let cell = document.createElement("div");
        cell.setAttribute("class" , "cell");
        cell.setAttribute("contenteditable" , "true");
        cell.setAttribute("spellcheck" , "false");
        //Attributes for cell and storage identification
        cell.setAttribute("rid" , i);
        cell.setAttribute("cid" , j);
        rowCont.appendChild(cell);
        addListenerforAdressBarDisplay(cell,i,j);
    }
    cellsCont.appendChild(rowCont);
}

function addListenerforAdressBarDisplay(cell,i,j)
{
    cell.addEventListener("click",(e) => {
        let rowId = i + 1;
        let colId = String.fromCharCode(65 + j);
        addressBar.value = `${colId}${rowId}`;
    });
}