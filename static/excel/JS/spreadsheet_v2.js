var currentvalue = null;
var currentrowsquantity;
var currentcolsquantity;

// add row
function addrow() {
  var table001 = document.getElementById("table");
  let addrow = document.getElementById("addrow");
  // click event
  addrow.onclick = function() {
    // judge whether choose a row
    if (!isNaN(currentvalue)) {
      let unitlist = document.getElementsByClassName("unit");
      for (unit of unitlist) {
        if (unit.id.substr(1, 3) == currentvalue) {
          var row_ele = document.getElementById("@" + currentvalue);
          break;
        }
      }
      // new row
      var new_tr = document.createElement("tr");
      var next_row = row_ele.nextSibling;
      var x = Number(next_row.id.substr(1, 3));
      // give id to new row: @ + row number
      for (let j = currentrowsquantity; j >= x; j--) {
        var row_ele = document.getElementById("@" + j);
        row_ele.id = "@" + (j + 1);
        for (cell of row_ele.childNodes) {
          i1 = cell.id.charAt(0);
          i2 = Number(cell.id.substr(1, 3));
          cell.id = i1 + (i2 + 1);
        }
      }
      new_tr.id = "@" + x;
      // insert before next row
      table001.insertBefore(new_tr, next_row);
      // create cell for the row
      for (let i = 0; i < currentcolsquantity; i++) {
        new_td = document.createElement("td");
        new_td.contentEditable = "true";
        new_td.style.textAlign = "right";
        new_td.style.border = "1px gray solid";
        new_td.style.width = "60px";
        new_td.style.height = "20px";
        new_td.style.overflow = "hidden";
        new_td.className = "unit";
        new_td.id = String.fromCharCode(65 + i) + x;
        let value2 = document.createElement("div");
        value2.style.display = "none";
        new_td.appendChild(value2);
        new_tr.appendChild(new_td);
      }
      currentrowsquantity = currentrowsquantity + 1;
      // change axis x and y index
      changeindex("row", "plus");
      // bind unit value
      bind_unit_value_to_name();
      // bind value change
      bind_value_change();
    } else {
      alert("please choose a row");
    }
  };
}

// add column
function addcol() {
  let addcol = document.getElementById("addcol");
  //click event
  addcol.onclick = function() {
    // judge column
    if (isNaN(currentvalue)) {
      // create unit for each row use td
      for (var i = 1; i < currentrowsquantity + 1; i++) {
        let cell = document.getElementById(currentvalue + "" + i);
        let row = document.getElementById("@" + i);
        let new_td = document.createElement("td");
        new_td.contentEditable = "true";
        new_td.className = "unit";
        new_td.style.textAlign = "right";
        new_td.style.border = "1px gray solid";
        new_td.style.width = "60px";
        new_td.style.height = "20px";
        new_td.style.overflow = "hidden";
        let value2 = document.createElement("div");
        value2.style.display = "none";
        new_td.appendChild(value2);
        // each column(from last one to current.next)
        for (
          let k = currentcolsquantity - 1;
          k >= currentvalue.charCodeAt(0) - 65;
          k--
        ) {
          let index = String.fromCharCode(65 + k);
          let index_next = String.fromCharCode(65 + k + 1);
          cell = document.getElementById(index + i);
          cell.id = index_next + i;
        }
        // id = currentvalue + row number
        new_td.id = currentvalue + i;
        // insert before each row's next cell
        row.insertBefore(new_td, cell);
      }
      currentcolsquantity = currentcolsquantity + 1;
      //change axis x and y index
      changeindex("column", "plus");
      //bind unit value
      bind_unit_value_to_name();
      // bind value change
      bind_value_change();
    } else {
      alert("please choose a column");
    }
  };
}

