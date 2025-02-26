// Generate angka target 6 digit
(function () {
    let target = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join('');
    let attempts = 0;
    const maxAttempts = 9; //jumlah tebakan yang bisa dimasukkan

    // Submit Button Event
    document.getElementById('submit-btn').addEventListener('click', () => {
        const userInput = document.getElementById('user-input').value.trim();
        const errorMessage = document.getElementById('error-message');

        // Validasi Input
        if (!/^\d{6}$/.test(userInput)) {
            errorMessage.innerText = "Masukkan angka 6-digit yang valid!";
            return;
        } else {
            errorMessage.innerText = '';
        }

        // Generate Feedback
        const feedbackRow = document.getElementById(`row-${attempts + 1}`);
        feedbackRow.innerHTML = ''; // Kosongkan baris sebelum mengisi ulang
        const feedback = generateFeedback(target, userInput); // Hasilkan feedback

        // Tampilkan Feedback
        for (let i = 0; i < userInput.length; i++) {
            const cell = document.createElement('div');
            cell.className = `feedback-cell ${feedback[i]}`;
            cell.innerText = userInput[i];
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
        const used = new Map();

        // Green Check
        for (let i = 0; i < 6; i++) {
            if (input[i] === target[i]) {
                feedback[i] = 'green';
                used.set(i, true);
            }
        }

        // Yellow and Grey Check
        for (let i = 0; i < 6; i++) {
            if (feedback[i] !== 'green') {
                const index = target.indexOf(input[i]);
                if (index !== -1 && !used.has(index)) {
                    feedback[i] = 'yellow';
                    used.set(index, true);
                } else {
                    feedback[i] = 'grey';
                }
            }
        }

        return feedback;
    }

    // Reset Game Function
    function resetGame() {
        target = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join('');
        attempts = 0;
        document.getElementById('game-status').innerText = '';
        document.getElementById('submit-btn').disabled = false;
        document.getElementById('feedback-area').innerHTML = `
            <div class="feedback-row" id="row-1"></div>
            <div class="feedback-row" id="row-2"></div>
            <div class="feedback-row" id="row-3"></div>
            <div class="feedback-row" id="row-4"></div>
            <div class="feedback-row" id="row-5"></div>
            <div class="feedback-row" id="row-6"></div>
            <div class="feedback-row" id="row-7"></div>
            <div class="feedback-row" id="row-8"></div>
            <div class="feedback-row" id="row-9"></div>
        `;
    }

    // Reset Button Event
    document.getElementById('reset-btn').addEventListener('click', resetGame);
})();