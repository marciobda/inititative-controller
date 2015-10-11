"use strict";
var app = angular.module('Initiative',[]);

app.controller('InitiativeCtrl',function($scope){

    // Initial base group
    $scope.actors = [
        { type : 'player',  name : 'Name', initValue : 10 },
        { type : 'player',  name : 'Name', initValue : 10 },
        { type : 'player',  name : 'Name', initValue : 10 },
        { type : 'monster', name : 'Monster',  initValue : 10 }
    ];

    $scope.reorder = function (initial, target) {

        var temp = $scope.actors[target];
        $scope.actors[target] = $scope.actors[initial];
        $scope.actors[initial] = temp;

        $scope.$apply();

    };

    $scope.addActor = function(type) {
        if(type === 'player') {
            $scope.actors.push({ type : 'player',  name : 'Name', initValue : 10  });
        } else if(type === 'monster') {
            $scope.actors.push({ type : 'monster',  name : 'Monster', initValue : 10  });
        }
    };

})

.directive('actor',function(){
    return {
        templateUrl: 'partials/actor.html',
        scope: {
            type: '=type',
            name: '=name',
            initValue: '=ngModel',
            droppedEvent: '&dropped'
        },
        link: function(scope,element,attr) {
            element.on('input', function(e){
                scope.name = element[0]
                    .children[0]
                    .children[0]
                    .children[0]
                    .textContent;
                scope.initValue = element[0]
                    .children[0]
                    .children[0]
                    .children[0]
                    .value;
                scope.$apply();
            });

            element.on('dragstart', function(e){
                e.dataTransfer.setData('Text', attr.index);
                angular.element(element[0].parentNode).addClass('dragging');
            });

            element.on('dragover',function(e){
                e.preventDefault();
            });

            element.on('drop',function(e){
                scope.initial = e.dataTransfer.getData('Text');
                scope.target = angular.element(this).scope().$index;

                scope.droppedEvent( { initial : scope.initial, target: scope.target });
                
                angular.element(element[0].parentNode).removeClass('dragging');
            });
        }
    }
});