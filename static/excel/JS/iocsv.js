var inputfile = document.getElementById("inputfile");
var exportcsv = document.getElementById("exportcsv");
var filenamedisplay = document.getElementById("footerp");
inputfile.addEventListener("change", loadfile);
exportcsv.addEventListener("click", exportfile);

function loadfile() {
  // get file from input
  var csv = inputfile.files[0];
  // filename display in diplay bar
  var csv_name = csv.name.split(".")[0];
  filenamedisplay.innerText = csv_name + ".csv";
  // use filereader to read data
  var fr = new FileReader();
  readText(fr, csv);
}

function readText(fr, file) {
  fr.onload = function() {
    var arr = [];
    // create pre formatted text(retains space and line break)
    var pre = document.createElement("pre");
    var res = fr.result;
    // split to rows
    var res2 = res.split("\n");
    var row_index = 0;
    for (let r of res2) {
      row_index += 1;
      // each rows split to nums
      var res3 = r.split(",");
      let col_index = 1;
      for (let r2 of res3) {
        col = String.fromCharCode(64 + col_index);
        cell = document.getElementById(col + row_index);
        if (r2 == "") {
          cell.innerHTML = "NaN" + cell.innerHTML;
          cell.lastChild.innerText = "NaN";
        } else {
          cell.innerHTML = r2 + cell.innerHTML;
          cell.lastChild.innerText = r2;
        }
        col_index += 1;
      }
    }
  };
  fr.readAsText(file);
}

function exportfile() {
  var csvdata = [];
  // push all data into an dictionary
  // each row
  for (let i = 1; i < currentrowsquantity + 1; i++) {
    var tempdata = [];
    // each cell
    for (let j = 1; j < currentcolsquantity + 1; j++) {
      var cell = document.getElementById(String.fromCharCode(64 + j) + i);
      if (cell.innerText != "") {
        tempdata.push(cell.innerText);
      }
    }
    tempdata.push("\n");
    rownum = "@" + i;
    // each row save to dict
    csvdata[rownum] = tempdata;
  }
  csvdata_str = "";
  for (let key in csvdata) {
    // if row has data, insert into csvdata_str
    if (csvdata[key] != "\n") {
      csvdata_str = csvdata_str + csvdata[key].toString();
    }
  }
  let fname = filenamedisplay.innerText;
  fname = fname.substring(0, fname.length - 4);
  let filename = fname + "(1).csv";
  // put csvdata_str content into a csv
  download(filename, csvdata_str);
}

// use hyperlink to download file
function download(filename, content) {
  // create a element for downloading file
  var dld = document.createElement("a");
  dld.setAttribute(
    "href",
    "data:application/csv;charset=utf-8," + encodeURIComponent(content)
  );
  dld.setAttribute("download", filename);
  // create an event
  // if (document.createEvent) {
  //   // create mouseevents
  //   var event = document.createEvent("MouseEvents");
  //   // initialize it to click
  //   event.initEvent("click", true, true);
  //   // dld can trigger it
  //   dld.dispatchEvent(event);
  // } else {
  //   dld.click();
  // }
  dld.click();
}
