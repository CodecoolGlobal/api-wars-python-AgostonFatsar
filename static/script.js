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

let planetRow = {
    name: null,
    diameter: null,
    climate: null,
    terrain: null,
    water: null,
    population: null,
    residents: null,
};

let residentRow = {
    name: null,
    height: null,
    mass: null,
    hair: null,
    skin: null,
    eye: null,
    birth: null,
    gender: null
}

function fillTableHeader() {
    table.tableHead.forEach(function(th, index) {
        th.innerHTML = table.header[index]
    });
}

function getData(page='http://swapi.py4e.com/api/planets/') {
    const request = new XMLHttpRequest();
    request.open('GET', page)
    request.onload = function() {
        const data = JSON.parse(request.responseText);
        planetPage.next = data['next']
        buttons.next.disabled = planetPage.next === null;
        planetPage.previous = data['previous']
        buttons.previous.disabled = planetPage.previous === null;

        renderTable(data['results']);
    }
    request.send()
}

function getResidentButton(residents) {
    return document.createElement("button")
        .addEventListener("click", (residents) => {

        });
}

function renderTable(data) {
    table.table.lastElementChild.remove();
    let tableBody = document.createElement("tbody")

    for (let planet of data) {
        planetRow["name"] = planet["name"];
        planetRow["diameter"] = Intl.NumberFormat('en-US').format(planet["diameter"]) + " km";
        planetRow["climate"] = planet["climate"];
        planetRow["terrain"] = planet["terrain"];
        planetRow["water"] = planet["surface_water"] !== "unknown" ?
            planet["surface_water"] + "%" : planet["surface_water"];
        planetRow["population"] = planet["population"] !== "unknown" ?
            Intl.NumberFormat('en-US').format(planet["population"]) + " people" : planet["population"];
        planetRow["residents"] = planet["residents"].length === 0 ?
            "No known residents" : getResidentButton(planet["residents"]);
        console.log(planet["residents"])
        let row = document.createElement("tr");

        for (let i = 0; i < Object.keys(planetRow).length; i++) {
            let cell = document.createElement("td");
            cell.innerHTML = Object.values(planetRow)[i];
            row.appendChild(cell)

        }
        tableBody.appendChild(row)
        table.table.appendChild(tableBody)
    }
}


function turnPage() {
    buttons.previous.addEventListener("click", function() {getData(planetPage.previous)})
    buttons.next.addEventListener("click", function() {getData(planetPage.next)})
}

fillTableHeader()
getData()
turnPage()