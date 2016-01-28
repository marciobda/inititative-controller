describe('InitiativeCtrl', function() {

    beforeEach(module('Initiative'));

    var $controller,
        $scope;

    beforeEach(inject(function( _$rootScope_, _$controller_) {

        $rootScope = _$rootScope_;
        $controller = _$controller_;

        $scope = $rootScope.$new();
        $controller('InitiativeCtrl',{$scope: $scope});

   }));

   describe('$scope.actors', function() {

        it("should generate 4 actors", function() {
            expect($scope.actors.length).toBe(4);
        });

    });


    describe('$scope.reorder', function() {

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

    describe('$scope.insert', function() {

        it("should reorder the array, moving the first actor to the last position", function() {

          $scope.insert(0,3);

          expect($scope.actors)
            .toEqual([
                { type : 'player',  name : '', initValue : 10 },
                { type : 'player',  name : '', initValue : 10 },
                { type : 'monster', name : '',  initValue : 10 },
                { type : 'player',  name : '', initValue : 10 }
            ]);

        });

    });

    describe('$scope.addActor', function() {

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

    describe('$scope.remove', function() {

        it("should order the initiatives", inject(function() {

            $scope.remove(2);

            expect($scope.actors)
            .toEqual([
                { type : 'player',  name : '', initValue : 10 },
                { type : 'player',  name : '', initValue : 10 },
                { type : 'monster', name : '',  initValue : 10 }
            ]);
        }));

    });

    //TODO: E2E testing
    //
});
