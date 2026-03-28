const url = "https://the-trivia-api.com/v2/questions";

let questions = [];
let options = document.querySelectorAll(".option");
let sawal = document.querySelector(".question");
let next = document.querySelector(".nxt");
let choices = [];
let count = {
  0: 0,
  1: 0,
  2: 0,
  3: 0,
};
let nextQno = 0;

async function getData() {
  const result = await fetch(url);
  questions = await result.json();
  callFun(questions);
  console.log(questions);
}

const callFun = (questions) => {
  shuffle(questions);
  getOptions();
  getQuestion();

  showAnswer();
};

function shuffle() {
  count = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
  };
  console.log(count);
  choices = [];
  let randNum;
  for (let i = 4; i > 0; i--) {
    do {
      randNum = Math.floor(Math.random() * 4);
    } while (count[randNum] === 1);
    {
      count[randNum]++;
      if (randNum === 0 || randNum === 1 || randNum === 2) {
        //incorrect option
        choices.push(questions[nextQno].incorrectAnswers[randNum]);
      } else {
        //correct option
        choices.push(questions[nextQno].correctAnswer);
      }
    }
  }
}

getData();

function getOptions() {
  let num = 0;
  options.forEach((option) => {
    option.innerHTML = choices[num];
    num++;
  });
}

function getQuestion() {
  sawal.innerHTML = questions[nextQno].question.text;
}

next.addEventListener("click", () => {
  nextQno++;
  if (nextQno === 10) {
    resetColor();
    nextQno = 0;
    getData();
  } else {
    console.log(nextQno);
    callFun(questions);
    resetColor();
  }
});

function resetColor() {
  options.forEach((option) => {
    option.style.backgroundColor = "aqua";
  });
}

function showAnswer() {
  options.forEach((option) => {
    option.addEventListener("click", () => {
      let correctOP = questions[nextQno].correctAnswer;
      let clickedOP = option.innerHTML;

      console.log(clickedOP);
      console.log(correctOP);

      if (clickedOP === correctOP) {
        option.style.backgroundColor = "green";
      } else {
        option.style.backgroundColor = "red";
      }
    });
  });
}
