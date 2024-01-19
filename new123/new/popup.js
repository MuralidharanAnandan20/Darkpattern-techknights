document.addEventListener('DOMContentLoaded', function () {
    let scrapeEmails = document.getElementById('scrapeEmails');
    let list = document.getElementById('emailList');

    scrapeEmails.addEventListener("click", async () => {
        try {
            let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

            // Execute script to parse emails on the page
            let result = await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: scrapeEmailsFromPage,
            });

            const scrapedEmails = result[0].emailList;

            // Send scraped emails to Flask server and get predictions
            const predictions = await sendToFlaskServer(scrapedEmails);

            // Display predictions in the popup
            displayPredictions(predictions);
        } catch (error) {
            console.error('Error:', error.message);
        }
    });

    function scrapeEmailsFromPage() {
        const textContentRegEx = />([^<]+)</g;
        let matches;
        let emailList = [];

        while ((matches = textContentRegEx.exec(document.body.innerHTML)) !== null) {
            emailList.push(matches[1].trim());
        }

        return { emailList };
    }

    // Other functions remain the same...
});
