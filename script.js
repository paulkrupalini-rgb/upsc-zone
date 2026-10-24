const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// Open and close the mobile navigation menu.
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );

  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close the menu after selecting a navigation link.
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";
  });
});

/* Interactive preparation-focus selector */
const focusButtons = document.querySelectorAll(".focus-option");
const focusResultTitle = document.getElementById("focusResultTitle");
const focusResultText = document.getElementById("focusResultText");

const focusSuggestions = {
  prelims: {
    title: "Start with a short practice session.",
    text: "Try 10 practice MCQs, then review the explanations for any mistakes."
  },
  mains: {
    title: "Practise one structured answer.",
    text: "Choose a previous-year question, write a clear introduction, develop your main points, and finish with a conclusion."
  },
  "current-affairs": {
    title: "Revise one important current-affairs topic.",
    text: "Summarise one important issue, note its background and implications, and connect it to the UPSC syllabus."
  }
};

focusButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFocus = button.dataset.focus;
    const suggestion = focusSuggestions[selectedFocus];

    if (!suggestion) return;

    focusButtons.forEach((item) => {
      const isSelected = item === button;

      item.classList.toggle("is-active", isSelected);
      item.setAttribute("aria-pressed", String(isSelected));
    });

    focusResultTitle.textContent = suggestion.title;
    focusResultText.textContent = suggestion.text;
    const focusActionLink = document.getElementById("focusActionLink");

    if (focusActionLink) {
      const focusActions = {
        prelims: {
          text: "Go to Daily Challenge →",
          href: "#daily-challenge"
        },
        mains: {
          text: "Start Mains Practice →",
          href: "#mains-practice"
        },
        "current-affairs": {
          text: "Open Current Affairs Revision →",
href: "#current-affairs-practice"
        }
      };

      const action = focusActions[selectedFocus];

      if (action) {
        focusActionLink.textContent = action.text;
        focusActionLink.href = action.href;
      }
    }
  });
});
/* UPSC Daily Challenge — Five-question quiz */

const quizQuestions = [
  {
    subject: "Indian Polity",
    question: "Which Article of the Indian Constitution abolishes untouchability?",
    options: ["Article 14", "Article 17", "Article 19", "Article 21"],
    answer: 1,
    explanation: "Article 17 abolishes untouchability and forbids its practice in any form."
  },
  {
    subject: "Indian Polity",
    question: "Fundamental Duties were added to the Constitution by which Amendment?",
    options: ["42nd Amendment", "44th Amendment", "52nd Amendment", "73rd Amendment"],
    answer: 0,
    explanation: "The 42nd Constitutional Amendment Act, 1976 added Fundamental Duties. They are listed in Part IVA, Article 51A."
  },
  {
    subject: "Indian Geography",
    question: "Which is the longest river that flows entirely within India?",
    options: ["Ganga", "Godavari", "Narmada", "Krishna"],
    answer: 1,
    explanation: "The Godavari is generally recognised as the longest river flowing entirely within India."
  },
  {
    subject: "Indian Economy",
    question: "Which institution issues most of India's currency notes?",
    options: ["State Bank of India", "NITI Aayog", "Reserve Bank of India", "Ministry of Finance"],
    answer: 2,
    explanation: "The Reserve Bank of India issues banknotes, except the one-rupee note, which is issued by the Government of India."
  },
  {
    subject: "Environment",
    question: "The main purpose of a national park is to:",
    options: [
      "Promote mining",
      "Protect wildlife and ecosystems",
      "Expand urban settlements",
      "Increase commercial logging"
    ],
    answer: 1,
    explanation: "National parks protect wildlife, habitats and ecosystems. Activities such as hunting and habitat destruction are generally prohibited under applicable law."
  }
];

