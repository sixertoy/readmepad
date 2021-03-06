/*jslint indent:4 */
/*globals angular */
(function () {

    'use strict';

    /*
    var web = '((file|http|ftp|https|git):\/\/)',
        file = '(([a-zA-Z]\:)|(\\))(\\{1}|((\\{1})[^\\]([^/:*?<>"|]*))+)',
        uriRegex = web + '|' + file;
        */

    // @see https://github.com/DavidTPate/isuri
    var digit = '0-9',
        digitOnly = '[' + digit + ']',
        alpha = 'a-zA-Z',
        hexDigit = digit + 'A-F',
        hexDigitOnly = '[' + hexDigit + ']',
        unreserved = alpha + digit + '-\\._~',
        pctEncoded = '%' + hexDigit,
        subDelims = '!$&\'()*+,;=',
        pchar = unreserved + pctEncoded + subDelims + ':@',
        pcharOnly = '[' + pchar + ']',
        or = '|',
        zeroPad = '0?',
        decOctect = '(' + zeroPad + zeroPad + digitOnly + or + zeroPad + '[1-9]' + digitOnly + or + '1' + digitOnly + digitOnly + or + '2' + '[0-4]' + digitOnly + or + '25' + '[0-5])',
        scheme = '^[a-zA-Z][a-zA-Z0-9+\\.-]*:',
        userinfo = '([' + unreserved + pctEncoded + subDelims + ':]*@)?',
        IPv4address = '(' + decOctect + '\\.){3}' + decOctect,
        h16 = '(' + hexDigitOnly + '){1,4}',
        ls32 = '(' + h16 + ':' + h16 + '|' + IPv4address + ')',
        IPv6SixHex = '(' + h16 + ':){6}' + ls32,
        IPv6FiveHex = '::(' + h16 + ':){5}' + ls32,
        IPv6FourHex = h16 + '::(' + h16 + ':){4}' + ls32,
        IPv6ThreeeHex = '(' + h16 + ':){0,1}' + h16 + '::(' + h16 + ':){3}' + ls32,
        IPv6TwoHex = '(' + h16 + ':){0,2}' + h16 + '::(' + h16 + ':){2}' + ls32,
        IPv6OneHex = '(' + h16 + ':){0,3}' + h16 + '::' + h16 + ':' + ls32,
        IPv6NoneHex = '(' + h16 + ':){0,4}' + h16 + '::' + ls32,
        IPv6NoneHex2 = '(' + h16 + ':){0,5}' + h16 + '::' + h16,
        IPv6NoneHex3 = '(' + h16 + ':){0,6}' + h16 + '::',
        IPv6address = '(' + IPv6SixHex + or + IPv6FiveHex + or + IPv6FourHex + or + IPv6ThreeeHex + or + IPv6TwoHex + or + IPv6OneHex + or + IPv6NoneHex + or + IPv6NoneHex2 + or + IPv6NoneHex3 + ')',
        IPvFuture = '(v' + hexDigitOnly + '+\\.[' + unreserved + subDelims + ':]+)',
        IPLiteral = '\\[(' + IPv6address + or + IPvFuture + ')\\]',
        regName = '[' + unreserved + pctEncoded + subDelims + ']{0,255}',
        host = '(' + IPLiteral + or + IPv4address + or + regName + ')',
        port = '(:' + digitOnly + '*)?',
        authority = '(([\\//]{2}[\\//]?)|(?=[^\/]))' + userinfo + host + port,
        segment = pcharOnly + '*',
        segmentNz = pcharOnly + '+',
        segmentNzNc = '[' + unreserved + pctEncoded + subDelims + '@]+',
        pathAbEmpty = '(\\/' + segment + ')*',
        pathAbsolute = '\\/' + segmentNz + pathAbEmpty,
        pathNoScheme = segmentNzNc + pathAbEmpty,
        pathRootless = segmentNz + pathAbEmpty,
        path = '(\\/(' + pathAbEmpty + or + pathAbsolute + or + pathNoScheme + or + pathRootless + '))?',
        query = '(\\?[' + pchar + '\\/\\?]*(?=#|$))?',
        fragment = '(#[' + pchar + '\\/\\?]*$)?',
        uriRegex = new RegExp(scheme + authority + path + query + fragment);

    angular.module('readmepadAppSidebar')
        .controller('NewProjectModalController', ['$scope', '$modalInstance', 'data', function ($scope, $modalInstance, data) {

            var regex = new RegExp(uriRegex);


            $scope.form = {
                project_uri_regex: regex
            };

            $scope.data = data;

            $scope.submitForm = function () {
                if ($scope.form.projectForm.$valid) {
                    $modalInstance.close('submit');
                }
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

        }]);

}());
