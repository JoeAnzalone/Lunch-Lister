angular.module('lunchLister', [])

.controller('LunchListerCtrl', ['$scope', '$http', function($scope, $http){

    $scope.query = {
        "take_out": true,
        "sit_down": true
    };

    $scope.meals = {
        "breakfast": true,
        "lunch": true,
        "drinks": true
    };

    $scope.vegetarian_only = false;

    $scope.getIcon = function(key){
        var icons = {
            'google_maps': 'map-marker'
        };

        return typeof icons[key] != 'undefined' ? icons[key] : key;
    };

    $http.get('places.json').success(function(response){
        $scope.places = response;
    });

}])

.filter('or', function(){

    return function(items, query) {
        var filteredItems = [];
        angular.forEach(items, function(item){
            for (prop in query) {
                if (item[prop] && query[prop]) {
                    return filteredItems.push(item);
                }
            };
        });

        return filteredItems;
    };
})

.filter('contains', function(){

    return function(items, query, property) {
        var filteredItems = [];
        angular.forEach(items, function(item){
            for (prop in query) {
                if (query[prop] && item[property].indexOf(prop) > -1) {
                    return filteredItems.push(item);
                }
            };
        });

        return filteredItems;
    };
});
