"use strict";
var app = angular.module('Initiative',[]);

app.controller('InitiativeCtrl',function($scope){

    // Initial base group
    $scope.actors = ['player','player','player','monster'];


})

.directive('actor',function(){
    return {
        templateUrl: 'partials/actor.html',
        scope: { type: '@' }
    }
});
