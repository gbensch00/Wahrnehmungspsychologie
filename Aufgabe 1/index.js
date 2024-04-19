let grid = document.getElementById("grid");

// 1 Runde alles schwarz
let round_1 = {"direction": "left", "color": "black", "searched_color": "black", "grid_size": 4, "positionX": 3, "positionY": 2}
// 2 Runde Farben nah beieinander, es darf nur eine Kombination von Farbe + Richtung richtig sein
let round_2 = {"direction": "left", "color": "pink", "searched_color": "red", "grid_size": 4, "positionX": 3, "positionY": 2}
// 3 Runde wie Runde 2 aber Starker Farbkontrast
let round_3 = {"direction": "left", "color": "green", "searched_color": "red", "grid_size": 4, "positionX": 3, "positionY": 2}

generateGrid(round_1)

function generateGrid(round) {
    for (let y = 0; y < round.grid_size; y++) {
        const row = document.createElement("div");
        row.classList.add("row");
        grid.appendChild(row)
        for (let x = 0; x < round.grid_size; x++) {
            let isCorrectPosition = y === round.positionY && x === round.positionX
            let cell = generateCell(isCorrectPosition, round.direction);
            row.appendChild(cell);
        }
    }
}

function handleClick(event, isCorrectPosition) {
    if(isCorrectPosition) {
        console.log("clicked correctly");
    } else {
        console.log("you are wrong");
    }
}

function generateCell(isCorrectPosition, directionToAvoid) {
    const cell = document.createElement("div");
    cell.addEventListener("click", function (event) {handleClick(event, isCorrectPosition)});
    const svg = createSvg();
    if (isCorrectPosition) {
        // die korrekte Zelle
        svg.style.rotate = getDegree(directionToAvoid).toString() + "deg";
    } else {
        svg.style.rotate = getRandomDirection(directionToAvoid).toString() + "deg";
    }
    cell.classList.add("cell");
    cell.appendChild(svg);
    return cell;
}

function getRandomDirection(directionToAvoid) {
    const directions = ["left", "up", "right", "down"];
    const filteredDirections = directions.filter(direction => direction !== directionToAvoid);
    let randomIndex = Math.floor(Math.random() * filteredDirections.length);
    let direction = filteredDirections[randomIndex];
    return getDegree(direction);
}

function getDegree(direction) {
    switch (direction) {
        case "up": return 0;
        case "left": return -90;
        case "right": return 90;
        case "down": return 180;
    }
}

function createSvg() {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('id', 'svg4619');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('x', '0px');
    svg.setAttribute('y', '0px');
    svg.setAttribute('width', '15px');
    svg.setAttribute('height', '15px');
    svg.setAttribute('viewBox', '0 0 15 15');
    svg.setAttribute('style', 'enable-background:new 0 0 15 15;');
    svg.setAttribute('xml:space', 'preserve');

    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute('id', 'path21090-9');
    path.setAttribute('d', 'M7.5385,2C7.2437,2,7.0502,2.1772,6.9231,2.3846l-5.8462,9.5385C1,12,1,12.1538,1,12.3077C1,12.8462,1.3846,13,1.6923,13h11.6154C13.6923,13,14,12.8462,14,12.3077c0-0.1538,0-0.2308-0.0769-0.3846L8.1538,2.3846C8.028,2.1765,7.7882,2,7.5385,2z');

    svg.appendChild(path);

    return svg;
}

