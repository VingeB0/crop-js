'use strict;'

var canvasCropBox = document.querySelector('#canvasCropBox');
var ctxCropBox = canvasCropBox.getContext('2d');
canvasCropBox.width = 700;
canvasCropBox.height = 350;
var btnDragImg = document.querySelector('#btnDragImg');
var btnDragCropBox = document.querySelector('#btnDragCropBox');
btnDragCropBox.addEventListener('click', function() {
    canvasImage.style.zIndex = '';
    canvasCropBox.style.zIndex = '1';
    this.classList.add('btn-disabled');
    btnDragImg.classList.remove('btn-disabled');
});

btnDragImg.addEventListener('click', function() {
    canvasCropBox.style.zIndex = '';
    canvasImage.style.zIndex = '1';
    this.classList.add('btn-disabled');
    btnDragCropBox.classList.remove('btn-disabled');
});

var canvasImage = document.querySelector('#canvasImage');
var ctxImg = canvasImage.getContext('2d');
canvasImage.width = 700;
canvasImage.height = 350;

var inputLoadImg = document.querySelector('#loadImg');
inputLoadImg.addEventListener('change', loadImg);

function loadImg(e) {
    inputLoadImg.addEventListener('click', function() {
        clearInterval(updateDraw);
        clearcanvasImage();
    });

    var imgcanvasImage = new Image();

    imgcanvasImage.addEventListener('load', getHeigthWidth);

    function getHeigthWidth() {
        zoomX = imgcanvasImage.naturalWidth;
        zoomY = imgcanvasImage.naturalHeight;
        draw(zoomX, zoomY);
    };
    imgcanvasImage.src = URL.createObjectURL(e.target.files[0]);

    clearInterval(updateDraw);

    var zoomX;
    var zoomY;
    canvasImage.addEventListener('mousewheel', wheelScaleImg);

    function wheelScaleImg(event) {
        event.preventDefault();
        var valueScale = event.wheelDelta / 120;
        var zoom = Math.exp(valueScale * 0.2);
        clearcanvasImage();
        zoomY = Math.round(zoomY * zoom);
        zoomX = Math.round(zoomX * zoom);
        draw(zoomX, zoomY);
    };


    var x = 0;
    var y = 0;
    var moveTop = document.querySelector('#moveTop');

    function clearcanvasImage() {
        ctxImg.save();
        ctxImg.setTransform(1, 0, 0, 1, 0, 0);
        ctxImg.clearRect(0, 0, canvasImage.width, canvasImage.height);
        ctxImg.restore();
        ctxImg.drawImage(canvasImage, 0, 0);
        inputLoadImg.value = '';
    };

    var updateDraw = setInterval(function() {
        draw();
        clearcanvasCropBox();
        drawCropBox();
    }, 10);

    var btnClear = document.querySelector('#Clear');
    btnClear.addEventListener('click', function() {
        clearInterval(updateDraw);
        clearcanvasImage();
    });

    var colorRectStroke = "#FF0000";

    function draw(temp) {
        ctxImg.save();
        ctxImg.setTransform(1, 0, 0, 1, 0, 0);
        ctxImg.clearRect(0, 0, canvasImage.width, canvasImage.height);
        ctxImg.restore();
        ctxImg.drawImage(imgcanvasImage, y, x, zoomX, zoomY);
    };

    function clearcanvasCropBox() {
        ctxCropBox.save();
        ctxCropBox.setTransform(1, 0, 0, 1, 0, 0);
        ctxCropBox.clearRect(0, 0, canvasCropBox.width, canvasCropBox.height);
        ctxCropBox.restore();
    };

    function drawCropBox(temp) {
        ctxCropBox.strokeStyle = colorRectStroke;
        ctxCropBox.strokeRect(valLCropBox, valTCropBox, valWCropBox, valHCropBox);
        ctxCropBox.scale(valScaleX, valScaleY);
    };

    var wrapCanvas = document.querySelector('.wrap-canvas');

    function mMoveCropBox(e) {
        if (isDragCropBox) {
            valLCropBox = e.pageX - wrapCanvas.offsetLeft - (valWCropBox / 2);
            valTCropBox = e.pageY - wrapCanvas.offsetTop - (valHCropBox / 2);
            drawCropBox(valLCropBox, valTCropBox);
        };
    };

    function mDownCropBox(e) {
        if (e.pageX < valLCropBox + valWCropBox + wrapCanvas.offsetLeft && e.pageX > valLCropBox +
            wrapCanvas.offsetLeft && e.pageY < valTCropBox + valHCropBox + wrapCanvas.offsetTop &&
            e.pageY > valTCropBox + wrapCanvas.offsetTop) {
            valLCropBox = e.pageX - wrapCanvas.offsetLeft - (valWCropBox / 2);
            valTCropBox = e.pageY - wrapCanvas.offsetTop - (valHCropBox / 2);
            isDragCropBox = true;
        }
    };

    function mUpCropBox() {
        isDragCropBox = false;
        canvasCropBox.onmousemove = null
    };

    canvasCropBox.addEventListener('mousemove', function(e) {
        mMoveCropBox(e);
    });

    canvasCropBox.addEventListener('mousedown', function(e) {
        mDownCropBox(e);
    });

    canvasCropBox.addEventListener('mouseup', function() {
        mUpCropBox();
    });

    var isDragCropBox = false;
    var isDragCropImg = false;
    canvasImage.addEventListener('mousemove', function(e) {
        mMoveCropImg(e);
    });

    canvasImage.addEventListener('mousedown', function(e) {
        mDownCropImg(e);
    });

    canvasImage.addEventListener('mouseup', function() {
        mUpCropImg();
    });

    function mMoveCropImg(e) {
        if (isDragCropImg) {
            ctxImg.drawImage(imgcanvasImage, y, x);
            clearcanvasImage();
            draw(x, y);
            x = e.pageY - wrapCanvas.offsetTop - (zoomY/2);
            y = e.pageX - wrapCanvas.offsetLeft - (zoomX/2);
        };
    };

    function mDownCropImg(e) {
        isDragCropImg = true;
    };

    function mUpCropImg() {
        isDragCropImg = false;
        canvasImage.onmousemove = null
    };

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
        var hiddencanvasImage = document.createElement('canvas');
        hiddencanvasImage.style.display = 'none';
        document.body.appendChild(hiddencanvasImage);
        hiddencanvasImage.width = valWCropBox;
        hiddencanvasImage.height = valHCropBox;
        var hiddenctxImg = hiddencanvasImage.getContext('2d');
        hiddenctxImg.drawImage(canvasImage, valLCropBox, valTCropBox, valWCropBox, valHCropBox, 0, 0, hiddencanvasImage.width, hiddencanvasImage.height);
        var hiddenData = hiddencanvasImage.toDataURL("image/png").replace("image/png", "image");
        cropAndSave.setAttribute('href', hiddenData);
        cropAndSave.setAttribute('download', 'image.png');
        colorRectStroke = "#FF0000";
        drawCropBox(colorRectStroke);
    };
};