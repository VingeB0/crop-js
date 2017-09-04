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

	function draw() {
		ctx.save();
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.restore();
		ctx.drawImage(imgCanvas, 0, 0);
	};

	var updateDraw = setInterval( function() {
		draw();
		drawCropBox();
	}, 100);

	function clearCanvas() {
		clearInterval(updateDraw);
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	};

	var btnClear = document.querySelector('#Clear');
	btnClear.addEventListener('click', clearCanvas);

	function drawCropBox() {
		ctx.strokeStyle = "#000";
		ctx.strokeRect(10, 10, 160, 110);
	};

	canvas.addEventListener('mousedown', function(event) {
		event.preventDefault();
		var cursorX = event.clientX - canvas.offsetLeft;
		var cursorY = event.clientY - canvas.offsetTop;
		console.log(event.clientX);
		console.log(canvas.offsetLeft);
		console.log(event);
	});
	
	canvas.addEventListener('mouseup', function(event) {
		event.preventDefault();
		var cursorX = event.clientX - canvas.offsetLeft;
		var cursorY = event.clientY - canvas.offsetTop;
		console.log(event.clientX);
		console.log(canvas.offsetLeft);
		console.log(event);
	});

	canvas.addEventListener('mousemove', function(event) {
		event.preventDefault();

	});

	// canvas.addEventListener('mousedown', handlerMouseDownCropBox(event));
	// canvas.addEventListener('mouseup', handlerMouseUpCropBox(event));
	// canvas.addEventListener('mousemove', handlerMouseMoveCropBox(event));
};

canvas.addEventListener('mousewheel', function(event){
	event.preventDefault();

	var valueScale = event.wheelDelta/120;
	var zoom = Math.exp(valueScale * 0.2);
	ctx.scale(zoom, zoom);

	var cursorX = event.clientX - canvas.offsetLeft;
	var cursorY = event.clientY - canvas.offsetTop;

	var originX = 0;
	var originY = 0;
	ctx.translate(originX, originY);
	ctx.translate(
		-( cursorX / 1.5 + originX - cursorX / ( 1.5 * zoom ) ),
		-( cursorY / 1.5 + originY - cursorY / ( 1.5 * zoom ) )
	);
	console.log(-( cursorX / 1.5 + originX - cursorX / ( 1.5 * zoom ) ));
	console.log(-( cursorY / 1.5 + originY - cursorY / ( 1.5 * zoom ) ));

});

var moveTop = document.querySelector('#moveTop');
moveTop.addEventListener('click', function() {
	ctx.translate(0, -10);
});

var moveRight = document.querySelector('#moveRight');
moveRight.addEventListener('click', function() {
	ctx.translate(10, 0);
});

var moveBottom = document.querySelector('#moveBottom');
moveBottom.addEventListener('click', function() {
	ctx.translate(0, 10);
});

var moveLeft = document.querySelector('#moveLeft');
moveLeft.addEventListener('click', function() {
	ctx.translate(-10, 0);
});