// delete row
function delrow() {
  var table001 = document.getElementById("table");
  let delrow = document.getElementById("delrow");
  delrow.onclick = function() {
    // judge rows > 1
    if (currentrowsquantity > 1) {
      // judge whether it is row
      if (!isNaN(currentvalue)) {
        // remove row
        let row = document.getElementById("@" + currentvalue);
        table001.removeChild(row);
        currentrowsquantity = currentrowsquantity - 1;
        // change axis-y index
        changeindex("row", "minus");

        for (let i = currentrowsquantity + 1; i > currentvalue; i--) {
          let row = document.getElementById("@" + i);
          // change the rows' id after the deleted row
          row.id = "@" + (i - 1);
          // change the cells' id after the deleted row
          for (let j = 0; j < currentcolsquantity; j++) {
            let cell = document.getElementById(String.fromCharCode(65 + j) + i);
            cell.id = String.fromCharCode(65 + j) + (i - 1);
          }
        }
        bind_unit_value_to_name();
      } else {
        alert("please choose a row");
      }
    } else {
      alert("you can't delete because rows<=1");
    }
  };
}

// delete column
function delcol() {
  let delcol = document.getElementById("delcol");
  delcol.onclick = function() {
    // judge columns > 1
    if (currentcolsquantity > 1) {
      // judge whether it is column
      if (isNaN(currentvalue)) {
        // remove column
        for (let i = 1; i < currentrowsquantity + 1; i++) {
          let cell = document.getElementById(currentvalue + "" + i);
          let row = document.getElementById("@" + i);
          row.removeChild(cell);
        }
        currentcolsquantity = currentcolsquantity - 1;
        // change axis-x index
        changeindex("column", "minus");
        for (
          let j = currentvalue.charCodeAt(0) - 65;
          j < currentcolsquantity + 1;
          j++
        ) {
          for (let k = 1; k < currentrowsquantity + 1; k++) {
            cell = document.getElementById(String.fromCharCode(65 + j + 1) + k);
            // change cell id
            if (cell) {
              cell.id = String.fromCharCode(65 + j) + k;
            }
          }
        }
        bind_unit_value_to_name();
      } else {
        alert("please choose a column");
      }
    } else {
      alert("you can't delete because columns<=1");
    }
  };
}

// bind events to axis-x and axis-y
function click_axis() {
  let axisunitlist = document.getElementsByClassName("axis");
  for (unit of axisunitlist) {
    // change bgcolor and record value
    unit.onclick = function() {
      this.style.backgroundColor = "gray";
      currentvalue = this.innerHTML;
    };
    // change back bgcolor
    unit.ondblclick = function() {
      this.style.backgroundColor = "rgba(248,248,255,0.3)";
    };
  }
}

// create cells of spreadsheet
function createcenter() {
  let table001 = document.getElementById("table");
  for (let i = 0; i < 100; i++) {
    // create row: tr
    let row = document.createElement("tr");
    // row id = @rownumber
    row.id = "@" + (i + 1);
    table001.appendChild(row);
    for (let j = 0; j < 25; j++) {
      // create cell: td
      let unit = document.createElement("td");
      unit.contentEditable = "true";
      unit.style.textAlign = "right";
      unit.style.border = "1px gray solid";
      unit.style.width = "60px";
      unit.style.height = "24.4px";
      unit.style.overflow = "hidden";
      unit.style.whiteSpace = "nowrap";
      unit.style.textOverflow = "ellipsis";
      unit.setAttribute("data-row", i + 1);
      unit.setAttribute("data-column", j + 1);
      unit.className = "unit";
      // cell id = column number + row number
      unit.id = String.fromCharCode(65 + j) + (i + 1);
      // create hidden value for cell: div
      let value2 = document.createElement("div");
      value2.style.display = "none";
      unit.appendChild(value2);
      row.appendChild(unit);
    }
  }
  width1 = currentcolsquantity * 60 + "px";
  table001.style.width = width1;
}

// create new sheet with grids - axis x
function createx(num) {
  let axisx = document.getElementById("axisx");
  for (let i = 0; i < num; i++) {
    // create axis-x: button
    let unit = document.createElement("button");
    unit.style.position = "absolute";
    let num = 40 + i * 64;
    let numpx = num + "px";
    unit.style.backgroundColor = "rgba(248,248,255,0.3)";
    unit.style.top = "0px";
    unit.style.left = numpx;
    unit.style.width = "64px";
    unit.style.height = "20px";
    unit.style.textAlign = "center";
    unit.style.border = "1px gray solid";
    unit.style.padding = "1px";
    unit.innerHTML = String.fromCharCode(65 + i);
    // axis-x id = column number
    unit.id = String.fromCharCode(65 + i);
    unit.className = "axis";
    axisx.appendChild(unit);
  }
}

