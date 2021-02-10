/**
 * 
 * @param {string} paramName 
 * @returns {string}
 */
function getParam(paramName) {
	return new URL(window.location.href).searchParams.get(paramName);
}

document.getElementById("file").innerText = getParam("file");

function Back() {
	window.history.back();
}

function Main() {
	window.location = "";
}