const quizCard = document.getElementById("quizCard");
const quizSubject = document.getElementById("quizSubject");
const questionCounter = document.getElementById("questionCounter");
const progressPercent = document.getElementById("progressPercent");
const quizProgressBar = document.getElementById("quizProgressBar");
const questionNumber = document.getElementById("questionNumber");
const quizQuestion = document.getElementById("quizQuestion");
const quizOptionsContainer = document.getElementById("quizOptions");
const submitAnswerButton = document.getElementById("submitAnswer");
const quizFeedback = document.getElementById("quizFeedback");
const feedbackTitle = document.getElementById("feedbackTitle");
const feedbackText = document.getElementById("feedbackText");
const nextQuestionButton = document.getElementById("nextQuestion");
const quizResults = document.getElementById("quizResults");
const quizFinalTitle = document.getElementById("quizFinalTitle");
const quizFinalScore = document.getElementById("quizFinalScore");
const quizFinalMessage = document.getElementById("quizFinalMessage");
const quizReview = document.getElementById("quizReview");
const retryQuizButton = document.getElementById("retryQuiz");

let currentQuestionIndex = 0;
let selectedAnswer = null;
let answerSubmitted = false;
let userAnswers = [];

function loadQuestion() {
  const question = quizQuestions[currentQuestionIndex];

  selectedAnswer = null;
  answerSubmitted = false;

  quizSubject.textContent = question.subject;
  questionCounter.textContent =
    `QUESTION ${currentQuestionIndex + 1} OF ${quizQuestions.length}`;

  const progress = Math.round(
    ((currentQuestionIndex + 1) / quizQuestions.length) * 100
  );

  progressPercent.textContent = `${progress}% complete`;
  quizProgressBar.style.width = `${progress}%`;
  questionNumber.textContent =
    `QUESTION ${String(currentQuestionIndex + 1).padStart(2, "0")}`;

  quizQuestion.textContent = question.question;
  quizOptionsContainer.replaceChildren();

  question.options.forEach((optionText, index) => {
    const optionButton = document.createElement("button");
    optionButton.type = "button";
    optionButton.className = "quiz-option";
    optionButton.dataset.answer = String(index);
    optionButton.setAttribute("aria-pressed", "false");

    const letter = document.createElement("span");
    letter.className = "option-letter";
    letter.textContent = String.fromCharCode(65 + index);

    const label = document.createElement("span");
    label.textContent = optionText;

    optionButton.append(letter, label);

    optionButton.addEventListener("click", () => {
      if (answerSubmitted) return;

      selectedAnswer = index;

      quizOptionsContainer.querySelectorAll(".quiz-option")
        .forEach((button) => {
          const isSelected = button === optionButton;
          button.classList.toggle("is-selected", isSelected);
          button.setAttribute("aria-pressed", String(isSelected));
        });

      submitAnswerButton.disabled = false;
    });

    quizOptionsContainer.appendChild(optionButton);
  });

  quizFeedback.hidden = true;
  nextQuestionButton.hidden = true;
  quizResults.hidden = true;
  submitAnswerButton.hidden = false;
  submitAnswerButton.disabled = true;
  submitAnswerButton.textContent = "Submit answer →";
  quizOptionsContainer.hidden = false;
  quizQuestion.hidden = false;
  questionNumber.hidden = false;
  quizCard.querySelector(".challenge-top").hidden = false;
  questionCounter.parentElement.hidden = false;
  quizCard.querySelector(".quiz-progress-track").hidden = false;
  quizCard.querySelector(".challenge-note").hidden = false;
}

