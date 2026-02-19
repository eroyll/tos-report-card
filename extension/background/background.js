// TOS Report Card - Background Service Worker

// Clear badge when tab is updated (navigating to a new page)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    chrome.action.setBadgeText({
      text: '',
      tabId: tabId
    });
  }
});

console.log('TOS Report Card background service worker loaded');
