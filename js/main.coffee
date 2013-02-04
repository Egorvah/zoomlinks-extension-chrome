m = angular.module("zoomlinks", ['ngResource','ui'])

m.factory 'Link', ($resource)->
  $resource 'http://zoomlinks.ru/rest/link/:id'

m.directive "exportBookmarks", ($timeout)->
  (scope, element, attrs)->
    angular.element(element).click ->
      console.log('starting parse bookmarks')
      chrome.bookmarks.getTree( (BookmarkTreeNode)->
        console.log(BookmarkTreeNode)
        #scope.$apply attrs.exportBookmarks
      )

m.controller 'MainCtr', ($scope, Link)->
  $scope.exportBookmarks = ->
    chrome.bookmarks.getTree( (BookmarkTreeNode)->
      console.log(BookmarkTreeNode)
      #scope.$apply attrs.exportBookmarks
    )


  $scope.exportTabs = ->
    chrome.windows.getAll({"populate" : true}, (tabs)->
      console.log(tabs)
    )