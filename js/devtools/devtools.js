console.log("hello from devtools");
chrome.devtools.panels.create("Cheat",
    "img/icon.png",
    "panel.html",
    function (panel) {
        console.log("hello from callback");
    });

