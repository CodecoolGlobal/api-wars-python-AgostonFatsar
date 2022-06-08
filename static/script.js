const table = {
    header: ["Name", "Diameter", "Climate", "Terrain", "Surface Water Percentage", "Population", "Residents", ""],
    tableHead: document.querySelectorAll("th"),
    tableRows: document.querySelectorAll("tr"),
    tableBody: document.querySelector("tbody"),
    table: document.querySelector("table")
};

const buttons = {
    previous: document.getElementById("previous"),
    next: document.getElementById("next")
};

let planetPage = {
    previous: null,
    next: null
};

let newRow = {
    name: null,
    diameter: null,
    climate: null,
    terrain: null,
    water: null,
    population: null,
    residents: null,
};

function fillTableHeader() {
    table.tableHead.forEach(function(th, index) {
        th.innerHTML = table.header[index]
    });
}

function getData(page='http://swapi.py4e.com/api/planets/') {
    let request = new XMLHttpRequest();
    request.open('GET', page)
    request.onload = function() {
        let data = JSON.parse(request.responseText);
        planetPage.next = data['next']
        if (planetPage.next === null) {
            buttons.next.disabled = true
        } else {
            buttons.next.disabled = false
        }
        planetPage.previous = data['previous']
        if (planetPage.previous === null) {
            buttons.previous.disabled = true
        } else {
            buttons.previous.disabled = false
        }

        renderTable(data['results']);
    }
    request.send()

}

function renderTable(data) {
    table.table.lastElementChild.remove();
    console.log("removed")
    let tableBody = document.createElement("tbody")

    for (let planet of data) {
        newRow["name"] = planet["name"];
        newRow["diameter"] = Intl.NumberFormat('en-US').format(planet["diameter"]) + " km";
        newRow["climate"] = planet["climate"];
        newRow["terrain"] = planet["terrain"];
        newRow["water"] = planet["surface_water"];
        newRow["population"] = Intl.NumberFormat('en-US').format(planet["population"]) + " people";
        newRow["residents"] = null;// getResidents()
        let row = document.createElement("tr");

        for (let i = 0; i < Object.keys(newRow).length; i++) {
            let cell = document.createElement("td");
            cell.innerHTML = Object.values(newRow)[i];
            row.appendChild(cell)

        }
        tableBody.appendChild(row)
        table.table.appendChild(tableBody)
    }
}
    /*
    table.tableRows.forEach(function(row, index) {

        if (index > 0) {
            let rowCells = row.querySelectorAll("td");
            let planet = data[index-1];
            if (planet === undefined) {
                for (let i = 0; i < 8; i++) {
                    rowCells[i].innerHTML = "";
                }
            } else {
                console.log(planet);
                const newRow = {
                    0: planet["name"],
                    1: Intl.NumberFormat('en-US').format(planet["diameter"]) + " km",
                    2: planet["climate"],
                    3: planet["terrain"],
                    4: planet["surface_water"],
                    5: Intl.NumberFormat('en-US').format(planet["population"]) + " people",
                    6: null // getResidents()
                };
                for (let i = 0; i < 8; i++) {
                    rowCells[i].innerHTML = newRow[i];
                }
            }

        }

    })
}
*/
function turnPage() {
    buttons.previous.addEventListener("click", function() {getData(planetPage.previous)})
    buttons.next.addEventListener("click", function() {getData(planetPage.next)})
}

fillTableHeader()
getData()
turnPage()