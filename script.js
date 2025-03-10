document.addEventListener('DOMContentLoaded', function() {
    const rakatCountElement = document.getElementById('rakatCount');
    const incrementButton = document.getElementById('increment');
    const resetButton = document.getElementById('reset');
    const progressBar = document.getElementById('progressBar');
    const totalRakatsSelect = document.getElementById('totalRakats');
    const nightToggle = document.getElementById('night-toggle');
    const notification = document.getElementById('notification');
    const duaContainer = document.getElementById('duaContainer');

    let rakatCount = 0;
    let totalRakats = parseInt(totalRakatsSelect.value);

    function updateDisplay() {
        rakatCountElement.textContent = rakatCount;

        // Update progress bar
        progressBar.style.width = `${(rakatCount / totalRakats) * 100}%`;

        // Show break notification every 4 Rakats
        if (rakatCount > 0 && rakatCount % 4 === 0 && rakatCount < totalRakats) {
            showNotification("Take a short break!");
        }

        // Show dua when Taraweeh is complete
        if (rakatCount >= totalRakats) {
            showNotification("Taraweeh completed, Alhamdulillah!");
            duaContainer.style.display = "block";
        } else {
            duaContainer.style.display = "none";
        }
    }

    function showNotification(message) {
        notification.textContent = message;
        notification.classList.add('show');
        setTimeout(() => notification.classList.remove('show'), 4000);
    }

    incrementButton.addEventListener('click', function() {
        if (rakatCount < totalRakats) {
            rakatCount += 2;
            updateDisplay();
        }
    });

    resetButton.addEventListener('click', function() {
        rakatCount = 0;
        updateDisplay();
    });

    totalRakatsSelect.addEventListener('change', function() {
        totalRakats = parseInt(this.value);
        rakatCount = 0;
        updateDisplay();
    });

    nightToggle.addEventListener('click', function() {
        document.body.classList.toggle('night-mode');
    });

    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space') {
            incrementButton.click();
            e.preventDefault();
        } else if (e.code === 'KeyR') {
            resetButton.click();
        }
    });

    updateDisplay();
});

// ✅ Register PWA Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log("Service Worker Registered ✅"))
    .catch(err => console.error("Service Worker Failed ❌", err));
}
