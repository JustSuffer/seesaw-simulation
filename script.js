const seesaw = document.getElementById("seesaw");
const pivot = document.querySelector(".pivot");

const leftWeightDisplay = document.getElementById("left-weight");
const rightWeightDisplay = document.getElementById("right-weight");

let objects = [];

window.addEventListener("load", function () {
  const savedState = localStorage.getItem("seesawState");

  if (savedState) {
    objects = JSON.parse(savedState);
    objects.forEach((obj) => {
      createBox(obj);
    });
    updatePhysics();
  }
});

seesaw.addEventListener("click", function (event) {
  const pivotRect = pivot.getBoundingClientRect();
  const pivotCenter = pivotRect.left + pivotRect.width / 2;

  const clickX = event.clientX;
  const distanceFromCenter = clickX - pivotCenter;

  const weight = Math.floor(Math.random() * 10) + 1;

  const newObject = {
    id: Date.now(),
    weight: weight,
    distance: distanceFromCenter,
    cssLeft: 300 + distanceFromCenter,
  };

  objects.push(newObject);
  createBox(newObject);
  /* console.log("Eklenen nesne:", newObject); */

  updatePhysics();
  saveState();
});

function saveState() {
  localStorage.setItem("seesawState", JSON.stringify(objects));
}

function createBox(obj) {
  const box = document.createElement("div");
  box.className = "box";
  box.style.left = obj.cssLeft + "px";
  const size = 30 + obj.weight * 3;

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

  let angle = netTorque / 1000;
  if (angle > 30) angle = 30;
  if (angle < -30) angle = -30;

  seesaw.style.transform = `rotate(${angle}deg)`;
}
