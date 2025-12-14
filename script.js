const container = document.querySelector(".container");
const btnResize = document.querySelector("#btnResize");
const btnClear = document.querySelector("#btnClear");
const btnErase = document.querySelector("#btnErase");

let isMouseDown = false;
let isErasing = false;

document.addEventListener("mousedown", () => {
     isMouseDown = true;
});

document.addEventListener("mouseup", () => {
     isMouseDown = false;
});


btnResize.addEventListener("click", () => {
    let input = prompt("Enter number of square per side(max 100): ")
    if (input === null) return;

    input = Number(input);

    if (input < 1 || input > 100 || isNaN(input)) {
        alert("Please enter a number between 1 and 100");
        return;
    }

    currentGridSize = input;
    createGrid(currentGridSize);
});


function createGrid(gridPerSide) {

    container.innerHTML = "";

    const containerSize = container.clientWidth;
    const gridSize = containerSize / gridPerSide;
    const totalGrid = gridPerSide * gridPerSide;

    for (let i = 0; i < totalGrid; i++) {
        const gridItem = document.createElement("div");
        gridItem.classList.add("gridItem");

        gridItem.style.width = `${gridSize}px`;
        gridItem.style.height = `${gridSize}px`;

        container.appendChild(gridItem);

        gridItem.dataset.opacity = 0;

        gridItem.addEventListener("mousedown", () => {
        if (isErasing) {
                gridItem.style.backgroundColor = "rgb(249, 249, 249)";
                gridItem.dataset.opacity = 0;
        } else {
            darken(gridItem);
        }
        });

        gridItem.addEventListener("mouseover", () => {
        if (isMouseDown) {
            if(isErasing) {
                gridItem.style.backgroundColor = "rgb(249, 249, 249)";
                gridItem.dataset.opacity = 0;
            } else {
                darken(gridItem);
            }
        } else {
            gridItem.classList.add("hover");
        }
        });

        gridItem.addEventListener("mouseout", () => {
        gridItem.classList.remove("hover");
        });
    }
}

function darken(gridItem) {
    let currentOpacity = Number(gridItem.dataset.opacity);

    if (currentOpacity < 1) {
        currentOpacity += 0.1;
        gridItem.dataset.opacity = currentOpacity;
        gridItem.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity})`;
    }
}

let currentGridSize = 16;

window.addEventListener("resize", () => {
    createGrid(currentGridSize);
})

btnClear.addEventListener("click", () => {
    document.querySelectorAll('.gridItem').forEach(item => {
        item.style.backgroundColor = "rgb(249, 249, 249)";
        item.dataset.step = 0;
    });
})

btnErase.addEventListener("click", () => {
    isErasing = !isErasing;
    btnErase.classList.toggle("active", isErasing);
})



createGrid(16);