// create new sheet with grids - axis y
function createy(num) {
  let axisy = document.getElementById("axisy");
  for (let i = 0; i < num; i++) {
    // create axis-y: button
    let unit = document.createElement("button");
    unit.style.position = "absolute";
    let num = 20 + i * 24.8;
    let numpx = num + "px";
    unit.style.backgroundColor = "rgba(248,248,255,0.3)";
    unit.style.left = "0px";
    unit.style.top = numpx;
    unit.style.width = "40px";
    unit.style.height = "24.4px";
    unit.style.textAlign = "center";
    unit.style.border = "1px gray solid";
    unit.innerHTML = i + 1;
    // axis-y id = row number
    unit.id = i + 1;
    unit.className = "axis";
    axisy.appendChild(unit);
  }
}

// change axis-x and axis-y
function changeindex(ctype, operation) {
  let axisy = document.getElementById("axisy");
  let axisx = document.getElementById("axisx");
  // judge row
  if (ctype == "row") {
    // judge plus
    if (operation == "plus") {
      // create button for axis-y
      let new_btn = document.createElement("button");
      new_btn.innerHTML = currentrowsquantity;
      new_btn.style.position = "absolute";
      let num = 20 + (currentrowsquantity - 1) * 24.8;
      let numpx = num + "px";
      new_btn.style.backgroundColor = "rgba(248,248,255,0.3)";
      new_btn.style.left = "0px";
      new_btn.style.top = numpx;
      new_btn.style.width = "40px";
      new_btn.style.height = "24.4px";
      new_btn.style.textAlign = "center";
      new_btn.style.border = "1px gray solid";
      new_btn.id = currentrowsquantity;
      new_btn.className = "axis";
      // append
      axisy.appendChild(new_btn);
      // judge minus
    } else if (operation == "minus") {
      // remove
      axisy.removeChild(axisy.lastChild);
    }
    // judge column
  } else if (ctype == "column") {
    // judge plus
    if (operation == "plus") {
      // create button for axis-x
      let new_btn = document.createElement("button");
      new_btn.innerHTML = String.fromCharCode(65 + currentcolsquantity - 1);
      new_btn.style.position = "absolute";
      let num = 40 + (currentcolsquantity - 1) * 60;
      let numpx = num + "px";
      new_btn.style.backgroundColor = "rgba(248,248,255,0.3)";
      new_btn.style.top = "0px";
      new_btn.style.left = numpx;
      new_btn.style.width = "60px";
      new_btn.style.height = "20px";
      new_btn.style.textAlign = "center";
      new_btn.style.border = "1px gray solid";
      new_btn.id = String.fromCharCode(65 + currentcolsquantity - 1);
      new_btn.className = "axis";
      // append
      axisx.appendChild(new_btn);
      // judge minus
    } else if (operation == "minus") {
      // remove
      axisx.removeChild(axisx.lastChild);
    }
    let table001 = document.getElementById("table");
    width1 = currentcolsquantity * 60 + "px";
    table001.style.width = width1;
  }
  click_axis();
}

// change inner div text
function change_value(unit) {
  unit.lastChild.innerText = unit.innerText;
}

// change outer td text
function change_fx(unit) {
  let ta1 = document.getElementById("ta1");
  ta1.innerText = unit.lastChild.innerText;
}

function bind_unit_value_to_name() {
  let unitlist = document.getElementsByClassName("unit");
  // each cell click and blur events
  for (let unit of unitlist) {
    unit.addEventListener("blur", change_value.bind(null, unit));
    unit.addEventListener("click", change_fx.bind(null, unit));
  }
}

// initialize a newsheet
function newsheet() {
  currentrowsquantity = 100;
  currentcolsquantity = 25;
  createcenter();
  createx(currentcolsquantity);
  createy(currentrowsquantity);
  click_axis();
  addrow();
  addcol();
  delrow();
  delcol();
  bind_unit_value_to_name();
  bind_value_change();
}

window.onload = newsheet;
