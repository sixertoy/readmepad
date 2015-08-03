<!DOCTYPE html>
<html lang="fr" ng-app="readmepadApp">

<head>
    <title></title>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
    {{$include 'commons/styles'}}
</head>

<body class="" ng-class="[theme]">

    <div id="page" class="container-fluid">
        <div id="header" class="row">
            {{$include 'views/toolbar'}}
        </div>
        <div id="main" class="main row">
            {{$include 'views/sidebar'}}
            {{$include 'views/viewer'}}
        </div>
        <div id="footer" class="row">
            {{$include 'commons/footer'}}
        </div>
    </div>

    <div class="after-body">
        {{$include 'commons/scripts'}}
    </div>

    {{$include 'modals/newproject_modal'}}
    {{$include 'modals/renameproject_modal'}}
    {{$include 'modals/preferences_popover'}}

    {{$livereload}}

</body>

</html>
