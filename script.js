const seesaw = document.getElementById("seesaw");
const pivot = document.querySelector(".pivot");

const leftWeightDisplay = document.getElementById("left-weight");
const rightWeightDisplay = document.getElementById("right-weight");
const nextWeightDisplay = document.getElementById("next-weight");
const angleDisplay = document.getElementById("tilt-angle");
const resetBtn = document.getElementById("reset-btn");
const logContainer = document.getElementById("log-container");

let objects = [];
let currentNextWeight = 0;
const Seesaw_Width = 500;

window.addEventListener("load", function () {
  generateNextWeight();
  const savedState = localStorage.getItem("seesawState");

  if (savedState) {
    objects = JSON.parse(savedState);
    objects.forEach((obj) => {
      createBox(obj);
    });
    updatePhysics();
  }
});

function generateNextWeight() {
  currentNextWeight = Math.floor(Math.random() * 10) + 1;

  nextWeightDisplay.innerText = currentNextWeight;
}

seesaw.addEventListener("click", function (event) {
  const rect = seesaw.getBoundingClientRect();
  const center = rect.width / 2;
  const clickX = event.clientX - rect.left;
  const distanceFromCenter = clickX - center;

  const weight = currentNextWeight;

  const newObject = {
    id: Date.now(),
    weight: weight,
    distance: distanceFromCenter,
    cssLeft: clickX,
  };

  objects.push(newObject);
  createBox(newObject);

  const side = distanceFromCenter < 0 ? "Sol" : "Sağ";
  addLog(
    `${weight}kg ${side} tarafa, merkezden ${Math.abs(
      Math.round(distanceFromCenter)
    )}px uzağa eklendi.`
  );
  /* console.log("Eklenen nesne:", newObject); */

  updatePhysics();
  saveState();

  generateNextWeight();
});

function saveState() {
  localStorage.setItem("seesawState", JSON.stringify(objects));
}

function createBox(obj) {
  const box = document.createElement("div");
  box.className = "box";
  box.style.left = obj.cssLeft + "px";
  const size = 30 + obj.weight * 2;

  box.style.width = size + "px";
  box.style.height = size + "px";
  box.innerText = obj.weight;

  if (obj.distance < 0) {
    box.style.backgroundColor = "#ec5342ff";
  } else {
    box.style.backgroundColor = "#2c8ac9ff";
  }

  seesaw.appendChild(box);
}

function addLog(message) {
  const entry = document.createElement("div");
  entry.className = "log-entry";
  if (message.includes("Sol")) {
    entry.style.borderLeftColor = "#ec5342ff";
    entry.style.color = "#c0392b";
  } else {
    entry.style.borderLeftColor = "#2c8ac9ff";
    entry.style.color = "#2980b9";
  }

  entry.innerText = `> ${message}`;
  logContainer.prepend(entry);
}

function updatePhysics() {
  let leftTorque = 0;
  let rightTorque = 0;
  let leftTotalWeight = 0;
  let rightTotalWeight = 0;

  objects.forEach((obj) => {
    const torque = obj.weight * Math.abs(obj.distance);

    if (obj.distance < 0) {
      leftTorque += torque;
      leftTotalWeight += obj.weight;
    } else {
      rightTorque += torque;
      rightTotalWeight += obj.weight;
    }
  });

  leftWeightDisplay.innerText = leftTotalWeight;
  rightWeightDisplay.innerText = rightTotalWeight;
  const netTorque = rightTorque - leftTorque;

  let angle = netTorque / 800;
  if (angle > 30) angle = 30;
  if (angle < -30) angle = -30;

  angleDisplay.innerText = angle.toFixed(1) + "°";
  seesaw.style.transform = `rotate(${angle}deg)`;
}

resetBtn.addEventListener("click", function () {
  objects = [];
  seesaw.innerHTML = "";

  localStorage.removeItem("seesawState");
  logContainer.innerHTML = "";

  updatePhysics();
  generateNextWeight();
});
