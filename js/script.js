chrome.extension.sendRequest({localStorage: "hotkey"}, function() {

        document.addEventListener("keydown", function (e){
        if(e.keyCode == 90 && e.ctrlKey == true && e.shiftKey == true ){   //e.altKey == true
            e.preventDefault();
            chrome.extension.sendRequest({action:"keydown"});
            return false;
        }
    }, false);
});