'use strict;'

var canvas = document.querySelector('#crop-img');
var ctx = canvas.getContext('2d');
canvas.width = 700;
canvas.height = 350;

var inputLoadImg = document.querySelector('#loadImg');
inputLoadImg.addEventListener('change', loadImg);

function loadImg(e) {
	var imgCanvas = new Image();
	imgCanvas.src = URL.createObjectURL(e.target.files[0]);

	var x = 0;
	var y = 0;
	var moveTop = document.querySelector('#moveTop');

	function clearCanvas() {
		ctx.save();
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.restore();
	};

	moveTop.addEventListener('click', handlerMoveTop);
	function handlerMoveTop(temp) {
		ctx.drawImage(imgCanvas, 0, x);
		clearCanvas();
		x -= 10;
		draw(x);
	};

	moveRight.addEventListener('click', handlerMoveRight);
	function handlerMoveRight(temp) {
		ctx.drawImage(imgCanvas, y, 0);
		clearCanvas();
		y += 10;
		draw(y);
	};

	moveBottom.addEventListener('click', handlerMoveBottom);
	function handlerMoveBottom(temp) {
		ctx.drawImage(imgCanvas, y, 0);
		clearCanvas();
		x += 10;
		draw(x);
	};

	moveLeft.addEventListener('click', handlerMoveLeft);
	function handlerMoveLeft(temp) {
		ctx.drawImage(imgCanvas, y, 0);
		clearCanvas();
		y -= 10;
		draw(y);
	};

	var stopPressing;
	moveTop.addEventListener('mouseup', handlerMoveTopStopPressing);
	moveRight.addEventListener('mouseup', handlerMoveTopStopPressing);
	moveBottom.addEventListener('mouseup', handlerMoveTopStopPressing);
	moveLeft.addEventListener('mouseup', handlerMoveTopStopPressing);
	function handlerMoveTopStopPressing() {
		clearInterval(stopPressing);
	};
	moveTop.addEventListener('mousedown', handlerMoveTopRunPressing);
	moveRight.addEventListener('mousedown', handlerMoveRightRunPressing);
	moveBottom.addEventListener('mousedown', handlerMoveBottomRunPressing);
	moveLeft.addEventListener('mousedown', handlerMoveLeftRunPressing);
	function handlerMoveTopRunPressing() {
		stopPressing = setInterval( function() {
			handlerMoveTop();
		}, 100);
	};

	function handlerMoveRightRunPressing() {
		stopPressing = setInterval( function() {
			handlerMoveRight();
		}, 100);
	};

	function handlerMoveBottomRunPressing() {
		stopPressing = setInterval( function() {
			handlerMoveBottom();
		}, 100);
	};

	function handlerMoveLeftRunPressing() {
		stopPressing = setInterval( function() {
			handlerMoveLeft();
		}, 100);
	};

	function draw() {
		ctx.save();
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.restore();
		ctx.drawImage(imgCanvas, y, x);
	};

	var updateDraw = setInterval( function() {
		draw();
		drawCropBox();
		// drawStartImg();
	}, 100);

	var btnClear = document.querySelector('#Clear');
	btnClear.addEventListener('click', function() {
		clearInterval(updateDraw);
		clearCanvas();
	});

	function drawCropBox() {
		ctx.strokeStyle = "#FF0000";
		ctx.strokeRect(10, 10, 160, 110);
		ctx.scale(1, 1);
	};

	var wCropBox = document.querySelector('#widthCropBox');
	var hCropBox = document.querySelector('#heightCropBox');
	var LCropBox = document.querySelector('#indentLeft');
	var TCropBox = document.querySelector('#indentTop');

	var valHCropBox = hCropBox.value;

	wCropBox.addEventListener('change', function() {
		var valWCropBox = wCropBox.value;
		drawCropBox();
	});

	canvas.addEventListener('mousedown', function(event) {
		event.preventDefault();
		var cursorX = event.clientX - canvas.offsetLeft;
		var cursorY = event.clientY - canvas.offsetTop;
		// console.log(event.clientX);
		// console.log(canvas.offsetLeft);
		// console.log(event);
	});
	
	canvas.addEventListener('mouseup', function(event) {
		event.preventDefault();
		var cursorX = event.clientX - canvas.offsetLeft;
		var cursorY = event.clientY - canvas.offsetTop;
		// console.log(event.clientX);
		// console.log(canvas.offsetLeft);
		// console.log(event);
	});

	canvas.addEventListener('mousemove', function(event) {
		event.preventDefault();

	});

	// canvas.addEventListener('mousedown', handlerMouseDownCropBox(event));
	// canvas.addEventListener('mouseup', handlerMouseUpCropBox(event));
	// canvas.addEventListener('mousemove', handlerMouseMoveCropBox(event));

	canvas.addEventListener('mousewheel', function(event){
		event.preventDefault();
		// draw();
		var valueScale = event.wheelDelta/120;
		var zoom = Math.exp(valueScale * 0.2);
		ctx.scale(zoom, zoom);
	// var cursorX = event.clientX - canvas.offsetLeft;
	// var cursorY = event.clientY - canvas.offsetTop;

	// var originX = 0;
	// var originY = 0;
	// ctx.translate(originX, originY);
	// ctx.translate(
	// 	-( cursorX / 1.5 + originX - cursorX / ( 1.5 * zoom ) ),
	// 	-( cursorY / 1.5 + originY - cursorY / ( 1.5 * zoom ) )
	// );
	// console.log(-( cursorX / 1.5 + originX - cursorX / ( 1.5 * zoom ) ));
	// console.log(-( cursorY / 1.5 + originY - cursorY / ( 1.5 * zoom ) ));
	});

};