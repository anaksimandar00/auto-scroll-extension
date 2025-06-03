let scrollingTabs = {};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const tabId = sender.tab.id;

  if (message.command === "start"){
    scrollingTabs[tabId] = true;

    chrome.scripting.executeScript({
      target: { tabId },
      func: (speed) => {
        if (!window.autoScrollInterval) {
          window.autoScrollInterval = setInterval(() => {
            window.scrollBy(0, 2);
          }, speed);
        }
      },
      args: [message.speed]
    });
  }

  if (message.command == "stop"){
    scrollingTabs[tabId] = false;

    chrome.scripting.executeScript({
      target: { tabId },
      func: () => {
        clearInterval(window.autoScrollInterval);
        window.autoScrollInterval = null;
      }
    })
  }

  if (message.command === "getStatus"){
    sendResponse({
      isScrolling: scrollingTabs[tabId] ?? false
    })
  }
});
