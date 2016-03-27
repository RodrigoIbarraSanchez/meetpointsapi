angular.module('packmvp.meetpoints-selection', ['ui.router', 'uiGmapgoogle-maps', 'packmvp.meetpointService'])

.config(['$stateProvider', function ($stateProvider) {
	$stateProvider.state('dashboard', {
		url: '/',
		templateUrl: 'templates/meetpoints-selection.html',
		controller: 'meetpoints-selectionCtrl'
	})
}])

.controller('meetpoints-selectionCtrl', ['$scope', '$state', 'meetpointService',
function (                                $scope,   $state,   meetpointService) {

	meetpointService.setMap(function (map) {
		$scope.map = map
		$scope.myPlace = {id: 'myPlace'}
	}, function (position, myPlace) {
		$scope.$apply(function(){
			$scope.map.control.animateRefresh(position, function () {
				$scope.myPlace = myPlace
			})
		})
	}, function (meetpoints) {
		meetpointService.createMeetpointsMarkers(meetpoints, function (markers) {
			$scope.meetpoints = markers
		})
	})

}])