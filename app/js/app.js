"use strict";
var app = angular.module('Initiative',[]);

app.controller('InitiativeCtrl',function($scope){

    // Initial base group
    $scope.actors = ['player','player','player','monster'];

    $scope.reorder = function (initial, target) {
        console.log('it worked! Initial: ' + initial + ' and Target: ' + target);

        $scope.actors = ['player','monster','player','player'];
        //TODO: Reorder based on index
        $scope.$apply();
    }


})

.directive('actor',function(){
    return {
        templateUrl: 'partials/actor.html',
        scope: { type: '@'},
        link: function(scope,element,attr) {

            element.on('dragstart', function(e){

                e.dataTransfer.setData('Text', attr.index);
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.dropEffect = 'move';

                angular.element(element[0].parentNode).addClass('dragging');

                e.stopPropagation();
            });

            element.on('dragend',function(e){
                angular.element(element[0].parentNode).removeClass("dragging");
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

            element.on('dragstart',function(e){
                element.addClass("actor-dragging");
            });

            element.on('dragend',function(e){
                element.removeClass("actor-dragging");
            });

            element.on('dragover',function(e){
                e.stopPropagation();
                e.preventDefault();
            });

            element.on('drop', function(e){
                scope.initial = e.dataTransfer.getData('Text');
                scope.target = e.target.attributes.getNamedItem('data-index').value;

                scope.droppedEvent( { initial : scope.initial, target: scope.target });
            });

        }
    }
});
