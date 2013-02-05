/**
 * Created with IntelliJ IDEA.
 * User: egor
 * Date: 05.02.13
 * Time: 14:05
 * To change this template use File | Settings | File Templates.
 */
chrome.extension.onRequest.addListener(function(request, sender, callback) {
    if(request && request.localStorage) {callback(); return; };

        chrome.tabs.getSelected(null, function(tab) {



            $.post("http://zoomlinks.ru/rest/link", { url: tab.url, folder: 0 }).done(function(data) {
                    chrome.browserAction.setIcon({path:"images/zoomlinks_new_link.png"});
                }).fail(function(data){
                    chrome.browserAction.setIcon({path:"images/zoomlinks_error.png"});
                });

            setTimeout(function(){
                chrome.browserAction.setIcon({path:"images/zoomlinks_icon.png"})
            }, 3000);
        });

});