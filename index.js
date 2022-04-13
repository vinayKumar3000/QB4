let data;
let selectedClass = 10;
let index = 4;
let performance = "normal";
let clicked = false;

document.querySelector(".generate").addEventListener("click", (e) => {
  console.log("first");
  var tbody = document.querySelector("tbody");
  tbody.querySelectorAll("tr").forEach((n) => n.remove());
  console.log(data);
  console.log(performance);
  if (performance === "LtoH") {
    displayClass(
      returnStudentsByLtoHPerformance([...data.classes[index].studentresults])
    );
  }
  if (performance === "HtoL") {
    displayClass(
      returnStudentsByHtoLPerformance([...data.classes[index].studentresults])
    );
  } else {
    displayClass([...data.classes[index].studentresults]);
  }
});

document.querySelector(".classes").addEventListener("change", (e) => {
  selectedClass = parseInt(e.target.value);
  index = selectedClass - 6;
});

document.querySelector(".performance").addEventListener("change", (e) => {
  performance = e.target.value;
});

document.querySelector("#asc").addEventListener("click", (e) => {
  console.log("clicked");
  console.log(data);
  var tbody = document.querySelector("tbody");
  tbody.querySelectorAll("tr").forEach((n) => n.remove());
  clicked = !clicked;
  if (clicked) {
    displayClass(returnStudentsByName([...data.classes[index].studentresults]));
  } else {
    displayClass([...data.classes[index].studentresults]);
  }
});
document.querySelector(".left").addEventListener("click", (e) => {
  const columnLeft = document.querySelectorAll(".column-left").forEach((n) => {
    n.setAttribute("class", "l");
  });
  const columnRight = document
    .querySelectorAll(".column-right")
    .forEach((n) => {
      n.setAttribute("class", "finalScore");
    });
});
document.querySelector(".right").addEventListener("click", (e) => {
  const columnLeft = document.querySelectorAll(".l").forEach((n) => {
    n.className = "column-left";
  });
  const columnRight = document.querySelectorAll(".finalScore").forEach((n) => {
    n.className = "column-right";
  });
});

async function fetchData() {
  let response = await fetch("./students.json");
  data = await response.json();
  displayClass([...data.classes[index].studentresults]); //class 10 students
}

fetchData();

function displayClass(students) {
  var tbody = document.querySelector("tbody");
  students.forEach((student) => {
    var tr = document.createElement("tr");
    var th = document.createElement("th");
    th.className = "studentName";
    th.textContent = student.studentName;
    var td1 = document.createElement("td");
    td1.className = "l";
    td1.textContent = student.rank;
    var td2 = document.createElement("td");
    td2.className = "l";
    td2.textContent = student.completedPercent + student.peformanceLevel;
    var td3 = document.createElement("td");
    td3.className = "l";
    td3.textContent = student.mid1Score;
    var td4 = document.createElement("td");
    td4.className = "l";
    td4.textContent = student.mid2score;
    var td5 = document.createElement("td");
    td5.className = "finalScore";
    td5.textContent = student.finalscore;
    tr.appendChild(th);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tbody.appendChild(tr);
  });
}

let sortedByNames;

function returnStudentsByName(names) {
  sortedByNames = names.sort((a, b) => {
    const name1 = a.studentName.toUpperCase();
    const name2 = b.studentName.toUpperCase();

    let comparison = 0;

    if (name1 > name2) {
      comparison = 1;
    } else if (name1 < name2) {
      comparison = -1;
    }
    return comparison;
  });
  return sortedByNames;
}

let sortedByLtoHPercentage;
function returnStudentsByLtoHPerformance(percentages) {
  sortedByLtoHPercentage = percentages.sort((a, b) => {
    const name1 = a.completedPercent.toUpperCase();
    const name2 = b.completedPercent.toUpperCase();

    let comparison = 0;

    if (name1 > name2) {
      comparison = 1;
    } else if (name1 < name2) {
      comparison = -1;
    }
    return comparison;
  });

  console.log(sortedByLtoHPercentage);
  return sortedByLtoHPercentage;
}

let sortedByHtoLPercentage;
function returnStudentsByHtoLPerformance(percentages) {
  sortedByHtoLPercentage = percentages.sort((a, b) => {
    const name1 = a.completedPercent.toUpperCase();
    const name2 = b.completedPercent.toUpperCase();

    let comparison = 0;

    if (name1 > name2) {
      comparison = -1;
    } else if (name1 < name2) {
      comparison = 1;
    }
    return comparison;
  });

  console.log(sortedByHtoLPercentage);
  return sortedByHtoLPercentage;
}
