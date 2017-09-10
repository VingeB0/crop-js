'use strict;'

var canvas = document.querySelector('#mainCanvas');
var ctx = canvas.getContext('2d');
canvas.width = 700;
canvas.height = 350;

var inputLoadImg = document.querySelector('#loadImg');
inputLoadImg.addEventListener('change', loadImg);

function loadImg(e) {
    var imgCanvas = new Image();

    imgCanvas.addEventListener('load', getHeigthWidth);

    function getHeigthWidth() {
        zoomX = imgCanvas.naturalWidth;
        zoomY = imgCanvas.naturalHeight;
        draw(zoomX, zoomY);
    };

    imgCanvas.src = URL.createObjectURL(e.target.files[0]);
    clearInterval(updateDraw);
    clearCanvas();

    var zoomX;
    var zoomY;
    canvas.addEventListener('mousewheel', wheelScaleImg);

    function wheelScaleImg(event) {
        event.preventDefault();
        var valueScale = event.wheelDelta / 120;
        var zoom = Math.exp(valueScale * 0.2);
        clearCanvas();
        zoomY = zoomY * zoom;
        zoomX = zoomX * zoom;
        draw(zoomX, zoomY);
        console.log(zoomX);
        console.log(zoomY);
    };

    function draw(temp) {
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
        // wheelScaleImg(zoomY, zoomX);
        ctx.drawImage(imgCanvas, y, x, zoomX, zoomY);
    };

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
        stopPressing = setInterval(function() {
            handlerMoveTop();
        }, 100);
    };

    function handlerMoveRightRunPressing() {
        stopPressing = setInterval(function() {
            handlerMoveRight();
        }, 100);
    };

    function handlerMoveBottomRunPressing() {
        stopPressing = setInterval(function() {
            handlerMoveBottom();
        }, 100);
    };

    function handlerMoveLeftRunPressing() {
        stopPressing = setInterval(function() {
            handlerMoveLeft();
        }, 100);
    };

    var updateDraw = setInterval(function() {
        draw();
        drawCropBox();
        // drawStartImg();
    }, 10);

    var btnClear = document.querySelector('#Clear');
    btnClear.addEventListener('click', function() {
        clearInterval(updateDraw);
        clearCanvas();
    });

    var colorRectStroke = "#FF0000";

    function drawCropBox(temp) {
        ctx.strokeStyle = colorRectStroke;
        ctx.strokeRect(valLCropBox, valTCropBox, valWCropBox, valHCropBox);
        ctx.scale(valScaleX, valScaleY);
    };

    var isDrag = false;
    canvas.addEventListener('mousemove', function(e) {
        if (isDrag) {
            valLCropBox = e.pageX - canvas.offsetLeft - (valWCropBox) / 2;
            valTCropBox = e.pageY - canvas.offsetTop - (valHCropBox / 2);
            drawCropBox(valLCropBox, valTCropBox);
        };
    });

    canvas.addEventListener('mousedown', function(e) {
        if (e.pageX < valLCropBox + valWCropBox + canvas.offsetLeft && e.pageX > valLCropBox - valHCropBox +
            canvas.offsetLeft && e.pageY < valTCropBox + valWCropBox + canvas.offsetTop &&
            e.pageY > valTCropBox - valWCropBox + canvas.offsetTop) {
            valLCropBox = e.pageX - canvas.offsetLeft - (valWCropBox / 2);
            valTCropBox = e.pageY - canvas.offsetTop - (valHCropBox / 2);;
            isDrag = true;
        }
    });

    canvas.addEventListener('mouseup', function(e) {
        isDrag = false;
        canvas.onmousemove = null
    });

    var wCropBox = document.querySelector('#widthCropBox');
    var hCropBox = document.querySelector('#heightCropBox');
    var lCropBox = document.querySelector('#indentLeft');
    var tCropBox = document.querySelector('#indentTop');
    var valWCropBox = 160;
    var valHCropBox = 110;
    var valLCropBox = 10;
    var valTCropBox = 10;
    var valScaleX = 1;
    var valScaleY = 1;
    //  var valHCropBox = hCropBox.value;
    // var valLCropBox = LCropBox.value;
    // var valTCropBox = TCropBox.value;

    wCropBox.addEventListener('change', changeWCropBox)
    hCropBox.addEventListener('change', changeHCropBox)
    lCropBox.addEventListener('change', changeLCropBox)
    tCropBox.addEventListener('change', changeTCropBox)

    function changeWCropBox(temp) {
        valWCropBox = wCropBox.value;
        drawCropBox(valWCropBox);
    };

    function changeHCropBox(temp) {
        valHCropBox = hCropBox.value;
        drawCropBox(valHCropBox);
    };

    function changeLCropBox(temp) {
        valLCropBox = lCropBox.value;
        drawCropBox(valLCropBox);
    };

    function changeTCropBox(temp) {
        valTCropBox = tCropBox.value;
        drawCropBox(valTCropBox);
    };

    var cropAndSave = document.querySelector('#cropAndSave');
    cropAndSave.addEventListener('click', function() {
        // debugger;
        draw();
        saveCropImg();
    });

    function saveCropImg() {
        var hiddenCanvas = document.createElement('canvas');
        hiddenCanvas.style.display = 'none';
        document.body.appendChild(hiddenCanvas);
        hiddenCanvas.width = valWCropBox;
        hiddenCanvas.height = valHCropBox;
        var hiddenCtx = hiddenCanvas.getContext('2d');
        hiddenCtx.drawImage(canvas, valLCropBox, valTCropBox, valWCropBox, valHCropBox, 0, 0, hiddenCanvas.width, hiddenCanvas.height);
        var hiddenData = hiddenCanvas.toDataURL("image/png").replace("image/png", "image");
        cropAndSave.setAttribute('href', hiddenData);
        cropAndSave.setAttribute('download', 'image.png');
        colorRectStroke = "#FF0000";
        drawCropBox(colorRectStroke);
    };
};