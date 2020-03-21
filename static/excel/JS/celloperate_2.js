const { fromEvent, of } = rxjs;
const {
  switchMap,
  map,
  filter,
  distinctUntilChanged,
  scan,
  startWith,
  takeUntil
} = rxjs.operators;

const table = document.getElementById("table");

// observable with pipe
const down = fromEvent(table, "mousedown").pipe(
  filter(e => e.target.nodeName === "TD")
);
// observable with pipe
const mv = fromEvent(document, "mousemove").pipe(
  filter(e => e.target.nodeName === "TD")
);
const up = fromEvent(document, "mouseup");

// get current mouse position
function getPosition(el) {
  return {
    row: parseInt(el.getAttribute("data-row")),
    column: parseInt(el.getAttribute("data-column"))
  };
}

// judge whether the same position
function isPositionEqual(pos1, pos2) {
  return pos1.row === pos2.row && pos1.column === pos2.column;
}

// selection an area
const selectionarea = down
  //use pip to find mouse move position
  .pipe(
    switchMap(e =>
      mv.pipe(
        startWith(e), // start with mouse down
        takeUntil(up), // end with mouse up
        map(e => getPosition(e.target)), // get position
        distinctUntilChanged((p, q) => isPositionEqual(p, q)), //judge position change
        scan((acc, pos) => {
          // give start and end position
          if (!acc) {
            return {
              startRow: pos.row,
              startColumn: pos.column,
              endRow: pos.row,
              endColumn: pos.column
            };
          } else {
            // objects merge together
            return Object.assign(acc, {
              endRow: pos.row,
              endColumn: pos.column
            });
          }
        }, null)
      )
    )
  )
  // use pipe to ensure the start and end of range
  .pipe(
    map(range => {
      // ahcieve the start and end position
      return {
        startRow: Math.min(range.startRow, range.endRow),
        startColumn: Math.min(range.startColumn, range.endColumn),
        endRow: Math.max(range.startRow, range.endRow),
        endColumn: Math.max(range.startColumn, range.endColumn)
      };
    })
  );

// subscribe selection
selectionarea.subscribe(subscriberSelection);

// subscriber
function subscriberSelection(range) {
  // get range
  const { startRow, startColumn, endRow, endColumn } = range;
  // turn number to column aplhabet
  startColumn2 = String.fromCharCode(65 + startColumn - 1);
  endColumn2 = String.fromCharCode(65 + endColumn - 1);
  // define selection top left
  const { top, left } = document
    .getElementById(`${startColumn2}${startRow}`)
    .getBoundingClientRect();
  // define selection bottom right
  const { bottom, right } = document
    .getElementById(`${endColumn2}${endRow}`)
    .getBoundingClientRect();
  const scrollTop = table.scrollTop;
  const scrollLeft = table.scrollLeft;
  const selectionEl = document.getElementById("selection");
  // draw the selection area
  selectionEl.style.top = `${top + scrollTop - 2}px`;
  selectionEl.style.left = `${left + scrollLeft - 2}px`;
  selectionEl.style.height = `${bottom - top + 3}px`;
  selectionEl.style.width = `${right - left + 3}px`;
}