function submitQuizAnswer() {
  if (selectedAnswer === null || answerSubmitted) return;

  answerSubmitted = true;

  const question = quizQuestions[currentQuestionIndex];
  const isCorrect = selectedAnswer === question.answer;

  userAnswers[currentQuestionIndex] = selectedAnswer;
  // Record topics that need revision.
if (selectedAnswer !== question.answer) {
  try {
    const savedTopics = JSON.parse(
      localStorage.getItem("upscZoneWeakTopics") || "{}"
    );

    savedTopics[question.subject] =
      (savedTopics[question.subject] || 0) + 1;

    localStorage.setItem(
      "upscZoneWeakTopics",
      JSON.stringify(savedTopics)
    );
  } catch (error) {
    console.warn("Weak topics could not be saved.");
  }
}

  feedbackTitle.textContent = isCorrect
    ? "Correct! Well done."
    : "Not quite — let's learn!";

  feedbackText.textContent =
    `${question.explanation} ` +
    (isCorrect
      ? "You selected the correct answer."
      : `The correct answer is ${String.fromCharCode(65 + question.answer)}: ${question.options[question.answer]}.`);

  quizFeedback.hidden = false;
  submitAnswerButton.hidden = true;

  quizOptionsContainer.querySelectorAll(".quiz-option")
    .forEach((button) => {
      const index = Number(button.dataset.answer);
      button.disabled = true;

      if (index === question.answer) {
        button.classList.add("is-correct");
      } else if (index === selectedAnswer) {
        button.classList.add("is-incorrect");
      }
    });

  if (currentQuestionIndex < quizQuestions.length - 1) {
    nextQuestionButton.textContent = "Next question →";
    nextQuestionButton.hidden = false;
  } else {
    nextQuestionButton.textContent = "View results →";
    nextQuestionButton.hidden = false;
  }
}

function showQuizResults() {
  const score = quizQuestions.reduce((total, question, index) => {
    return total + (userAnswers[index] === question.answer ? 1 : 0);
  }, 0);

  quizSubject.parentElement.hidden = true;
  questionCounter.parentElement.hidden = true;
  quizCard.querySelector(".quiz-progress-track").hidden = true;
  questionNumber.hidden = true;
  quizQuestion.hidden = true;
  quizOptionsContainer.hidden = true;
  quizFeedback.hidden = true;
  nextQuestionButton.hidden = true;
  submitAnswerButton.hidden = true;
  quizResults.hidden = false;

  quizFinalTitle.textContent =
    score === 5 ? "Outstanding work!" :
    score >= 3 ? "Good effort — keep going!" :
    "Every attempt is a chance to improve!";

  quizFinalScore.textContent = `${score} / ${quizQuestions.length}`;
  // Update the Prelims progress card
  const progressPrelims = document.getElementById("progressPrelims");
  const progressPrelimsDetail = document.getElementById("progressPrelimsDetail");

  const percentage = Math.round((score / quizQuestions.length) * 100);

  if (progressPrelims && progressPrelimsDetail) {
    progressPrelims.textContent = "Completed";
    progressPrelimsDetail.textContent =
      `Score: ${score}/${quizQuestions.length} (${percentage}%).`;
  }

  // Save the best score in this browser
  try {
    const previousBest = Number(localStorage.getItem("upscZonePrelimsBest") || 0);
    const bestScore = Math.max(previousBest, score);

    localStorage.setItem("upscZonePrelimsBest", String(bestScore));
  } catch (error) {
    console.warn("Quiz score could not be saved in browser storage.");
  }
  updateOverallProgress();
  quizFinalMessage.textContent =
    `You answered ${score} correctly out of ${quizQuestions.length}. Review the explanations below to strengthen your preparation.`;

  quizReview.replaceChildren();

  quizQuestions.forEach((question, index) => {
    const reviewItem = document.createElement("div");
    reviewItem.className = "quiz-review-item";

    const title = document.createElement("strong");
    title.textContent =
      `${index + 1}. ${userAnswers[index] === question.answer ? "Correct" : "Review"} — ${question.subject}`;

    const detail = document.createElement("p");
    detail.textContent =
      `Your answer: ${question.options[userAnswers[index]]}. Correct answer: ${question.options[question.answer]}. ${question.explanation}`;

    reviewItem.append(title, detail);
    quizReview.appendChild(reviewItem);
  });

  quizCard.querySelector(".challenge-note").hidden = false;
  markMissionComplete("quiz");
}

function advanceQuiz() {
  if (!answerSubmitted) return;

  if (currentQuestionIndex < quizQuestions.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
  } else {
    showQuizResults();
  }
}

function restartQuiz() {
  currentQuestionIndex = 0;
  selectedAnswer = null;
  answerSubmitted = false;
  userAnswers = [];
  loadQuestion();
}

submitAnswerButton.addEventListener("click", submitQuizAnswer);
nextQuestionButton.addEventListener("click", advanceQuiz);
retryQuizButton.addEventListener("click", restartQuiz);

