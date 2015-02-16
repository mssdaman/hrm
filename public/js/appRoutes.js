angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/documentation/:employeeid', {
			templateUrl: 'views/documentation.html',
			controller: 'NerdController'
		});
		

	$locationProvider.html5Mode(true);

}]);