
function fillTableHeader() {
    const tableHeader = ["Name", "Diameter", "Climate", "Terrain",
        "Surface Water Percentage", "Population", "Residents", ""]
    const tableHead = document.querySelectorAll("th")
    tableHead.forEach(function(th, index) {
        th.innerHTML = tableHeader[index]
    })
}

fillTableHeader()