loadQuestion();
/* Mains answer-writing practice */
const mainsAnswer = document.getElementById("mainsAnswer");
const wordCount = document.getElementById("wordCount");
const showAnswerGuide = document.getElementById("showAnswerGuide");
const answerGuide = document.getElementById("answerGuide");

if (mainsAnswer && wordCount) {
  mainsAnswer.addEventListener("input", () => {
    const words = mainsAnswer.value.trim().match(/\S+/g);
    const count = words ? words.length : 0;

    wordCount.textContent = `${count} words`;
  });
}

if (showAnswerGuide && answerGuide) {
  showAnswerGuide.addEventListener("click", () => {
    const isHidden = answerGuide.hidden;

    answerGuide.hidden = !isHidden;
    showAnswerGuide.textContent = isHidden
      ? "Hide answer guide"
      : "Show answer guide";
  });
}
/* Current Affairs revision tools */
const currentAffairsNotes = document.getElementById("currentAffairsNotes");
const currentAffairsWordCount = document.getElementById("currentAffairsWordCount");
const toggleAnalysisGuide = document.getElementById("toggleAnalysisGuide");
const currentAffairsGuide = document.getElementById("currentAffairsGuide");

if (currentAffairsNotes && currentAffairsWordCount) {
  currentAffairsNotes.addEventListener("input", () => {
    const words = currentAffairsNotes.value.trim().match(/\S+/g);
    const count = words ? words.length : 0;

    currentAffairsWordCount.textContent = `${count} words`;
  });
}

if (toggleAnalysisGuide && currentAffairsGuide) {
  toggleAnalysisGuide.addEventListener("click", () => {
    const shouldShow = currentAffairsGuide.hidden;

    currentAffairsGuide.hidden = !shouldShow;
    toggleAnalysisGuide.textContent = shouldShow
      ? "Hide analysis guide"
      : "Show analysis guide";

    toggleAnalysisGuide.setAttribute("aria-expanded", String(shouldShow));
  });
}

/* UPSC ZONE AI — Local preparation progress */
const progressMains = document.getElementById("progressMains");
const progressMainsDetail = document.getElementById("progressMainsDetail");
const progressCurrentAffairs = document.getElementById("progressCurrentAffairs");
const progressCurrentAffairsDetail = document.getElementById("progressCurrentAffairsDetail");

function updateWritingProgress(textarea, statusElement, detailElement, activityName) {
  if (!textarea || !statusElement || !detailElement) return;

  const storageKey = activityName === "answer"
    ? "upscZoneMainsAnswer"
    : "upscZoneCurrentAffairsNotes";

  try {
    const savedText = localStorage.getItem(storageKey);
    if (savedText !== null) {
      textarea.value = savedText;
    }
  } catch (error) {
    console.warn("Progress could not be loaded from browser storage.");
  }

  function update() {
    const words = textarea.value.trim().match(/\S+/g);
    const count = words ? words.length : 0;

    statusElement.textContent = count > 0 ? "In progress" : "Not started";
    detailElement.textContent = count > 0
      ? `${count} words written`
      : `Start your ${activityName}.`;
  }

  textarea.addEventListener("input", () => {
    try {
      localStorage.setItem(storageKey, textarea.value);
    } catch (error) {
      console.warn("Progress could not be saved in browser storage.");
    }

    update();
  });

  update();
}
/* Restore saved Prelims progress */
const progressPrelimsCard = document.getElementById("progressPrelims");
const progressPrelimsDetailCard = document.getElementById("progressPrelimsDetail");

try {
  const savedBestScore = localStorage.getItem("upscZonePrelimsBest");

  if (
    savedBestScore !== null &&
    progressPrelimsCard &&
    progressPrelimsDetailCard
  ) {
    const bestScore = Number(savedBestScore);
    const totalQuestions = 5;

    progressPrelimsCard.textContent = "Completed";
    progressPrelimsDetailCard.textContent =
      `Best score: ${bestScore}/${totalQuestions} (${Math.round(
        (bestScore / totalQuestions) * 100
      )}%).`;
  }
} catch (error) {
  console.warn("Saved Prelims progress could not be restored.");
}

