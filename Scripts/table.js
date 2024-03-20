var tables = document.querySelectorAll("table");

// For each table, add event listener to highlight
// rows & cells when clicked on
if (tables.length > 0) {
    for (var table of tables) {
        var rows = Array.from(table.rows);
        rows.forEach(
            function (row) {
                row.addEventListener("click", function () {
                    highlightRow(row, table);
                }, true);
                var cells = Array.from(row.cells);
                cells.forEach(
                    function (cell) {
                        cell.addEventListener("click", function () {
                            highlightCell(cell, table);
                        }, true)
                    }
                )
            }
        );
    }
}

function highlightRow(row, table) {
    for (var allRows of table.rows) {
        allRows.style.setProperty("background-color", "inherit");
    }
    row.style.setProperty("background-color", "rgba(0, 0, 0, 0.1)");
    console.log("Highlighting row");
}

function highlightCell(cell, table) {
    for (var allRows of table.rows) {
        for (var allCells of allRows.cells) {
            allCells.style.setProperty("background-color", "inherit");
        }
    }
    cell.style.setProperty("background-color",  "rgba(0, 0, 0, 0.3)");
    console.log("Highlighting cell");
}