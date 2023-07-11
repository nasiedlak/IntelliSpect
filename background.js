chrome.runtime.onInstalled.addListener(() => { 
	chrome.contextMenus.create({
		"id": "explainit",
		"title": "Explain it!",
		"contexts": ["selection"]
	});
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
	if(info.menuItemId == "explainit") {
		let url = chrome.runtime.getURL("explanation.html");
		chrome.windows.create({
			url: url,
			type: 'popup',
			width: 300,
			height: 200,
			top: Math.round(screen.availHeight/2 - 100),
			left: Math.round(screen.availWidth/2 - 150)
		});
	}
});

function showPop() {
	chrome.action.setPopup({ popup: 'popup.html' });
	chrome.action.openPopup();
}