/* Overall preparation progress */
function updateOverallProgress() {
  const percentageText = document.getElementById("overallProgressPercentage");
  const progressFill = document.getElementById("overallProgressFill");
  const progressBar = document.getElementById("overallProgressBar");
  const progressMessage = document.getElementById("overallProgressMessage");

  if (!percentageText || !progressFill || !progressBar || !progressMessage) {
    return;
  }

  const mainsText = document.getElementById("mainsAnswer")?.value.trim() || "";
  const currentAffairsText =
    document.getElementById("currentAffairsNotes")?.value.trim() || "";

  let completedActivities = 0;

  try {
    const savedPrelimsScore = localStorage.getItem("upscZonePrelimsBest");


if (savedPrelimsScore !== null) {
      completedActivities++;
    }
  } catch (error) {
    console.warn("Could not read saved Prelims progress.");
  }

  if (mainsText.length > 0) completedActivities++;
  if (currentAffairsText.length > 0) completedActivities++;

  const percentage = Math.round((completedActivities / 3) * 100);

  percentageText.textContent = `${percentage}%`;
  progressFill.style.width = `${percentage}%`;
  progressBar.setAttribute("aria-valuenow", String(percentage));

  if (completedActivities === 0) {
    progressMessage.textContent =
      "Complete your first activity to start tracking your progress.";
  } else {
    progressMessage.textContent =
      `${completedActivities} of 3 preparation areas started or completed.`;
  }
}

/* Update when the student writes */
document.getElementById("mainsAnswer")?.addEventListener("input", updateOverallProgress);
document.getElementById("currentAffairsNotes")?.addEventListener("input", updateOverallProgress);

/* Restore the display after refreshing */
updateOverallProgress();
/* Connect Mains and Current Affairs to the progress tracker */
updateWritingProgress(
  document.getElementById("mainsAnswer"),
  progressMains,
  progressMainsDetail,
  "answer"
);

updateWritingProgress(
  document.getElementById("currentAffairsNotes"),
  progressCurrentAffairs,
  progressCurrentAffairsDetail,
  "revision notes"
);
/* Restore word counters after loading saved text */
function updateWordCounter(textarea, counter) {
  if (!textarea || !counter) return;

  const words = textarea.value.trim().match(/\S+/g);
  counter.textContent = `${words ? words.length : 0} words`;
}

updateWordCounter(
  document.getElementById("mainsAnswer"),
  document.getElementById("wordCount")
);

updateWordCounter(
  document.getElementById("currentAffairsNotes"),
  document.getElementById("currentAffairsWordCount")
);
/* Smart study recommendations based on quiz mistakes */
function showSmartRecommendation() {
  const card = document.getElementById("smartRecommendation");
  const title = document.getElementById("recommendationTitle");
  const text = document.getElementById("recommendationText");
  const link = document.getElementById("recommendationLink");

  if (!card || !title || !text || !link) return;

  let weakTopics = {};

  try {
    weakTopics = JSON.parse(
      localStorage.getItem("upscZoneWeakTopics") || "{}"
    );
  } catch (error) {
    console.warn("Could not load weak topics.");
  }

  const topics = Object.entries(weakTopics)
    .filter(([, mistakes]) => Number(mistakes) > 0)
    .sort((a, b) => b[1] - a[1]);

  if (topics.length === 0) {
    card.hidden = false;
    title.textContent = "Build your revision plan";
    text.textContent =
      "Complete the Daily Challenge to discover which topics need more practice.";
    link.textContent = "Start Daily Challenge →";
    link.href = "#daily-challenge";
    return;
  }

  const [weakestTopic, mistakes] = topics[0];

  const recommendations = {
    "Indian Polity": {
      task: "Revise important Constitutional Articles, then practise 5 Polity MCQs.",
      href: "#daily-challenge"
    },
    "Indian Geography": {
      task: "Review Indian rivers and physical geography using your notes or atlas.",
      href: "#study-focus"
    },
    "Indian Economy": {
      task: "Revise the role of the RBI and key economic concepts.",
      href: "#study-focus"
    },
    "Environment": {
      task: "Review protected areas, biodiversity and conservation concepts.",
      href: "#study-focus"
    }
  };

  const recommendation = recommendations[weakestTopic];

  card.hidden = false;
  title.textContent = `Focus on ${weakestTopic}`;
  text.textContent = recommendation
    ? `${mistakes} incorrect answer(s) recorded. ${recommendation.task}`
    : `${mistakes} incorrect answer(s) recorded. Revise this topic before your next quiz.`;

  link.textContent = "Continue learning →";
  link.href = recommendation ? recommendation.href : "#study-focus";
}

