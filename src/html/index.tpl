<!DOCTYPE html>
<html lang="fr" ng-app="readmepadApp">

<head>
    <title></title>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
    {{$include 'commons/styles'}}
</head>

<body class="" ng-class="[theme, hasSidebar, hasCheatsheet, isLoading]">

    <div id="screen-locker"></div>

    <div id="page" class="container-fluid" ng-controller="AppController" ng-init="initialize()">
        <div id="header" class="row">
            {{$include 'views/toolbar'}}
        </div>
        <div id="main" class="row">
            {{$include 'views/sidebar'}}
            {{$include 'views/viewer'}}
            {{$include 'views/cheatsheet'}}
            <div class="splitter splitter-sidebar">
                <a href="#" ng-show="sidebarVisible" ng-click="showSidebar()" class="octicon octicon-chevron-left"></a>
                <a href="#" ng-hide="sidebarVisible" ng-click="showSidebar()" class="octicon octicon-chevron-right"></a>
            </div>
            <div class="splitter splitter-cheatsheet">
                <a href="#" ng-hide="cheatsheetVisible" ng-click="showCheatsheet()" class="octicon octicon-chevron-left"></a>
                <a href="#" ng-show="cheatsheetVisible" ng-click="showCheatsheet()" class="octicon octicon-chevron-right"></a>
            </div>
        </div>
        <div id="footer" class="row">
            {{$include 'commons/footer'}}
        </div>
    </div>

    <div class="after-body">
        {{$include 'commons/scripts'}}
        {{$include 'templates/import-project_modal'}}
        {{$include 'templates/preferences_popover'}}
        {{$include 'templates/project-explorer_repeat'}}
    </div>

    <!-- livereload -->
    {{$livereload 1337}}

</body>

</html>
