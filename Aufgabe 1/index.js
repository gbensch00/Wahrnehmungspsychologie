let grid = document.getElementById("grid");
let experimentData = [];
let experimentID = 0;
let successfulRound = true;
let successfulRounds = 0;
let start;
let end;


// 1 Runde alles schwarz
let round_1 = {"round_number": 0, "direction": "left", "color": ["black"], "searched_color": "black", "grid_size": 10, "positionX": 3, "positionY": 2}
// 2 Runde Farben nah beieinander, es darf nur eine Kombination von Farbe + Richtung richtig sein
let round_2 = {"round_number": 1, "direction": "down", "color": ["darkred"], "searched_color": "red", "grid_size": 10, "positionX": 4, "positionY": 3}

let round_3 = {"round_number": 2, "direction": "up", "color": ["darkred", "red"], "searched_color": "red", "grid_size": 10, "positionX": 1, "positionY": 4}
// 3 Runde wie Runde 2 aber Starker Farbkontrast
let round_4 = {"round_number": 3, "direction": "right", "color": ["green", "blue", "yellow", "red"], "searched_color": "red", "grid_size": 10, "positionX": 4, "positionY": 3}

let rounds = [round_1, round_2, round_3, round_4]
let current_round = 0;

setUpRound(rounds[current_round])

function setUpRound(round) {
    
    let searched_triangle = document.getElementById("searched-triangle");
    searched_triangle.style.rotate = getDegree(round.direction) + "deg";
    searched_triangle.style.fill = round.searched_color;
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
    let timer = document.getElementById("timer");
    timer.style.display = "block";
    let count = 3;

    function updateTimer() {
        timer.innerHTML = count.toString();
        if (count === 0) {
            timer.style.display = "none"; 
        }
        count--;
        if (count >= 0) {
            setTimeout(updateTimer, 1000);
        }
    }
    updateTimer();
    start = Date.now();
    setTimeout(() => {
        generateGrid(round);
    }, 4000)
}



function generateGrid(round) {
    for (let y = 0; y < round.grid_size; y++) {
        const row = document.createElement("div");
        row.classList.add("row");
        grid.appendChild(row)
        for (let x = 0; x < round.grid_size; x++) {
            let isCorrectPosition = y === round.positionY && x === round.positionX
            let cell = generateCell(round, isCorrectPosition);
            row.appendChild(cell);
        }
    }
}

async function handleClick(event, isCorrectPosition) {
    if (isCorrectPosition) {
        console.log("clicked correctly");
        successfulRound = true;
        collectData(current_round);
    } else {
        console.log("you are wrong");
        successfulRound = false;
          collectData(current_round);
    }
    if(current_round < rounds.length -1){
        current_round++;
        setUpRound(rounds[current_round]);
    } else {
        //show results;
        console.log("experiment done!");
        summarizeData(experimentData);
    }
}

function generateCell(round, isCorrectPosition) {
    const cell = document.createElement("div");
    cell.addEventListener("click", function (event) {handleClick(event, isCorrectPosition)});
    const svg = createSvg();
    if (isCorrectPosition) {
        // die korrekte Zelle
        svg.style.rotate = getDegree(round.direction).toString() + "deg";
        svg.style.fill = round.searched_color;
    } else {
        let randomValues = getRandomDirection(round.direction, round.searched_color, round.color);
        svg.style.rotate = randomValues[0].toString() + "deg";
        svg.style.fill = randomValues[1];
    }
    cell.classList.add("cell");
    cell.appendChild(svg);
    return cell;
}

function getRandomDirection(directionToAvoid, searched_color, color) {
    const directions = ["left", "up", "right", "down"];
    //const filteredDirections = directions.filter(direction => direction !== directionToAvoid);
    let randomIndex = Math.floor(Math.random() * directions.length);
    let direction = directions[randomIndex];
    let randomColorValue = Math.floor(Math.random() * (color.length - 1 + 1));
    let randomColor = color[randomColorValue];
    if (directionToAvoid === direction && randomColor === searched_color) {
        return getRandomDirection(directionToAvoid, searched_color, color);
    } else {
        return [getDegree(direction), randomColor];
    }
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


function collectData(round) {
  console.log("current round: " + current_round);
  let end = Date.now();
  let time = (((end - start) - 4000) / 1000);
  console.log("time: " + time + "s");

  
   let currentExperiment = {
      experimentID: experimentID,
      rounds: [] 
    };
    experimentData.push(currentExperiment);
  

  // Prepare data object for the current round
  let roundData = {
    round: current_round,
    reactionTime: time,
    success: successfulRound
  };

  // Add round data to the current experiment
  currentExperiment.rounds.push(roundData);

  // Log experiment data to console
  console.log(experimentData);
}
function summarizeData(data) {
  let totalReactionTime = 0;
  let longestReactionTime = 0;
  let shortestReactionTime = 0;


  for (let experiment of data) {

    for (let round of experiment.rounds) {
        console.log("round success: " + round.success);
      if (round.success === true) {
        successfulRounds++;
      }
      totalReactionTime += round.reactionTime;

      if (round.reactionTime > longestReactionTime) {
        longestReactionTime = round.reactionTime;
      }
      if (round.reactionTime < shortestReactionTime) {
            shortestReactionTime = round.reactionTime;
      }
    }
  }
    
  let averageReactionTime = totalReactionTime / rounds.length;

  console.log("Analysis of Experiment Data:");
  console.log("Successful Rounds:", successfulRounds);
  console.log("Total Reaction Time:", totalReactionTime.toFixed(2) + "s");
  console.log("Average Reaction Time:", averageReactionTime.toFixed(2) + "s");
  console.log("Longest Reaction Time:", longestReactionTime.toFixed(2) + "s");
  console.log("Shortest Reaction Time:", shortestReactionTime.toFixed(2) + "s");
}
