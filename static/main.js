const planetTable = {
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
    start: 'http://swapi.dev/api/planets',
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

const residentTableHeader = ["Name", "Height", "Mass", "Hair color", "Skin color", "Eye color", "Birth year", "Gender"]

let residentRow = {
    name: null,
    height: null,
    mass: null,
    hair_color: null,
    skin_color: null,
    eye_color: null,
    birth_year: null,
    gender: null
}



function turnPage() {
    buttons.previous.addEventListener("click",
        function() {getData(planetPage.previous).then(updatePlanetTable)});
    buttons.next.addEventListener("click",
        function() {getData(planetPage.next).then(updatePlanetTable)});
}

function fillTableHeader() {
    planetTable.tableHead.forEach(function(th, index) {
        th.innerHTML = planetTable.header[index]
    });
}

async function getData(url) {
    const response = await fetch(url);
    return await response.json();
}


function updatePlanetTable(planets) {
    planetPage.next = planets['next']
    buttons.next.disabled = planetPage.next === null;
    planetPage.previous = planets['previous']
    buttons.previous.disabled = planetPage.previous === null;

    renderPlanetTable(planets['results']);
}

function renderPlanetTable(data) {
    planetTable.table.lastElementChild.remove();
    let tableBody = create("tbody")

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
            "No known residents" : getResidentModal(planet["name"], planet["residents"]);
        let row = create("tr");

        for (let i = 0; i < Object.keys(planetRow).length; i++) {
            let cell = create("td");
            if (typeof Object.values(planetRow)[i] === "string") {
                cell.innerText = Object.values(planetRow)[i];
            } else {
                cell.appendChild(Object.values(planetRow)[i])
            }
            row.appendChild(cell)

        }
        if (sessionStorage.getItem("user") === null) {
            let cell = create("td")
            let button = getButton();
            button.innerText = "Vote";
            cell.appendChild(button);
            row.appendChild(cell)
        }
        tableBody.appendChild(row)
        planetTable.table.appendChild(tableBody)
    }
}

function getResidentModal(planet, residents) {
    const id = planet + "Modal";
    const modalButton = getButton();
    modalButton.setAttribute("data-toggle", "modal");
    modalButton.setAttribute("data-target", `#${id}`);
    modalButton.innerHTML = `${residents.length} resident(s)`

    let modal = getModal();
    modal.setAttribute("id", id);
    modal.querySelector(".modal-title").innerHTML = `Residents of ${planet}`;
    modal.querySelector(".modal-body").appendChild(getResidentTable(residents));

    let modalWithBth = create("div")
    modalWithBth.appendChild(modalButton);
    modalWithBth.appendChild(modal)
    return modalWithBth
}

function getResidentTable(residents) {
    let tableContent = [];
    residents.forEach((resident) => {
        getData(resident).then(fillResidentRow);
        tableContent.push(Object.values(residentRow));
    })
    return getTable(residentTableHeader, tableContent)
}

function fillResidentRow(resident) {
    for (let key of Object.keys(residentRow)) {
        residentRow[key] = resident[key];
    }
}

function getButton() {
    const button = create("button")
    button.setAttribute("class", "btn btn-secondary")
    return button
}

function getModal() {
    let modal = create("div")
    modal.setAttribute("class", "modal")
    modal.innerHTML = '<div class="modal-dialog" role="document">\n' +
        '    <div class="modal-content">\n' +
        '      <div class="modal-header">\n' +
        '        <h5 class="modal-title"></h5>\n' +
        '      </div>\n' +
        '      <div class="modal-body">\n' +
        '      </div>\n' +
        '      <div class="modal-footer">\n' +
        '        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>\n' +
        '      </div>\n' +
        '    </div>\n' +
        '  </div>';
    return modal
}

function getTable(headers, content) {
    const table = create("table");

    const thead = create("thead");
    table.appendChild(thead);
    const headRow = create("tr");
    thead.appendChild(headRow);
    headers.forEach((header) => {
        const th = create("th");
        th.innerHTML = header;
        thead.appendChild(th);
    })

    const tbody = create("tbody");
    table.appendChild(tbody);
    for (let row in content) {
        const tr = create("tr");
        tbody.appendChild(tr);
        for (let cell in row) {
            const td = create("td");
            tr.appendChild(td);
            td.innerHTML = cell;
        }
    }

    return table
}

function create(element) {
    return document.createElement(element)
}

fillTableHeader()
getData(planetPage.start).then(updatePlanetTable)
turnPage()