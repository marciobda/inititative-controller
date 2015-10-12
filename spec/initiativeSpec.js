describe('InitiativeCtrl', function() {

    beforeEach(module('Initiative'));

    var $controller;

    beforeEach(inject(function( _$rootScope_, _$controller_) {
        $rootScope = _$rootScope_;
        $controller = _$controller_;

   }));

   describe('$scope.actors', function() {

        var $scope,
            controller;

        beforeEach(function() {
          $scope = {};
          $controller('InitiativeCtrl',{$scope: $scope});
        });

        it("should generate 4 actors", function() {
            expect($scope.actors.length).toBe(4);
        });

    });


    describe('$scope.reorder', function() {

        var $scope,
            controller;

        beforeEach(function() {
          $scope = $rootScope.$new();
          $controller('InitiativeCtrl',{$scope: $scope});
        });

        it("should reorder the array, moving the last actor to the second position", function() {

          $scope.reorder(3,1);

          expect($scope.actors)
            .toEqual([
                { type : 'player',  name : '', initValue : 10 },
                { type : 'monster', name : '',  initValue : 10 },
                { type : 'player',  name : '', initValue : 10 },
                { type : 'player',  name : '', initValue : 10 }
            ]);

        });

    });

    describe('$scope.addActor', function() {

        var $scope,
            controller;

        beforeEach(function() {
          $scope = $rootScope.$new();
          $controller('InitiativeCtrl',{$scope: $scope});
        });

        it("should add a new actor based on the role", inject(function() {

          $scope.addActor('player');
          $scope.addActor('monster');

          expect($scope.actors)
            .toEqual([
                { type : 'player',  name : '', initValue : 10 },
                { type : 'player',  name : '', initValue : 10 },
                { type : 'player',  name : '', initValue : 10 },
                { type : 'monster', name : '',  initValue : 10 },
                { type : 'player',  name : '', initValue : 10 },
                { type : 'monster', name : '',  initValue : 10 }
            ]);


        }));

    });


    describe('$scope.calcInitiative', function() {

        var $scope,
            controller;

        beforeEach(function() {
          $scope = $rootScope.$new();
          $controller('InitiativeCtrl',{$scope: $scope});
        });

        it("should order the initiatives", inject(function() {

            $scope.actors = [
                   { type : 'player',  name : 'Char2', initValue : 20 },
                   { type : 'player',  name : 'Char6', initValue : 07 },
                   { type : 'player',  name : 'Char1', initValue : 23 },
                   { type : 'monster', name : 'Char3', initValue : 19 },
                   { type : 'player',  name : 'Char5', initValue : 12 },
                   { type : 'monster', name : 'Char4', initValue : 15 }
                ];

            $scope.calcInitiative();

            expect($scope.actors)
            .toEqual([
                { type : 'player',  name : 'Char1', initValue : 23 },
                { type : 'player',  name : 'Char2', initValue : 20 },
                { type : 'monster', name : 'Char3',  initValue : 19 },
                { type : 'monster', name : 'Char4',  initValue : 15 },
                { type : 'player',  name : 'Char5', initValue : 12 },
                { type : 'player',  name : 'Char6', initValue : 07 }
            ]);

        }));

    });

    //TODO: Test Actor removed
    //TODO: Test drag and drop event ???
    //
});
