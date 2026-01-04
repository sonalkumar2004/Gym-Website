let currentUser = null;
let quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
let currentQuiz = null;
let qIndex = 0;
let score = 0;
let tempQuestions = [];

function login() {
  const username = document.getElementById("username").value;
  if (!username) return alert("Enter username");

  currentUser = username;
  localStorage.setItem("currentUser", username);
  document.getElementById("userName").innerText = username;
  showSection("homeSection");
}

function logout() {
  localStorage.removeItem("currentUser");
  location.reload();
}

document.getElementById("logoutBtn").onclick = logout;

function showSection(id) {
  document.querySelectorAll("section").forEach(s => s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

function showCreateQuiz() {
  tempQuestions = [];
  showSection("createQuizSection");
}

function addQuestion() {
  const q = document.getElementById("question").value;
  const options = [
    opt1.value, opt2.value, opt3.value, opt4.value
  ];
  const correct = Number(document.getElementById("correct").value) - 1;

  if (!q || options.includes("") || correct < 0) {
    return alert("Fill all fields correctly");
  }

  tempQuestions.push({ q, options, correct });
  alert("Question added!");
}

function saveQuiz() {
  const title = document.getElementById("quizTitle").value;
  if (!title || tempQuestions.length === 0) {
    return alert("Add quiz title and questions");
  }

  quizzes.push({ title, questions: tempQuestions });
  localStorage.setItem("quizzes", JSON.stringify(quizzes));
  alert("Quiz Saved!");
  goHome();
}

function showQuizList() {
  showSection("quizListSection");
  const list = document.getElementById("quizList");
  list.innerHTML = "";

  quizzes.forEach((q, i) => {
    const btn = document.createElement("button");
    btn.innerText = q.title;
    btn.onclick = () => startQuiz(i);
    list.appendChild(btn);
  });
}

function startQuiz(index) {
  currentQuiz = quizzes[index];
  qIndex = 0;
  score = 0;
  showSection("takeQuizSection");
  showQuestion();
}

function showQuestion() {
  const q = currentQuiz.questions[qIndex];
  document.getElementById("quizTitleDisplay").innerText = currentQuiz.title;

  const box = document.getElementById("questionBox");
  box.innerHTML = `<h3>${q.q}</h3>`;

  q.options.forEach((opt, i) => {
    const div = document.createElement("div");
    div.className = "option";
    div.innerText = opt;
    div.onclick = () => {
      if (i === q.correct) score++;
      nextQuestion();
    };
    box.appendChild(div);
  });
}

function nextQuestion() {
  qIndex++;
  if (qIndex < currentQuiz.questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  showSection("resultSection");
  document.getElementById("scoreDisplay").innerText =
    `You scored ${score} / ${currentQuiz.questions.length}`;
}

function goHome() {
  showSection("homeSection");
}

window.onload = () => {
  const user = localStorage.getItem("currentUser");
  if (user) {
    currentUser = user;
    document.getElementById("userName").innerText = user;
    showSection("homeSection");
  }
};
