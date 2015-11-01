/**
 * Player and Monster cards behaviour
 *
 * TODO: Refactor to multiple Directives
 */
app.directive('actor',function($timeout){
    return {
        templateUrl: 'js/views/actor.html',
        scope: {
            actorType: '=type',
            dropActor: '&dropped',
            deleteActor: '&deleted',
            newInitNumber: '&init'
        },
        link: function(scope,element,attr) {

            var longpress;
            var editingValue;

            // Get the specific initiative input to bind blur event
            // Should refactor this
            var initInput = angular.element(element.find('input')[0]);
            initInput.bind('blur', function(e){
                e.stopImmediatePropagation();
                e.preventDefault();
                scope.newInitNumber();
            });

            element.on('keydown', function(e){
              if (e.which == 9) { // TAB Value
                 e.preventDefault();
                 scope.newInitNumber();
                 e.target.blur();
              }
            });

            element.on('mousedown touchstart',function(e){

                longpress = true;

                if(e.type === 'touchstart') {
                    e.preventDefault();
                    element[0].draggable = true; // only way to enable drag in touchscreens
                    editingValue = true;
                }

                if(e.target.nodeName === 'A') {
                    scope.deleteActor({ index : attr.index});
                }

                $timeout(function(){
                    if(longpress) {
                        element[0].draggable = true;
                        element[0].contentEditable = false;
                        angular.element(element[0]).addClass('dragging');
                        editingValue = false;
                        e.target.blur();
                    }
                }, 200);

            });

            element.on('mouseup touchend',function(e){

                if( e.type === 'touchend' && editingValue === true) {
                    e.target.focus();
                }

                if(longpress) {
                    longpress = false;
                    element[0].draggable = false;
                    element[0].contentEditable = true;
                }

                angular.element(element[0]).removeClass('dragging');
            });

            element.on('mousemove',function(e){
                longpress = false;
            });

            element.on('dragstart', function(e){
                e.dataTransfer.setData('text/plain', attr.index);
            });

            element.on('dragover',function(e){
                // prevent the auto adding in input field
                e.preventDefault();
            });

            element.on('drop',function(e){
                var initialValue = e.dataTransfer.getData('text/plain');
                var targetValue = angular.element(this).scope().$index;
                var items = element[0].parentNode.children;

                scope.dropActor( { initial : initialValue, target: targetValue });

                for( var i= 0; i< items.length; i++) {
                  angular.element(items[i]).removeClass('dragging');
                }
            });
        }
    }
})

/**
 * Directive to make Input Placeholder dynamic
 */
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
