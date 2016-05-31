importScripts('../vendor/system.js', '../vendor/sys-config.js');
onmessage = function(e) {
	System.import(e.data)
		.then(() => {console.log("Loaded worker", e.data)})
		.catch(error => {console.error(error)})
}