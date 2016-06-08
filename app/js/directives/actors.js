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
      var placeholder = true;
      var draggedElement;

      function dragHandler(){
        if(longpress) {
          element[0].draggable = true;
          element[0].contentEditable = false;
          angular.element(element[0]).addClass('dragging');
          editingValue = false;
        }
      }





      /**
      *  Desktop Events
      */
      element.on('mousedown',function(e){
        longpress = true;
        $timeout(dragHandler.bind(), 200);
      });

      element.on('mouseup',function(e){
        if(longpress) {
          longpress = false;
          element[0].draggable = false;
          element[0].contentEditable = true;
        }
        angular.element(element[0]).removeClass('dragging');
        if(e.target.nodeName === 'A') {
          scope.deleteActor({ index : attr.index});
        }
      });

      element.on('mousemove',function(e){
        longpress = false;
      });





      /**
      *  Mouse Events
      */
      element.on('touchstart',function(e){
        longpress = true;
        e.preventDefault();
        element[0].draggable = true;
        editingValue = true;
        $timeout(dragHandler.bind(), 200);
      });

      element.on('touchend',function(e){

        if(editingValue === true) {
          e.target.focus();
        }
        if(longpress) {
          longpress = false;
          element[0].draggable = false;
          element[0].contentEditable = true;
        }
        angular.element(element[0]).removeClass('dragging');
        if(e.target.nodeName === 'A') {
          scope.deleteActor({ index : attr.index});
        }
      });




      /**
      *  Drag and Drop Events
      */

      // Fired in the dragged element
      element.on('dragstart', function(e){
        e.dataTransfer.setData('text/plain', attr.index);
        draggedElement = e.target;
        return false
      });

      // Fired in the element underneath
      element.on('dragover',function(e){
        e.preventDefault(); // prevent the auto adding in input field
        if (placeholder &&
          element[0] !== draggedElement)
          {
            angular.element(document.querySelectorAll('actor')).removeClass('dragging actor--placeholder');
            angular.element(element[0]).addClass('actor--placeholder');
            placeholder = false;
          }
        });

        // Fired in the element underneath
        element.on('dragleave', function(e){
          angular.element(e.target).removeClass('actor--placeholder');
          placeholder = true;

        });

        // Fired in the element underneath
        element.on('drop',function(e){
          placeholder = true;
          var initialValue = e.dataTransfer.getData('text/plain');
          var targetValue = angular.element(this).scope().$index;
          scope.dropActor( { initial : initialValue, target: targetValue });

          angular.element(document.querySelectorAll('actor')).removeClass('dragging actor--placeholder');
          dragCounter = 0;
        });

        // Fired on the dragged element
        element.on('dragend', function(e){
          draggedElement = null;
          angular.element(document.querySelectorAll('actor')).removeClass('dragging actor--placeholder');
        });
      }
    }
  });
