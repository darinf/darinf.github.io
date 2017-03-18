const kWidth = 100;
const kHeight = 100;
const kBufferSize = kWidth * kHeight * 4;

function createBuffer() {
  var data = new Uint8ClampedArray(kBufferSize);
  return data.buffer;
}

function drawRandom(buffer) {
  var uint32 = new Uint32Array(buffer);

  var colors = [
    0xFF000000,
    0xFF990000,
    0xFF009900,
    0xFF000099,
    0xFF009999,
    0xFF999900,
    0xFF990099,
    0xFF999999
  ];

  uint32.fill(colors[Math.floor(Math.random() * 10)]);

  postMessage({command: "draw", params: [buffer, 0, 0, kWidth, kHeight]}, [buffer]);
}

onmessage = function(e) {
  switch (e.data.command) {
    case "start":
      drawRandom(createBuffer());
      break;
    case "reclaim":
      drawRandom(e.data.params[0]);
      break;
  }
}
