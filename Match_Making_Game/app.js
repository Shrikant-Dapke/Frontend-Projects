let Boxes = document.querySelectorAll(".board");
let reset = document.querySelector(".reset");
let turns = 0;
let score = 0;
let count = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
};

Boxes.forEach((Box) => {
  let num;

  do {
    num = Math.floor(Math.random() * 4) + 1;
  } while (count[num] === 2);
  {
    count[num]++;
    Box.innerHTML = num;
    Box.style.fontSize = "0px";
  }
});

let val = [];
let boxDiv = [];
Boxes.forEach((Box) => {
  Box.addEventListener("click", () => {
    Box.style.fontSize = "25px";
    val.push(Box.innerHTML);
    boxDiv.push(Box);

    if (val.length === 2) {
      setTimeout(() => {
        let scores = check(val, boxDiv, score);
        score = scores;
        document.getElementById("user-score").innerHTML = scores;
        document.getElementById("turns").innerHTML = turns;
        console.log(scores);
        val = [];
        boxDiv = [];
      }, 2000);
    }
  });
});

const check = (val, boxDiv, score) => {
  if (val[0] === val[1]) {
    score++;
    turns++;
    return score;
  } else {
    turns++;
    boxDiv[0].style.fontSize = "0px";
    boxDiv[1].style.fontSize = "0px";
    return score;
  }
};

const restart = () => {
  reset.addEventListener("click", (score, turns) => {
    score = 0;
    turns = 0;
  });
};
