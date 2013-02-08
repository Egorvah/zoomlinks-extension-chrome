
m = angular.module("zoomlinks", ['ngResource','ui'])

m.factory 'Link', ($resource)->
  $resource 'http://zoomlinks.ru/rest/link/:id'

m.service "authService", ($http)->
  @isAuthenticated = false
  @username = null

  handleResponse = (data, callback)=>
    @isAuthenticated = data.isAuthenticated
    @username = data.username
    callback(data) if callback

  @checkAuth = (callback)=>
    $http.get("http://zoomlinks.ru/authApi/checkAuth").success (data)=>
      if !data.isAuthenticated
        $http.post("http://zoomlinks.ru/authApi/signIn", {username: localStorage["username"], password: localStorage["password"]}).success (data)=>
          if data.isAuthenticated
            handleResponse(data, callback)
      else
        handleResponse(data, callback)

m.controller 'PopupCtr', ($scope, Link, authService)->
  $scope.exportBookmarks = ->
    authService.checkAuth ()->
      chrome.bookmarks.getTree( (BookmarkTreeNode)->
        for tree in BookmarkTreeNode
          for folder in tree.children
            for boookmark in folder.children
              link = new Link()
              link.url = boookmark.url
              link.folder = $scope.currentFolder?.id || 0
              link.$save ->


      )

  $scope.exportTabs = ->
    authService.checkAuth ()->
      chrome.windows.getAll({"populate" : true}, (tabs)->
        for window in tabs
          for tab in window.tabs
            link = new Link()
            link.url = tab.url
            link.folder = $scope.currentFolder?.id || 0
            link.$save ->
      )

m.controller 'OptionsCtr', ($scope, Link, authService)->
  $scope.username = localStorage["username"]
  $scope.password = localStorage["password"]

  $scope.saveSettings = ->
    localStorage["username"] = $scope.username;
    localStorage["password"] = $scope.password;

