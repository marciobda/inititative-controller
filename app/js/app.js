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
            var longpress;
            var initCalulated = false;
            var editing;
            var startYposition;

            element.on('input', function(e){
                scope.name = this.querySelector('.actor__name').value;
                scope.initValue = this.querySelector('.actor__init').value;
                scope.$apply();
            });

            element.on('keydown', function(e){
              if (e.which == 9) {
                 e.preventDefault();
              }
            });

            initInput.bind('blur', function(e){
                scope.newInitNumber();
            });


            element.on('mousedown touchstart',function(e){

                longpress = true;
                editing = true;
                var position = e.y;

                if(e.type === 'touchstart') {
                    e.preventDefault();
                    element[0].draggable = true;
                }

                if(e.target.nodeName === 'A') {
                    scope.deleteEvent({ index : attr.index});
                }

                $timeout(function(){
                    if(longpress) {
                        element[0].draggable = true;
                        angular.element(element[0]).addClass('dragging');
                        element[0].contentEditable = false;
                        e.target.blur();
                        editing = false;
                    }
                }, 300);

            });

            element.on('mouseup touchend',function(e){
                if(longpress) {
                    longpress = false;
                    element[0].draggable = false;
                }

                if(e.type === 'touchend' && editing === true) {
                    e.target.focus();
                }
                angular.element(element[0]).removeClass('dragging');
            });

            element.on('mousemove',function(e){
                longpress = false;
            });

            element.on('drag',function(e){
                var difference = e.y - startYposition + 40;
                //element[0].style.transform = 'translateY(' + difference + 'px)';
            });

            element.on('dragstart', function(e){
                startYposition = e.y;
                e.dataTransfer.setData('text/plain', attr.index);
            });

            element.on('dragover',function(e){
                e.preventDefault();
            });

            element.on('dragend',function(e){
                //element[0].style.transform = 'translateY(0px)';
            });

            element.on('drop',function(e){
                scope.initial = e.dataTransfer.getData('text/plain');
                scope.target = angular.element(this).scope().$index;

                scope.droppedEvent( { initial : scope.initial, target: scope.target });
                var items = element[0].parentNode.children,
                    i = 0;

                for(i; i< items.length; i++) {
                  angular.element(items[i]).removeClass('dragging');
                }
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
