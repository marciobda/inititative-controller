/**
 * Player and Monster cards behaviour
 */
app.directive('actor',function($timeout){
    return {
        templateUrl: 'views/actor.html',
        scope: {
            actorType: '=type',
            dropActor: '&dropped',
            deleteActor: '&deleted',
        },
        link: function(scope,element,attr) {

            var longpress;
            var editingValue;
            var selectedCard = element[0];

            var dragHandler = function(){
                if(longpress) {
                    selectedCard.draggable = true;
                    selectedCard.contentEditable = false;
                    angular.element(selectedCard).addClass('dragging');
                    editingValue = false;
                }
            }

            element.on('mousedown',function(e){
                longpress = true;
                $timeout(dragHandler.bind(), 200);
            });

            element.on('mouseup',function(e){
                if(longpress) {
                    longpress = false;
                    selectedCard.draggable = false;
                    selectedCard.contentEditable = true;
                }
                angular.element(selectedCard).removeClass('dragging');
                if(e.target.nodeName === 'A') {
                    scope.deleteActor({ index : attr.index});
                }
            });

            element.on('mousemove',function(e){
                longpress = false;
            });

            element.on('touchstart',function(e){
                longpress = true;
                e.preventDefault();
                selectedCard.draggable = true;
                editingValue = true;
                $timeout(dragHandler.bind(), 200);
            });

            element.on('touchend',function(e){

                if(editingValue === true) {
                    e.target.focus();
                }
                if(longpress) {
                    longpress = false;
                    selectedCard.draggable = false;
                    selectedCard.contentEditable = true;
                }
                angular.element(selectedCard).removeClass('dragging');
                if(e.target.nodeName === 'A') {
                    scope.deleteActor({ index : attr.index});
                }
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
                var items = selectedCard.parentNode.children;

                scope.dropActor( { initial : initialValue, target: targetValue });

                for( var i= 0; i< items.length; i++) {
                  angular.element(items[i]).removeClass('dragging');
                }
            });
        }
    }
});
