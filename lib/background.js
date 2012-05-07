background = {};

background.init = function(){
    storage.init();
    point.init();
    setInterval(background.routine,200);
}

background.routine = function(){
    chrome.tabs.getSelected(null,point.calc);
}

background.init();

