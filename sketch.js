let t = 0;
let offsetX = 0;
let offsetY = 0;

function setup() {
  let canvas = createCanvas(100, 100);
  canvas.parent('p5-container');
  setupScene3();
}

function draw() {
  drawScene3();
}

function setupScene3() {
  offsetX = 0;
  offsetY = 0;
//   background(color(102, 108, 111));
//   fill(255);
}

function drawScene3() {
  noStroke();
  background("white");

  t += 0.1;

  let totalShapes = 35;

  for (let i = totalShapes; i >= 0; i--) {
    let c;
    if (i === 1) {
      c = color(255, 255, 255, 255);
    } else if (i === 2) {
      c = color(0, 0, 255, 255);
    } else {
      let shapePosition = i / totalShapes;
      let lerpValue = ((-t / 2 + shapePosition)) % 1;
      c = getColor(lerpValue);
    }

    let alpha = map(i, 0, totalShapes, 255, 50);
    c.setAlpha(alpha);

    fill(c);
    beginShape();
    for (let angle = 0; angle < 2 * PI; angle += PI / 20) {
        let r = map(noise(t + angle * 100), 0, 1, 0 * i / totalShapes, 50 * i / totalShapes);
        let x = cos(angle) * r + width / 2 + offsetX;
        let y = sin(angle) * r + height / 2 + offsetY;
        vertex(x, y);
    }
    endShape(CLOSE);
  }
  filter(BLUR, 3);
}


function getColor(lerpValue) {
    lerpValue = (lerpValue % 1 + 1) % 1;
  
    let blue = color(105, 154, 255);
    let green = color(63, 214, 58);
    let yellow = color(234, 250, 12);
    let orange = color(255, 105, 215);
    
    if (lerpValue < 0.25) {
      return lerpColor(blue, green, map(lerpValue, 0, 0.25, 0, 1));
    } else if (lerpValue < 0.5) {
      return lerpColor(green, yellow, map(lerpValue, 0.25, 0.5, 0, 1));
    } else if (lerpValue < 0.75) {
      return lerpColor(yellow, orange, map(lerpValue, 0.5, 0.75, 0, 1));
    } else {
      return lerpColor(orange, blue, map(lerpValue, 0.75, 1, 0, 1));
    }
  }
