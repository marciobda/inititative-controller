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
            { type : 'player',  name : 'Name', initValue : 10 },
            { type : 'monster', name : 'Monster',  initValue : 10 },
            { type : 'player',  name : 'Name', initValue : 10 },
            { type : 'player',  name : 'Name', initValue : 10 }
        ]);

    }));

    it("should add a new actor based on the role", inject(function($controller, $rootScope) {

      var scope = $rootScope.$new();
      var ctrl = $controller('InitiativeCtrl',{$scope:scope});

      scope.addActor('player');
      scope.addActor('monster');

      expect(scope.actors)
        .toEqual([
            { type : 'player',  name : 'Name', initValue : 10 },
            { type : 'player',  name : 'Name', initValue : 10 },
            { type : 'player',  name : 'Name', initValue : 10 },
            { type : 'monster', name : 'Monster',  initValue : 10 },
            { type : 'player',  name : 'Name', initValue : 10 },
            { type : 'monster', name : 'Monster',  initValue : 10 }
        ]);


    }));

    //TODO: Test Actor removed
    //TODO: Test auto move on calculation
    //TODO: Test drag and drop event ???
    //
});
