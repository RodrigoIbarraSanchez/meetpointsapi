angular.module('packmvp.meetpoints-selection', ['ui.router', 'uiGmapgoogle-maps'])

.config(['$stateProvider', function ($stateProvider) {
	$stateProvider.state('dashboard', {
		url: '/',
		templateUrl: 'templates/meetpoints-selection.html',
		controller: 'meetpoints-selectionCtrl'
	})
}])

.controller('meetpoints-selectionCtrl', ['$scope', '$state',
function (                                $scope,   $state) {
	
	$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 }

}])