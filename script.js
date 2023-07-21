const grid = document.querySelector(".grid");
const sizePicker = document.querySelector(".sizePicker");
const gridCheckbox = document.querySelector(".gridCheckbox");
const tools = document.querySelectorAll(".tools>button");
let mouseDown = false;

function draw(e) {

  function rgbToHex(rgb) {
    const rgbValues = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    let red = "0" + parseInt(rgbValues[1]).toString(16);
    let green = "0" + parseInt(rgbValues[2]).toString(16);
    let blue = "0" + parseInt(rgbValues[3]).toString(16);
    const hex = '#' + red.slice(-2) + green.slice(-2) + blue.slice(-2);
    return hex;
  }

  switch(document.querySelector('.selectedTool').classList[0]) {
    case('pencil'):
      e.target.style.backgroundColor = document.querySelector('.colorPicker').value;
      break;
    case('rainbowPencil'):
      e.target.style.backgroundColor = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");
      break;
    case('eraser'):
      e.target.style.backgroundColor = '#ffffff';
      break;
    case('eyedropper'):
      if(e.target.style.backgroundColor) {
        document.querySelector('.colorPicker').value = rgbToHex(e.target.style.backgroundColor);
      } else {
        document.querySelector('.colorPicker').value = '#ffffff';
      }
      break;
  }
}

function drawGrid(size) {
  for (let i = 0; i < (size * size); i++) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('cell');
    newDiv.style.width = `calc(100%/${size})`
    newDiv.style.height = `calc(100%/${size})`  
    newDiv.addEventListener('mousedown', (e) => {
      e.preventDefault();
      mouseDown = true;
    });
    newDiv.addEventListener('mouseup', () => mouseDown = false);
    grid.addEventListener('mouseleave', () => mouseDown = false);
    newDiv.addEventListener('mousemove', (e) => {
      if (mouseDown) {
        draw(e);
      }
    });
    grid.appendChild(newDiv);
    document.querySelector(".sizeInfo").textContent = `${size} x ${size}`
    gridCheckbox.checked = false;
  }
}

function deleteGrid() {
  grid.innerHTML = "";
}

function toggleBorder(e) {
  if (this.checked) {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => cell.style.border = '1px solid rgb(168, 168, 168)');
  } else {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => cell.style.border = 'none');
  }
}

sizePicker.addEventListener('change', (e) => {
  deleteGrid(e);
  drawGrid(e.target.value);
});
gridCheckbox.addEventListener('change', toggleBorder);
drawGrid(32);
tools.forEach(tool => tool.addEventListener('click', (e) => {
  tools.forEach(tool => tool.classList.remove('selectedTool'));
  e.target.classList.add('selectedTool');
}))