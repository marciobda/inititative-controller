describe('InitiativeCtrl', function() {

    //beforeEach(module('Initiative'));
    beforeEach(angular.mock.module('Initiative'));

    it("should generate 4 actors", inject(function($controller) {

      var scope = {};
      var ctrl = $controller('InitiativeCtrl',{$scope:scope});

      expect(scope.actors.length).toBe(4);

    }));

});
