const p = [30, 35, 15, 5, 10, 20, 25];

/* ---------------------------------------- */

const SQUARE_DIM = 50;
const n = p.length - 1;

const SIDE_LENGTH = SQUARE_DIM * n;
const results = matrixChainOrder(p, n);

function setup() {
  createCanvas(600, 600);

  background(220);
  push();
  textSize(32);
  let title = "m";
  let fontWidth = textWidth(title);
  text(title, (width - fontWidth) / 2, 80);
  pop();

  translate(width / 2, height / 4);
  rotate(QUARTER_PI);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i; j++) {
      push();

      translate(i * SQUARE_DIM, j * SQUARE_DIM);
      square(-SQUARE_DIM / 2, -SQUARE_DIM / 2, SQUARE_DIM);

      // i axis
      if (j === 0) {
        push();
        const num = i + 1;
        translate(0, -SQUARE_DIM / 1.5);
        rotate(-QUARTER_PI);
        text(num, -textWidth(num) / 2, 0);
        pop();
      }

      // j axis
      if (i === 0) {
        push();
        const num = n - j;
        translate(-SQUARE_DIM / 1.5, 0);
        rotate(-QUARTER_PI);
        text(num, -textWidth(num) / 2, 0);
        pop();
      }

      // in-box numbers
      push();
      const fontSize = 12;
      textSize(fontSize);

      const num = results.m[i + 1][n - j];
      const numWidth = textWidth(num);
      // let diagonal = Math.sqrt(2) * SQUARE_DIM;

      rotate(-QUARTER_PI);
      text(num, -numWidth / 2, fontSize / 2);
      pop();

      pop();
    }
  }
}

function draw() {}
