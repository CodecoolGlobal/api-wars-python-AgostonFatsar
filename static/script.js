const table = {
    header: ["Name", "Diameter", "Climate", "Terrain", "Surface Water Percentage", "Population", "Residents", ""],
    tableHead: document.querySelectorAll("th"),
    tableRows: document.querySelectorAll("tr"),
}

const buttons = {
    previous: document.getElementById("previous"),
    next: document.getElementById("next")
}

const planetPage = {
    previous: null,
    next: null
}

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
        planetPage.previous = data['previous']
        renderHTML(data['results']);
        console.log(data['results'])
    }
    request.send()
}

function renderHTML(data) {
    table.tableRows.forEach(function(row, index) {
        if (index > 0) {
            let rowCells = row.querySelectorAll("td")
            let planet = data[index]
            const newRow = {
                0: planet["name"],
                1: Intl.NumberFormat('en-US').format(planet["diameter"]) + " km",
                2: planet["climate"],
                3: planet["terrain"],
                4: planet["surface_water"],
                5: Intl.NumberFormat('en-US').format(planet["population"]) + " people",
                6: "residents"
            }
            for (let i = 0; i < 8; i++) {
                rowCells[i].innerHTML = newRow[i]
            }
        }

    })
}

function turnPage() {
    buttons.previous.addEventListener("click", function() {getData(planetPage.previous)})
    buttons.next.addEventListener("click", function() {getData(planetPage.next)})
}

fillTableHeader()
getData()