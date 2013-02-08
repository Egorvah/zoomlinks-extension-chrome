chrome.extension.sendRequest({localStorage: "hotkey"}, function() {

        document.addEventListener("keydown", function (e){

        if(e.keyCode == 90 && e.ctrlKey == true && (e.shiftKey == true  || e.metaKey == true) ) { //e.altKey == alt // e.metaKey == mac os command key

            e.preventDefault();
            chrome.extension.sendRequest({action:"keydown"});
            return false;
        }
    }, false);
});
