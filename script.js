
/* MOBILE NAVIGATION */

const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");

        const isOpen = !mobileMenu.classList.contains("hidden");

        menuBtn.setAttribute("aria-expanded", isOpen);
        menuBtn.textContent = isOpen ? "✕" : "☰";
    });

    // Close mobile menu after clicking a link
    mobileMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.add("hidden");
            menuBtn.setAttribute("aria-expanded", "false");
            menuBtn.textContent = "☰";
        });
    });
}


/* LAUNCH COUNTDOWN */

const launchDate = new Date(2026, 10, 19, 0, 0, 0).getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const difference = launchDate - now;

    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
        return;
    }

    if (difference <= 0) {
        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    daysElement.textContent = String(days).padStart(2, "0");
    hoursElement.textContent = String(hours).padStart(2, "0");
    minutesElement.textContent = String(minutes).padStart(2, "0");
    secondsElement.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);


/*  CHARACTER QUIZ */

const quizQuestions = [
    {
        question: "1. What describes you best?",
        options: [
            { text: "I always have a plan.", character: "Alex Vega" },
            { text: "I am fearless and adventurous.", character: "Maya Cruz" },
            { text: "I am strong and disciplined.", character: "Dante Reed" },
            { text: "I love freedom and excitement.", character: "Nina Sol" }
        ]
    },
    {
        question: "2. What would you do in a difficult situation?",
        options: [
            { text: "Think carefully before acting.", character: "Alex Vega" },
            { text: "Take a bold risk.", character: "Maya Cruz" },
            { text: "Face the problem directly.", character: "Dante Reed" },
            { text: "Find an unexpected solution.", character: "Nina Sol" }
        ]
    },
    {
        question: "3. Choose your ideal vehicle.",
        options: [
            { text: "A luxury sports car.", character: "Alex Vega" },
            { text: "A high-speed racing car.", character: "Maya Cruz" },
            { text: "A powerful SUV.", character: "Dante Reed" },
            { text: "A stylish convertible.", character: "Nina Sol" }
        ]
    },
    {
        question: "4. What matters most to you?",
        options: [
            { text: "Intelligence and strategy.", character: "Alex Vega" },
            { text: "Courage and independence.", character: "Maya Cruz" },
            { text: "Loyalty and respect.", character: "Dante Reed" },
            { text: "Freedom and adventure.", character: "Nina Sol" }
        ]
    }
];

let currentQuestion = 0;
let selectedCharacter = "";

let scores = {
    "Alex Vega": 0,
    "Maya Cruz": 0,
    "Dante Reed": 0,
    "Nina Sol": 0
};

const startQuiz = document.getElementById("start-quiz");
const quizArea = document.getElementById("quiz-area");
const quizQuestion = document.getElementById("quiz-question");
const quizOptions = document.getElementById("quiz-options");
const nextQuestion = document.getElementById("next-question");
const quizResult = document.getElementById("quiz-result");
const restartQuiz = document.getElementById("restart-quiz");

function showQuestion() {
    const question = quizQuestions[currentQuestion];

    quizQuestion.textContent = question.question;
    quizOptions.innerHTML = "";
    selectedCharacter = "";

    question.options.forEach(option => {
        const button = document.createElement("button");

        button.className = "quiz-option";
        button.textContent = option.text;
        button.type = "button";

        button.addEventListener("click", () => {
            selectedCharacter = option.character;

            document.querySelectorAll(".quiz-option").forEach(btn => {
                btn.classList.remove("selected");
            });

            button.classList.add("selected");
        });

        quizOptions.appendChild(button);
    });

    nextQuestion.textContent =
        currentQuestion === quizQuestions.length - 1
            ? "See My Result →"
            : "Next →";
}

function resetQuiz() {
    currentQuestion = 0;
    selectedCharacter = "";

    Object.keys(scores).forEach(character => {
        scores[character] = 0;
    });

    quizResult.textContent = "";
    restartQuiz.classList.add("hidden");
    nextQuestion.classList.remove("hidden");

    showQuestion();
}

if (startQuiz && quizArea && quizQuestion && quizOptions &&
    nextQuestion && quizResult && restartQuiz) {

    startQuiz.addEventListener("click", () => {
        resetQuiz();

        startQuiz.classList.add("hidden");
        quizArea.classList.remove("hidden");

        quizArea.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    });

    nextQuestion.addEventListener("click", () => {
        if (!selectedCharacter) {
            alert("Please select an answer first!");
            return;
        }

        scores[selectedCharacter]++;
        currentQuestion++;

        if (currentQuestion < quizQuestions.length) {
            showQuestion();
        } else {
            showResult();
        }
    });

    function showResult() {
        const winner = Object.keys(scores).reduce((a, b) =>
            scores[a] >= scores[b] ? a : b
        );

        quizQuestion.textContent = "YOUR CHARACTER IS...";
        quizOptions.innerHTML = "";

        quizResult.textContent =
            winner + "! You match this character's personality.";

        nextQuestion.classList.add("hidden");
        restartQuiz.classList.remove("hidden");
    }

    restartQuiz.addEventListener("click", resetQuiz);
}


