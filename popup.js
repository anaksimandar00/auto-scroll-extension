const toggleBtn = document.getElementById('toggleBtn');
const speedRange = document.getElementById('speedRange');
const speedVal = document.getElementById('speedVal');

let isScrolling = false;
let speed = parseInt(speedRange.value, 10);

// Update label
speedRange.addEventListener('input', () => {
    speed = parseInt(speedRange.value, 10);
    speedVal.textContent = speed;
});

toggleBtn.addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (isScrolling) {
        chrome.runtime.sendMessage({ command: "stop" });
        toggleBtn.textContent = "Start Auto Scroll";
    } else {
        chrome.runtime.sendMessage({ command: "start", speed });
        toggleBtn.textContent = "Stop Auto Scroll";
    }

    isScrolling = !isScrolling;
});

(async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.runtime.sendMessage({ command: "getStatus" }, (response) => {
        isScrolling = response?.isScrolling ?? false;
        toggleBtn.textContent = isScrolling ? "Stop Auto Scroll" : "Start Auto Scroll";
    });
})();
