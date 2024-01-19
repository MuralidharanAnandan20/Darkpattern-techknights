// background.js

// Example: Listen for a message from the content script or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "backgroundAction") {
        // Perform some background action
        console.log("Background script received a message from content script or popup:", message.data);
        
        // Send a response if needed
        sendResponse({ result: "Background action completed" });
    }
});

// Other background script logic can go here
