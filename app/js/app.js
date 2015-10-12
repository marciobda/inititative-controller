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

})

.directive('actor',function($timeout){
    return {
        templateUrl: 'partials/actor.html',
        scope: {
            type: '=type',
            name: '=name',
            initValue: '=ngModel',
            droppedEvent: '&dropped',
            deleteEvent: '&delete',
            newInitNumber: '&init'
        },
        link: function(scope,element,attr) {

            var initInput = angular.element(element.find('input')[0]);

            element.on('click', function (e){

            });

            element.on('input', function(e){
                scope.name = this.querySelector('.actor__name').value;
                scope.initValue = this.querySelector('.actor__init').value;
                scope.$apply();
            });

            initInput.bind('blur', function(e){
                scope.newInitNumber();
            });

            element.on('mousedown',function(e){
                element[0].draggable = true;
                if(e.target.nodeName === 'A') {
                    scope.deleteEvent({ index : attr.index});
                }
            });

            element.on('mouseup',function(e){
                element[0].draggable = false;
                e.target.focus();
            });

            element.on('touchstart',function(e){
                element[0].draggable = true;
                if(e.target.nodeName === 'A') {
                    scope.deleteEvent({ index : attr.index});
                }
            });

            element.on('touchend',function(e){
                e.target.focus();
                element[0].draggable = false;
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
})

.directive('ngPlaceholder', function($document) {
  return {
    restrict: 'A',
    scope: {
      placeholder: '=ngPlaceholder'
    },
    link: function(scope, elem, attr) {
      scope.$watch('placeholder',function() {
        elem[0].placeholder = scope.placeholder;
      });
    }
  }
});
