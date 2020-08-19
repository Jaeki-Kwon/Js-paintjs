// canvas 위에 마우스르 두면 그걸 감지하는 것
/* 
    canvas는 html5의 한 요소 
    canvas 안에 있는 픽셀들을 다루는 것
*/
const canvas = document.getElementById("jsCanvas");
// context : 픽셀들을 컨트롤 하기위해 사용
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// 이미지 저장 시 배경화면을 흰색으로 하기 위하여 사용
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

// strokeStyle : 우리가 그릴 선들이 모두 이 색을 갖음
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

/* canvas 안에 사각형 색상 정하기
ctx.fillStyle = "green";
// canvas 안에 사각형 그리기
ctx.fillRect(50, 20, 100, 49);
*/

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  // canvas 내에서의 좌표 얻기
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    // path : 기본적인 선
    console.log("creating path in", x, y);
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    // lineTo, stroke 는 마우스를 움직이는 내내 발생한다!!
    // path의 이전 위치(moveTo(x, y))에서 지금 위치까지 선을 만듬
    console.log("creating line in", x, y);
    ctx.lineTo(x, y);
    // stroke : 현재의 sub-path를 현재의 stroke style롤 획을 그음
    ctx.stroke();
  }
}

function handleColorClick(event) {
  // line 색상 설정하기
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  // line size 설정하기
  // console.log(event.target.value);
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handelModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleSaveClick() {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS!!";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);

  /* 마우스가 canvas에 들어갔을 때 canvas를 클릭하는 순간을 인지하게 하고
   canvas를 클릭했을 때 painting을 시작*/
  // mousedown : 클릭했을 때 발생하는 event
  canvas.addEventListener("mousedown", startPainting);
  // 클릭을 놓으면 painting 실행 취소
  canvas.addEventListener("mouseup", stopPainting);
  // painting을 하다가 canvas를 벗어날 때 실행 취소
  canvas.addEventListener("mouseleave", stopPainting);
  // 클릭 시 배경화면 색상 변경
  canvas.addEventListener("click", handleCanvasClick);
  // 마우스 우클릭
  canvas.addEventListener("contextmenu", handleCM);
}

// line 색상 설정하기
Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

// line size 설정하기
if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handelModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
