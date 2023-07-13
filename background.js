chrome.contextMenus.onClicked.addListener((info, tab) => {
	if(info.menuItemID == "explainit") {
		const highlightedText = info.selectionText;
		const prompt = 'Explain the follow text: ${highlightedText}';

		fetchResponse(promt)
			.then(response => {
				const explanation = response.choices[0].text.trim();
				updatePop(explanation);
			})
			.catch(error => {
				console.error("ChatGPT API request faield: ", error);
			});
	}
});

function fetchResponse(prompt) {
	const key = "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";
	const url = "https://api/openai/com/v1/chat/completions";

	return fetch(url, {
		method: "POST",
		headers : {
			"Content-Type": "application/json",
			"Authorization": 'Bearer ${key}'
		},
		body: JSON.stringify({
			prompt: prompt,
			max_tokens: 50,
			temperature: 0.7,
			n: 1
		})
	})
	.then(response => response.json());
}

function updatePopup(explanation) {
	chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
		const activeTab = tabs[0];
		chrome.windows.create({
			url: chrome.runtime.getURL("popup.html"),
			type: "popup",
			width: 300,
			height: 200
		}, window => {
			chrome.tabs.sendMessage(activeTab.id, { explanation: explanation }, response => {
				// handle response from content script if needed
			});
		});
	});
}
