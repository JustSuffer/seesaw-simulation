const seesaw = document.getElementById('seesaw');
const pivot = document.querySelector('.pivot');

let objects = [];


seesaw.addEventListener('click', function(event) => {
    const pivotRect = pivot.getBoundingClientRect();
    const pivotCenter = pivotRect.left + (pivotRect.width / 2);

    const clickX = event.clientX;
    const distanceFromCenter = clickX - pivotCenter;

    const weight= Math.floor(Math.random() * 10) + 1; 

    const newObject = {
        id: Date.now(),
        weight: weight,
        distanve: distanceFromCenter
        cssLeft: 300 + disctanceFromCenter
    };


    objects.push(newObject);
    createBox(newObject);
    console.log("Eklenen nesne:", newObject);




    });


function createBox(obj) {
    const box = document.createElement('div');
    box.className= 'box';
    box.style.left = obj.cssLeft + 'px';
    const size = 30 + (obj.weight * 3);

    box.style.width = size + 'px';
    box.style.height = size + 'px';
    box.innerText = obj.weight;


    if (obj.distance < 0) {
        box.style.backgroundColor = '#ec5342ff';
    } else {
        box.style.backgroundColor = '#2c8ac9ff';
    }

    seesaw.appendChild(box);
}