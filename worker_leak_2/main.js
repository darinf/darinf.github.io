var suppressDraw = false;
var messageCounter = 0;

class CanvasController {
  constructor(renderingContext) {
    this.renderingContext_ = renderingContext;

    this.worker_ = new Worker("worker.js");
    this.worker_.onmessage = this.onHandleMessage_.bind(this);
  }

  start() {
    this.worker_.postMessage({command: "start", params: []});
  }

  // Commands from the worker:

  draw(buffer, x, y, width, height) {
    ++messageCounter;
    this.worker_.postMessage({command: "reclaim", params: [buffer]}, [buffer]);
  }

  // Private methods:

  onHandleMessage_(e) {
    this[e.data.command].apply(this, e.data.params);
  }
}

var worker;
var canvasController;

function start() {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");

  canvasController = new CanvasController(context);
  canvasController.start();
}
