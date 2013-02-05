/**
 * Created with IntelliJ IDEA.
 * User: egor
 * Date: 05.02.13
 * Time: 14:05
 * To change this template use File | Settings | File Templates.
 */
chrome.extension.onRequest.addListener(function(request, sender, callback) {
    if(request && request.localStorage) {callback(); return; };

    alert('activeTab');
    chrome.tabs.getSelected(null, function(tab) {
        $.post("http://zoomlinks.ru/rest/link", { url: tab.url, folder: 0 } );
    });
    /*var chromeExtURL="http://zoomlinks.ru/";
    chrome.tabs.getAllInWindow(null,function(tabs){
        for (var i=0;i<tabs.length;i++){
            if (tabs[i].url == chromeExtURL){
                chrome.tabs.update(tabs[i].id, {selected:true})
                return;
            }
        }
        chrome.tabs.create({url:chromeExtURL,selected:true})
    })*/

});