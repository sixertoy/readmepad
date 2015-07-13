<!DOCTYPE html>
<html lang="fr" ng-app="readmepadApp">

<head>
    <title></title>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
    {{$include 'styles'}}
</head>

<body>

    <div id="page" class="container-fluid">
        <div class="row">
            <h1 class="title col-md-12"><span>Readme PAD</span></h1>
            {{$include 'explorer'}}
            {{$include 'viewer'}}
        </div>
    </div>

    <div class="after-body">
        {{$include 'scripts'}}
    </div>

</body>

</html>
