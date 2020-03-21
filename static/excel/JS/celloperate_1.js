const { from } = rxjs;
const { reduce } = rxjs.operators;
// compute value for cell formula by rxjs/reduce
function compute(input, oper) {
  if (oper == "+") {
    var input2 = input.pipe(reduce((acc, val) => acc + val));
  } else if (oper == "-") {
    var input2 = input.pipe(reduce((acc, val) => acc - val));
  } else if (oper == "*") {
    var input2 = input.pipe(reduce((acc, val) => acc * val));
  } else if (oper == "/") {
    var input2 = input.pipe(reduce((acc, val) => acc / val));
  } else if (oper == ":") {
    var input2 = input.pipe(reduce((acc, val) => acc + val));
  }
  return input2;
}

// cell value change operation
function value_change(unit) {
  let value = unit.innerText.concat();
  let f1 = value.charAt(0);
  let fs = value.substr(1, 3);
  // operate by +,-,*,/
  if (f1 == "=" && fs != "SUM") {
    let formula = value.substr(1);
    let oper = formula.charAt(2);
    let list = formula.split(oper);
    // save needed cell to a list
    var vallist = [];
    for (i of list) {
      vallist.push(Number(document.getElementById(i).innerText));
    }
    // use from as an observable
    const source = from(vallist);
    // pipe
    const output = compute(source, oper);
    // subscribe
    output.subscribe({
      next(x) {
        unit.innerHTML = x + unit.lastChild.outerHTML;
        unit.lastChild.innerText = value;
      },
      error(err) {
        unit.innerHTML = err + unit.lastChild.outerHTML;
        unit.lastChild.innerText = value;
      },
      complete() {}
    });
    // operate by sum
  } else if (f1 == "=" && fs == "SUM") {
    let ope = value.charAt(7);
    if (ope == "+") {
      let search_begin = value.indexOf("(");
      let search_end = value.indexOf(")");
      let length = search_end - search_begin;
      let formula = value.substr(search_begin + 1, length - 1);
      let list = formula.split("+");
      // save needed cell to a list
      var vallist = [];
      for (i of list) {
        vallist.push(Number(document.getElementById(i).innerText));
      }
      // use from as an observable
      const source = from(vallist);
      // pipe
      const output = compute(source, "+");
      // subscribe
      output.subscribe({
        next(x) {
          unit.innerHTML = x + unit.lastChild.outerHTML;
          unit.lastChild.innerText = value;
        },
        error(err) {
          unit.innerHTML = err + unit.lastChild.outerHTML;
          unit.lastChild.innerText = value;
        },
        complete() {}
      });
    } else if (ope == ":") {
      // wait for implement
      let search_begin = value.indexOf("(");
      let search_end = value.indexOf(")");
      let length = search_end - search_begin;
      let formula = value.substr(search_begin + 1, length - 1);
      let para1 = value.substr(search_begin + 1, 2);
      let para2 = value.substr(search_end - 2, 2);
      let list = formula.split(":");
      // save needed cell to a list
      var vallist = [];
      c_begin = para1.charAt(0);
      c_begin2 = c_begin.charCodeAt(0);
      r_begin = para1.charAt(1);
      c_end = para2.charAt(0);
      c_end2 = c_end.charCodeAt(0);
      r_end = para2.charAt(1);
      // row+col
      for (let i = r_begin; i < r_end + 1; i++) {
        for (let j = c_begin2; j < c_end2 + 1; j++) {
          let new_j = String.fromCharCode(j);
          vallist.push(Number(document.getElementById(new_j + i).innerText));
        }
      }
      // use from as an observable
      const source = from(vallist);
      // pipe
      const output = compute(source, ":");
      //subscribe
      output.subscribe({
        next(x) {
          unit.innerHTML = x + unit.lastChild.outerHTML;
          unit.lastChild.innerText = value;
        },
        error(err) {
          unit.innerHTML = err + unit.lastChild.outerHTML;
          unit.lastChild.innerText = value;
        },
        complete() {}
      });
    }
  }
}

// cell value change
function bind_value_change() {
  let unitlist = document.getElementsByClassName("unit");
  for (unit of unitlist) {
    unit.addEventListener("blur", value_change.bind(null, unit));
  }
}
