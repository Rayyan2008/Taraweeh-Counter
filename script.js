document.addEventListener('DOMContentLoaded', function () {
    const rakatCountElement = document.getElementById('rakatCount');
    const incrementButton = document.getElementById('increment');
    const resetButton = document.getElementById('reset');
    const progressBar = document.getElementById('progressBar');
    const totalRakatsSelect = document.getElementById('totalRakats');
    const nightToggle = document.getElementById('night-toggle');
    const notification = document.getElementById('notification');
    const duaContainer = document.getElementById('duaContainer');
    const celebrate = document.getElementById('celebrate');

    let rakatCount = 0;
    let totalRakats = parseInt(totalRakatsSelect.value);

    function updateDisplay() {
        rakatCountElement.textContent = rakatCount;

        // Update progress bar
        const progressPercentage = (rakatCount / totalRakats) * 100;
        progressBar.style.width = `${progressPercentage}%`;

        // Show break notification every 4 Rakats
        if (rakatCount > 0 && rakatCount % 4 === 0 && rakatCount < totalRakats) {
            showNotification("Take a short break!");
        }

        // Show completion and dua when finished
        if (rakatCount >= totalRakats) {
            showNotification("Taraweeh completed, Alhamdulillah!");
            duaContainer.style.display = "block";
            duaContainer.classList.add('pulse');
            createConfetti();
            rakatCountElement.style.color = "#00c853";
        } else {
            duaContainer.style.display = "none";
            duaContainer.classList.remove('pulse');
            rakatCountElement.style.color = document.body.classList.contains('night-mode') ? "#f8f9fa" : "var(--primary-color)";
        }
    }

    function showNotification(message) {
        notification.textContent = message;
        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
    }

    function createConfetti() {
        celebrate.innerHTML = '';
        const colors = ['#4e54c8', '#8bc34a', '#f1c40f', '#e74c3c', '#3498db', '#9b59b6'];

        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDelay = Math.random() * 5 + 's';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

            const shape = Math.floor(Math.random() * 3);
            if (shape === 0) {
                confetti.style.borderRadius = '50%';
            } else if (shape === 1) {
                confetti.style.width = '7px';
                confetti.style.height = '15px';
            } else {
                confetti.style.width = '0';
                confetti.style.height = '0';
                confetti.style.borderLeft = '5px solid transparent';
                confetti.style.borderRight = '5px solid transparent';
                confetti.style.borderBottom = '10px solid ' + colors[Math.floor(Math.random() * colors.length)];
                confetti.style.backgroundColor = 'transparent';
            }

            celebrate.appendChild(confetti);
        }
    }

    incrementButton.addEventListener('click', function () {
        if (rakatCount < totalRakats) {
            rakatCount += 2;
            if (rakatCount > totalRakats) rakatCount = totalRakats;
            updateDisplay();
        }
    });

    resetButton.addEventListener('click', function () {
        rakatCount = 0;
        duaContainer.style.display = "none";
        duaContainer.classList.remove('pulse');
        updateDisplay();
        celebrate.innerHTML = '';
    });

    totalRakatsSelect.addEventListener('change', function () {
        totalRakats = parseInt(this.value);
        rakatCount = 0;
        duaContainer.style.display = "none";
        duaContainer.classList.remove('pulse');
        updateDisplay();
        celebrate.innerHTML = '';
    });

    nightToggle.addEventListener('click', function () {
        document.body.classList.toggle('night-mode');
        rakatCountElement.style.color = document.body.classList.contains('night-mode') ? "#f8f9fa" : "var(--primary-color)";
    });

    // Enable keyboard shortcuts
    document.addEventListener('keydown', function (e) {
        if (e.code === 'Space') {
            incrementButton.click();
            e.preventDefault();
        } else if (e.code === 'KeyR') {
            resetButton.click();
        }
    });

    // Initialize display
    updateDisplay();
});
