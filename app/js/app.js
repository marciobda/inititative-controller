"use strict";
var initiativeApp = angular.module('Initiative',[]);

initiativeApp.controller('InitiativeCtrl',function($scope){

    $scope.actors = ['player','player','player','monster'];

})

.directive('actor',function(){
    return {
        restrict: 'E',
        templateUrl: 'partials/actor.html'
    }
});