/* HEIST GENERATOR */

// Only ONE declaration of each variable

const heistLocations = [
    "The Grand Diamond Hotel",
    "Vice City National Bank",
    "Oceanview Luxury Casino",
    "Downtown Art Museum",
    "The Neon Shopping Plaza"
];

const heistObjectives = [
    "Retrieve a mysterious diamond.",
    "Recover a stolen confidential file.",
    "Secure a valuable art collection.",
    "Find a hidden encrypted device.",
    "Retrieve a rare collectible."
];

const heistApproaches = [
    "Silent and stealthy approach",
    "Disguised undercover approach",
    "High-tech operation",
    "Fast-paced getaway scenario",
    "Team-based strategic operation"
];

const heistRewards = [
    "$250,000",
    "$500,000",
    "$750,000",
    "$1,000,000",
    "$2,500,000"
];

const generateHeist = document.getElementById("generate-heist");
const regenerateHeist = document.getElementById("regenerate-heist");
const heistResult = document.getElementById("heist-result");

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function createHeist() {
    if (!heistResult) return;

    document.getElementById("heist-location").textContent =
        getRandomItem(heistLocations);

    document.getElementById("heist-objective").textContent =
        getRandomItem(heistObjectives);

    document.getElementById("heist-approach").textContent =
        getRandomItem(heistApproaches);

    document.getElementById("heist-reward").textContent =
        getRandomItem(heistRewards);

    heistResult.classList.remove("hidden");

    heistResult.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}

if (generateHeist && regenerateHeist && heistResult) {
    generateHeist.addEventListener("click", createHeist);
    regenerateHeist.addEventListener("click", createHeist);
}


/* WANTED LEVEL GAME */

const startWanted = document.getElementById("start-wanted");
const wantedGame = document.getElementById("wanted-game");
const wantedStars = document.getElementById("wanted-stars");
const wantedStatus = document.getElementById("wanted-status");
const wantedEvent = document.getElementById("wanted-event");
const wantedScore = document.getElementById("wanted-score");
const surviveBtn = document.getElementById("survive-btn");
const restartWanted = document.getElementById("restart-wanted");

let wantedLevel = 0;
let survivalScore = 0;
let gameOver = false;

const wantedEvents = [
    "A police patrol spotted you!",
    "Traffic is blocking your route!",
    "You found a hidden shortcut!",
    "A helicopter is approaching!",
    "You managed to avoid a roadblock!",
    "A mysterious contact offered help!"
];

function updateWantedDisplay() {
    wantedStars.textContent =
        "★ ".repeat(wantedLevel) +
        "☆ ".repeat(5 - wantedLevel);

    wantedScore.textContent =
        "Survival Score: " + survivalScore;
}

function startWantedGame() {
    wantedLevel = 0;
    survivalScore = 0;
    gameOver = false;

    startWanted.classList.add("hidden");
    wantedGame.classList.remove("hidden");

    surviveBtn.classList.remove("hidden");
    restartWanted.classList.add("hidden");

    wantedStatus.textContent =
        "The challenge has started. Can you survive?";

    wantedEvent.textContent = "";

    updateWantedDisplay();

    wantedGame.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}

function playWantedRound() {
    if (gameOver) return;

    const eventIndex = Math.floor(Math.random() * wantedEvents.length);

    wantedEvent.textContent = wantedEvents[eventIndex];

    // Helpful events reduce the wanted level.
    if (eventIndex === 2 || eventIndex === 4 || eventIndex === 5) {
        wantedLevel = Math.max(0, wantedLevel - 1);
        survivalScore += 20;
    } else {
        wantedLevel++;
        survivalScore += 10;
    }

    wantedLevel = Math.min(wantedLevel, 5);

    updateWantedDisplay();

    if (wantedLevel >= 5) {
        gameOver = true;

        wantedStatus.textContent =
            "BUSTED! Your escape attempt failed.";

        surviveBtn.classList.add("hidden");
        restartWanted.classList.remove("hidden");
    } else {
        wantedStatus.textContent =
            "You're still in the game. Keep going!";
    }
}

if (startWanted && wantedGame && wantedStars && wantedStatus &&
    wantedEvent && wantedScore && surviveBtn && restartWanted) {

    startWanted.addEventListener("click", startWantedGame);
    surviveBtn.addEventListener("click", playWantedRound);
    restartWanted.addEventListener("click", startWantedGame);
}

// BACK TO TOP BUTTON

const backToTop = document.getElementById("back-to-top");

if (backToTop) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


/* LOADING SCREEN */

window.addEventListener("load", function () {
    const loader = document.getElementById("loader");

    if (loader) {
        loader.classList.add("loader-hidden");

        setTimeout(() => {
            loader.style.display = "none";
        }, 500);
    }
});

// SCROLL REVEAL ANIMATION
const revealElements = document.querySelectorAll(
    "section, .character-card, .tool-card"
);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach((element) => {
    element.classList.add("reveal");
    revealObserver.observe(element);
});