
m = angular.module("zoomlinks", ['ngResource','ui'])

m.factory 'Link', ($resource)->
  $resource 'http://zoomlinks.ru/rest/link/:id'

m.controller 'MainCtr', ($scope, Link)->
  $scope.exportBookmarks = ->
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
    chrome.windows.getAll({"populate" : true}, (tabs)->
      for window in tabs
        for tab in window.tabs
          link = new Link()
          link.url = tab.url
          link.folder = $scope.currentFolder?.id || 0
          link.$save ->
            console.log tab.url
    )