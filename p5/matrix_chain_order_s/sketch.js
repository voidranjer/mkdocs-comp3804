let p = [30, 35, 15, 5, 10, 20, 25];

/* ---------------------------------------- */

const SQUARE_DIM = 50;

let n, side_length, results;

function refreshGlobals(p) {
  n = p.length - 1;
  side_length = SQUARE_DIM * n;
  results = matrixChainOrder(p, n);
}

function setup() {
  createCanvas(600, 600);

  refreshGlobals(p);

  // Input field
  let input = createInput(p.join(", "));
  input.position(20, 20);
  input.size(200);
  input.input(() => {
    p = input
      .value()
      .split(",")
      .map((x) => parseInt(x))
      .filter((x) => !isNaN(x)); // Filter out any invalid integers
    refreshGlobals(p);
  });
}

function draw() {
  background(220);

  // Title
  push();
  textSize(32);
  let title = "s";
  let fontWidth = textWidth(title);
  text(title, (width - fontWidth) / 2, 80);
  pop();

  translate(width / 2, height / 4);
  rotate(QUARTER_PI);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
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

      const num = results.s[i + 1][n - j];
      const numWidth = textWidth(num);

      rotate(-QUARTER_PI);
      text(num, -numWidth / 2, fontSize / 2);
      pop();

      pop();
    }
  }
}
