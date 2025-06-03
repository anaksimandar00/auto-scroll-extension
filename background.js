let scrollingTabs = {};

chrome.action.onClicked.addListener(async (tab) => {
  const tabId = tab.id;

  if (!tabId) return;

  const isScrolling = scrollingTabs[tabId] ?? false;

  if (!isScrolling) {
    scrollingTabs[tabId] = true;

    await chrome.scripting.executeScript({
      target: { tabId },
      func: () => {
        if (!window.autoScrollInterval) {
          window.autoScrollInterval = setInterval(() => {
            window.scrollBy(0, 2);
          }, 10);
        }
      }
    });
    await chrome.action.setTitle({ tabId, title: "Stop Auto Scroll" });
  } else {
    scrollingTabs[tabId] = false;

    await chrome.scripting.executeScript({
      target: { tabId },
      func: () => {
        clearInterval(window.autoScrollInterval);
        window.autoScrollInterval = null;
      }
    });
    await chrome.action.setTitle({ tabId, title: "Start Auto Scroll" });
  }
});
