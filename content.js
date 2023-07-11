function getSelectionText() {
	var text = "";
	if(window.getSelection) {
		text = window.getSelection().toString();
	}
	return text;
}

document.onmouseup = document.onkeyup = function() {
	var selectedText = getSelectionText();
	if(selectedText.length > 0) {
		console.log("Selected text: " + selectedText);
		// TODO: Send to the background script
	}
};