const retryButton = document.getElementById("retryQuiz");

if (retryButton) {
  retryButton.addEventListener("click", () => {
    const card = document.getElementById("smartRecommendation");
    if (card) card.hidden = true;
  });
}

showSmartRecommendation();
/* Personalised Daily Study Planner */

const generatePlanButton = document.getElementById("generatePlan");
const studyHoursSelect = document.getElementById("studyHours");
const plannerFocusSelect = document.getElementById("plannerFocus");
const plannerResults = document.getElementById("plannerResults");
const plannerSummary = document.getElementById("plannerSummary");
const plannerTasks = document.getElementById("plannerTasks");
const plannerProgressBar = document.getElementById("plannerProgressBar");
const plannerProgressText = document.getElementById("plannerProgressText");

function createStudyPlan() {
  const hours = Number(studyHoursSelect.value);
  const focus = plannerFocusSelect.value;
  const totalMinutes = hours * 60;

  const taskTemplates = {
    "Prelims": [
      { name: "Revise a core syllabus topic", share: 0.35 },
      { name: "Practise MCQs", share: 0.30 },
      { name: "Review mistakes and explanations", share: 0.20 },
      { name: "Revise short notes", share: 0.15 }
    ],
    "Mains": [
      { name: "Study a GS syllabus topic", share: 0.30 },
      { name: "Practise one answer", share: 0.30 },
      { name: "Review and improve your answer", share: 0.25 },
      { name: "Revise key points and examples", share: 0.15 }
    ],
    "Current Affairs": [
      { name: "Read current affairs", share: 0.35 },
      { name: "Make concise revision notes", share: 0.25 },
      { name: "Connect news to the UPSC syllabus", share: 0.25 },
      { name: "Recall important facts", share: 0.15 }
    ]
  };

  const tasks = taskTemplates[focus];
  const allocatedMinutes = tasks.map((task, index) => {
    if (index === tasks.length - 1) {
      return totalMinutes -
        tasks.slice(0, -1).reduce(
          (sum, previous) =>
            sum + Math.round(totalMinutes * previous.share),
          0
        );
    }

    return Math.round(totalMinutes * task.share);
  });

  plannerSummary.textContent =
    `${hours}+ hour${hours > 1 ? "s" : ""} planned for ${focus}. ` +
    "Tick off each task as you complete it.";

  plannerTasks.replaceChildren();

  tasks.forEach((task, index) => {
    const row = document.createElement("label");
    row.className = "planner-task";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "planner-task-checkbox";

    const details = document.createElement("span");
    details.className = "planner-task-details";

    const taskName = document.createElement("strong");
    taskName.textContent = task.name;

    const duration = document.createElement("small");
    duration.textContent = `${allocatedMinutes[index]} minutes`;

    details.append(taskName, duration);
    row.append(checkbox, details);
    plannerTasks.append(row);

    checkbox.addEventListener("change", () => {
  savePlannerProgress();
  updatePlannerProgress();
});
  });

  plannerResults.hidden = false;
  updatePlannerProgress();
}

function updatePlannerProgress() {
  const checkboxes = plannerTasks.querySelectorAll(
    ".planner-task-checkbox"
  );

  const total = checkboxes.length;
  const completed = [...checkboxes].filter(
    checkbox => checkbox.checked
  ).length;

  const percentage = total === 0
    ? 0
    : Math.round((completed / total) * 100);

  plannerProgressBar.style.width = `${percentage}%`;
  plannerProgressText.textContent =
    `${percentage}% completed (${completed}/${total} tasks)`;
}

