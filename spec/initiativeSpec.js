describe('InitiativeCtrl', function() {

    beforeEach(angular.mock.module('Initiative'));

    it("should generate 4 actors", inject(function($controller) {

      var scope = {};
      var ctrl = $controller('InitiativeCtrl',{$scope:scope});

      expect(scope.actors.length).toBe(4);

    }));


    it("should reorder the array, moving the last actor to the second position", inject(function($controller, $rootScope) {

      var scope = $rootScope.$new();
      var ctrl = $controller('InitiativeCtrl',{$scope:scope});

      scope.reorder(3,1);

      expect(scope.actors)
        .toEqual([
            { type :'player', name : 'Name'},
            { type :'monster', name : 'Monster'},
            { type :'player', name : 'Name'},
            { type :'player', name : 'Name'}
        ]);

    }));


    //TODO: Test drag and drop event ???
    //TODO: Test new Actor Added
    //TODO: Test Actor removed
    //TODO: Test auto move on calculation

});
