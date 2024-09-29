document.getElementById('toggleOverlay').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: toggleOverlay
      });
    });
  });
  
  // Function to toggle overlay on/off
  function toggleOverlay() {
    const overlay = document.querySelector('div');
    if (overlay) {
      overlay.remove();
    } else {
      const metrics = measureLoadingTime();
      createOverlay(metrics);
    }
  }
  