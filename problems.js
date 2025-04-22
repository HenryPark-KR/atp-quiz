
window.onload = () => {
  const problems = window.problems;
  let current = 0;
  let correctCount = 0;
  let totalCount = 0;
  let answered = false;
  let wrongProblems = [];

  function setupQuiz() {
    if (!problems || problems.length === 0) {
      document.getElementById('question').innerText = "현재 문제가 없습니다.";
      return;
    }
    showProblem();
  }

  function showProblem() {
    if (current >= problems.length) {
      document.getElementById('question').innerHTML = "🎉 모든 문제를 다 풀었습니다!";
      document.getElementById('choices').innerHTML = "";
      document.getElementById('next-btn').style.display = 'none';
      return;
    }

    const problem = problems[current];
    document.getElementById('question').innerText = problem.question;

    const choicesDiv = document.getElementById('choices');
    choicesDiv.innerHTML = '';

    let splitChoices = [];
    if (typeof problem.choices === 'string') {
      splitChoices = problem.choices.split(/(?=[A-C]\.)/g).map(s => s.trim());
    } else {
      splitChoices = problem.choices;
    }

    splitChoices.forEach(choice => {
      const btn = document.createElement('button');
      btn.innerText = choice;
      btn.onclick = () => checkAnswer(choice);
      choicesDiv.appendChild(btn);
    });

    document.getElementById('feedback').innerText = '';
    document.getElementById('answer').style.display = 'none';
  }

  function checkAnswer(selected) {
    if (answered) return;
    answered = true;
    totalCount++;

    const correctLetter = problems[current].correct;
    const isCorrect = selected.trim().startsWith(correctLetter + ".");

    if (isCorrect) {
      correctCount++;
      document.getElementById('feedback').innerText = "정답입니다! 🎉";
      document.getElementById('feedback').style.color = 'green';
    } else {
      const correctChoice = Array.from(document.querySelectorAll('#choices button'))
                                .find(btn => btn.innerText.startsWith(correctLetter + "."));
      wrongProblems.push(problems[current]);
      document.getElementById('feedback').innerText = `오답입니다 😓\n정답은: ${correctChoice?.innerText || '확인불가'}`;
      document.getElementById('feedback').style.color = 'red';
    }
    document.getElementById('answer').innerText = problems[current].explanation;
    document.getElementById('answer').style.display = 'block';
  }

  document.getElementById('next-btn').onclick = () => {
    answered = false;
    current++;
    showProblem();
  };

  setupQuiz();
};
