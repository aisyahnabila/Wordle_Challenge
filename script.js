// Generate angka target 6 digit
const target = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join('');
let attempts = 0;
let gameStarted = false;
const maxAttempts = 6;

// Submit Button Event
document.getElementById('submit-btn').addEventListener('click', () => {
    const userInput = document.getElementById('user-input').value.trim();

    // Validasi Input
    if (userInput.length !== 6 || isNaN(userInput)) {
        alert("Masukkan angka 6-digit!");
        return;
    }

    // Generate Feedback
    const feedbackRow = document.getElementById(`row-${attempts + 1}`);
    const feedback = generateFeedback(target, userInput);

    // Tampilkan Feedback
    // kalau pengen pake simbol aja
    // feedback.forEach(status => {
    //     const cell = document.createElement('div');
    //     cell.className = `feedback-cell ${status}`;
    //     cell.innerText = status === 'green' ? '✔' : status === 'yellow' ? '?' : 'X';
    //     feedbackRow.appendChild(cell);
    // });
    // Tampilkan Feedback
    for (let i = 0; i < userInput.length; i++) {
        const cell = document.createElement('div');
        cell.className = `feedback-cell ${feedback[i]}`;
        cell.innerText = userInput[i]; // Tampilkan angka asli
        feedbackRow.appendChild(cell);
    }

    attempts++;

    // Check Game Status
    if (userInput === target) {
        document.getElementById('game-status').innerText = "Selamat, Anda Menang!";
        document.getElementById('submit-btn').disabled = true;
    } else if (attempts === maxAttempts) {
        document.getElementById('game-status').innerText = `Game Over! Angka yang benar adalah ${target}`;
        document.getElementById('submit-btn').disabled = true;
    }
});

// Generate Feedback Function
function generateFeedback(target, input) {
    const feedback = [];
    const used = Array(6).fill(false);

    // Green Check
    for (let i = 0; i < 6; i++) {
        if (input[i] === target[i]) {
            feedback[i] = 'green';
            used[i] = true;
        }
    }

    // Yellow and Grey Check
    for (let i = 0; i < 6; i++) {
        if (feedback[i] !== 'green') {
            const index = target.indexOf(input[i]);
            if (index !== -1 && !used[index]) {
                feedback[i] = 'yellow';
                used[index] = true;
            } else {
                feedback[i] = 'grey';
            }
        }
    }

    return feedback;
}
