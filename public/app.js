angular.module('packmvp', [
	'packmvp.meetpoints-selection'
])

.constant('config', {
	apiUrl: 'http://localhost:3000/api'
})

.config(['$urlRouterProvider', function ($urlRouterProvider) {
	$urlRouterProvider.otherwise('/')
}])