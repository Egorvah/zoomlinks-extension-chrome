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

            withAuth(function(){
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

});

function withAuth(callback){
    $.get('http://zoomlinks.ru/authApi/checkAuth').done(function(data){
        if(!data.isAuthenticated){ //isAuthenticated
            $.post("http://zoomlinks.ru/authApi/signIn", {username: localStorage["username"], password: localStorage["password"]}).done(function(signInData) {
                if(signInData.isAuthenticated)
                    callback();
            });
        }else{
            callback();

        }
    });
}