/* === JavaScript Logic for Career Match Predictor === */

// Desi Roast & Comedy Style Career Database (CarryMinati, Samay Raina, & Kapil Sharma Vibe)
const careerDatabase = {
    "Banking": [
        "Hidden Cashback hunter",
        "Saving account influencer",

    ],
    "Railway": [
        "Proffesional Napper",
        "The Polar Express Ticket Inspector 🎫",
        "Proffesional Adenture Planner"

    ],

    "Defence": [
        "Hide and seek champion ",
        "5 Baje uthane ka Brand Ambassador",
        "Mission impossible Manager"

    ],
    "Insurance": [
        "Yamraj ka personal Life policy Agent ",
        "Spider-Man's Professional Safety Net Inspector 🕸️",
        "chief Umbrella holder in sunny weather"
    ],

    "Management": [
        "proffessional PowerPoint Slide Animator",
        "Minion Overlord of Corporate Buzzwords 🍌"

    ],

    "NEET": [
        "Zombie survival coach",
        "Handwriting Destroyer",
        "Sleep sacrifice champion"

    ],
    "JEE":
        ["Director for cat videos",],

    "SSC": [

        "Sherlock Holmes' Chief OMR Sheet Magnifying Glass Cleaner 🔍",
        "The Flash's Official Exam Timer ⚡"

    ],

    "UPSC": [
        "Polity pandit 🧠",

        "Desciosion maker Pro",
        "Minister of good vibes"

    ],
    "State PSC": [
        "The Village Panchayat Legend 🏛️",
        "Local Neighborhood Gossip Minister 🗣️"

    ],
    "Police": [
        "Crime Bursting Hulk", "CCTV SE Bhi Tez Nazarwala"

    ],
    "Teaching": [
        "Mic ke bina LoudSpeaker",
        "Certified Red pen ninja"

    ],
    "Judiciary": [
        "Judge Judy's Supreme Gavel Smashing Intern 🔨",
        "Thor's God of Order & Objections Assistant ⚡"

    ],
    "Engineering/Medical": [
        "Zombie survival coach",
        "Handwriting Destroyer",
        "Sleep sacrifice champion"

    ],

    "Other": [
        "Time travel Tourist🌀",
        "Wrong direction explore"

    ]

};
const loadingMessages = [
    "Analyzing your hidden talents...",
    "Consulting the career oracle...",
    "Calibrating your vibe matrix...",
    "Generating maximum awesomeness... almost there!"
];

// Function to switch between screens (SPA navigation)
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
        screen.classList.add('hidden');
    });
    document.getElementById(screenId).classList.remove('hidden');
    document.getElementById(screenId).classList.add('active');
}

// ── Exam Button Selection Logic ──
document.querySelectorAll('.exam-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove selected from all
        document.querySelectorAll('.exam-btn').forEach(b => b.classList.remove('selected'));
        // Select this one
        btn.classList.add('selected');
        document.getElementById('userExam').value = btn.dataset.value;
    });
});

// Trigger the loading animation and calculate result
function startLoading() {
    const name = document.getElementById('userName').value.trim();
    const exam = document.getElementById('userExam').value;

    if (!name) {
        const nameInput = document.getElementById('userName');
        nameInput.style.animation = 'none';
        nameInput.offsetHeight;
        nameInput.style.animation = 'shake 0.4s ease';
        return;
    }

    if (!exam) {
        // Brief shake animation on the grid to hint user to select
        const grid = document.querySelector('.exam-btn-grid');
        grid.style.animation = 'none';
        grid.offsetHeight; // trigger reflow
        grid.style.animation = 'shake 0.4s ease';
        return;
    }

    showScreen('loading-screen');

    let progress = 0;
    let messageIndex = 0;
    const progressBar = document.getElementById('progress-bar');
    const loadingText = document.getElementById('loading-text');

    // Simulate loading process
    const loadingInterval = setInterval(() => {
        progress += 2;
        progressBar.style.width = progress + '%';

        // Change loading text periodically
        if (progress % 25 === 0 && messageIndex < loadingMessages.length) {
            loadingText.innerText = loadingMessages[messageIndex];
            messageIndex++;
        }

        if (progress >= 100) {
            clearInterval(loadingInterval);
            setTimeout(() => revealResult(name, exam), 500); // slight pause before reveal
        }
    }, 50);
}

// Display the final randomized result
function revealResult(name, exam) {
    const careers = careerDatabase[exam] || ["Mystery Legend 🌟"];

    // Generate a random number to pick from the list for this exam category
    const randomIndex = Math.floor(Math.random() * careers.length);
    const matchedCareer = careers[randomIndex];

    // Update the text on the centered layout
    document.getElementById('result-intro').innerText = `${name}, your lagendry title is...`;
    document.getElementById('career-output').innerText = matchedCareer;

    // Show the final centered screen
    showScreen('result-screen');

    // 🎊 Launch confetti celebration!
    launchConfetti();
}

// ── Confetti Celebration ──
function launchConfetti() {
    const container = document.getElementById('confetti-container');
    container.innerHTML = '';

    const colors = [
        '#ff453a', '#ff6b6b', '#ffd700', '#00e676',
        '#448aff', '#e040fb', '#ff9100', '#00e5ff',
        '#76ff03', '#f50057', '#651fff', '#ffea00'
    ];
    const shapes = ['square', 'rect', 'circle'];

    for (let i = 0; i < 80; i++) {
        const piece = document.createElement('div');
        piece.classList.add('confetti-piece');

        const color = colors[Math.floor(Math.random() * colors.length)];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const left = Math.random() * 100;
        const duration = 2 + Math.random() * 3;
        const delay = Math.random() * 1.5;
        const size = 8 + Math.random() * 12;
        const sway = (Math.random() - 0.5) * 200;

        piece.style.left = left + '%';
        piece.style.backgroundColor = color;
        piece.style.animationDuration = duration + 's';
        piece.style.animationDelay = delay + 's';
        piece.style.setProperty('--sway', sway + 'px');

        if (shape === 'rect') {
            piece.style.width = size + 'px';
            piece.style.height = size * 1.6 + 'px';
        } else if (shape === 'circle') {
            piece.style.width = size + 'px';
            piece.style.height = size + 'px';
            piece.style.borderRadius = '50%';
        } else {
            piece.style.width = size + 'px';
            piece.style.height = size + 'px';
        }

        container.appendChild(piece);
    }

    // Clean up confetti pieces after animations finish
    setTimeout(() => { container.innerHTML = ''; }, 6000);
}

// Reset the app to start over from the welcome screen
function resetApp() {
    document.getElementById('userName').value = '';
    document.getElementById('userExam').value = '';
    document.querySelectorAll('.exam-btn').forEach(b => b.classList.remove('selected'));
    document.getElementById('progress-bar').style.width = '0%';
    document.getElementById('loading-text').innerText = 'Analyzing your hidden talents...';
    document.getElementById('confetti-container').innerHTML = '';
    showScreen('welcome-screen');
}