if (generatePlanButton) {
  generatePlanButton.addEventListener("click", createStudyPlan);
}
/* Save and restore daily planner progress */

function savePlannerProgress() {
  const focus = plannerFocusSelect.value;
  const hours = studyHoursSelect.value;

  const checkboxes = [
    ...plannerTasks.querySelectorAll(".planner-task-checkbox")
  ];

  const completedTasks = checkboxes.map(
    checkbox => checkbox.checked
  );

  try {
    localStorage.setItem(
      "upscZonePlannerProgress",
      JSON.stringify({
        focus,
        hours,
        completedTasks
      })
    );
  } catch (error) {
    console.warn("Planner progress could not be saved.");
  }
}

function restorePlannerProgress() {
  try {
    const saved = JSON.parse(
      localStorage.getItem("upscZonePlannerProgress") || "null"
    );

    if (!saved) return;

    studyHoursSelect.value = saved.hours;
    plannerFocusSelect.value = saved.focus;

    createStudyPlan();

    const checkboxes = [
      ...plannerTasks.querySelectorAll(".planner-task-checkbox")
    ];

    checkboxes.forEach((checkbox, index) => {
      checkbox.checked = Boolean(saved.completedTasks[index]);
    });

    updatePlannerProgress();
  } catch (error) {
    console.warn("Saved planner progress could not be restored.");
  }
}

restorePlannerProgress();
/* UPSC Mission Control */

const missionCheckboxes = document.querySelectorAll(
  "[data-mission]"
);

const missionProgressText = document.getElementById(
  "missionProgressText"
);

const missionProgressPercent = document.getElementById(
  "missionProgressPercent"
);

const missionProgressBar = document.getElementById(
  "missionProgressBar"
);

function updateMissionControl() {
  const checkboxes = [...missionCheckboxes];
  const total = checkboxes.length;

  const completed = checkboxes.filter(
    checkbox => checkbox.checked
  ).length;

  const percentage = total === 0
    ? 0
    : Math.round((completed / total) * 100);

  missionProgressText.textContent =
    `${completed} of ${total} missions completed`;

  missionProgressPercent.textContent = `${percentage}%`;
  missionProgressBar.style.width = `${percentage}%`;

  try {
    const savedMissions = {};

    checkboxes.forEach(checkbox => {
      savedMissions[checkbox.dataset.mission] = checkbox.checked;
    });

    localStorage.setItem(
      "upscZoneMissionControl",
      JSON.stringify(savedMissions)
    );
  } catch (error) {
    console.warn("Mission progress could not be saved.");
  }
}

function restoreMissionControl() {
  try {
    const saved = JSON.parse(
      localStorage.getItem("upscZoneMissionControl") || "{}"
    );

    missionCheckboxes.forEach(checkbox => {
      checkbox.checked = saved[checkbox.dataset.mission] === true;
    });
  } catch (error) {
    console.warn("Mission progress could not be restored.");
  }

  updateMissionControl();
}

missionCheckboxes.forEach(checkbox => {
  checkbox.addEventListener("change", updateMissionControl);
});

restoreMissionControl();
/* Automatically complete Mission Control tasks */

function markMissionComplete(missionName) {
  const checkbox = document.querySelector(
    `[data-mission="${missionName}"]`
  );

  if (checkbox && !checkbox.checked) {
    checkbox.checked = true;
    updateMissionControl();
  }
}
/* Automatically complete the planner mission */

document.addEventListener("change", event => {
  if (!event.target.matches(".planner-task-checkbox")) {
    return;
  }

  const plannerCheckboxes = [
    ...document.querySelectorAll(".planner-task-checkbox")
  ];

  const allTasksCompleted =
    plannerCheckboxes.length > 0 &&
    plannerCheckboxes.every(checkbox => checkbox.checked);

  if (allTasksCompleted) {
    markMissionComplete("planner");
  }
});
