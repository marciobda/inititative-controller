describe('InitiativeCtrl', function() {

    beforeEach(angular.mock.module('Initiative'));

    it("should generate 4 actors", inject(function($controller) {

      var scope = {};
      var ctrl = $controller('InitiativeCtrl',{$scope:scope});

      expect(scope.actors.length).toBe(4);

    }));

    //TODO: Test drag and drop event
    //TODO: Test Controller Reorder
    //TODO: Test new Actor Added
    //TODO: Test Actor removed
    //TODO: Test auto calculation on move
    //TODO: Test auto move on calculation

});
