"use strict";
var app = angular.module('Initiative',[]);

app.controller('InitiativeCtrl',function($scope){

    // Initial base group
    $scope.actors = [
        { type :'player', name : 'Name'},
        { type :'player', name : 'Name'},
        { type :'player', name : 'Name'},
        { type :'monster', name : 'Monster'}
    ];

    $scope.reorder = function (initial, target) {

        var temp = $scope.actors[target];
        $scope.actors[target] = $scope.actors[initial];
        $scope.actors[initial] = temp;

        $scope.$apply();

    }

})

.directive('actor',function(){
    return {
        templateUrl: 'partials/actor.html',
        scope: {
            type: '=type',
            name: '=name'
        },
        link: function(scope,element,attr) {

            element.on('input', function(e){
                scope.name = element[0]
                    .children[0]
                    .children[0]
                    .children[0]
                    .textContent;
                scope.$apply();
            });

            element.on('dragstart', function(e){

                e.dataTransfer.setData('Text', attr.index);
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.dropEffect = 'move';

                angular.element(element[0].parentNode).addClass('dragging');

                e.stopPropagation();
            });

            element.on('dragover',function(e){
                element.addClass("actor--dragging");
                e.stopPropagation();
                e.preventDefault();
            });

            element.on('dragleave',function(e){
                element.removeClass("actor--dragging");
            });

            element.on('drop',function(e){
                element.removeClass("actor--dragging");
            });

        }
    }
})

.directive('listOrder',function(){
    return {
        scope: {
            droppedEvent: '&dropped'
        },
        link: function(scope, element, attr) {

            element.on('dragend',function(e){
                element.removeClass("dragging");
            });


            element.on('drop', function(e){
                scope.initial = e.dataTransfer.getData('Text');
                scope.target = e.target.attributes.getNamedItem('data-index').value;

                scope.droppedEvent( { initial : scope.initial, target: scope.target });
            });

        }
    }
});
