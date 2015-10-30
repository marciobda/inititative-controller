"use strict";
var app = angular.module('Initiative',[]);

app.controller('InitiativeCtrl',function($scope){

    // Initial base group
    $scope.actors = [
        { type : 'player',  name : '', initValue : 10 },
        { type : 'player',  name : '', initValue : 10 },
        { type : 'player',  name : '', initValue : 10 },
        { type : 'monster', name : '',  initValue : 10 }
    ];

    $scope.reorder = function (initial, target) {

        var temp = $scope.actors[target];
        $scope.actors[target] = $scope.actors[initial];
        $scope.actors[initial] = temp;

        $scope.$apply();

    };

    $scope.addActor = function(type) {
        if(type === 'player') {
            $scope.actors.push({ type : 'player',  name : '', initValue : 10  });
        } else if(type === 'monster') {
            $scope.actors.push({ type : 'monster',  name : '', initValue : 10  });
        }
    };

    $scope.calcInitiative = function() {

        var initCompare = function (a, b) {
            if (a.initValue > b.initValue) {
                return -1;
            }
            if (a.initValue < b.initValue) {
                return 1;
            }
            return 0;
        }
        $scope.actors.sort(initCompare);
        $scope.$apply();
    }

    $scope.remove = function(index) {
        $scope.actors.splice(index,1);
        $scope.$apply();
    }

});
