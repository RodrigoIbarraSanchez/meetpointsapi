angular.module('packmvp.meetpointService', [])

.service('meetpointService', ['$http', 'config',
function (                     $http,   config) {
	
	this.setMap = function (init, whenPosition, setMeetpoints){

		init({
			center: {
				latitude: 24.7050018,
				longitude: -102.5889341
			},
			zoom: 5,
			control: {
				animateRefresh: function (position, ready) {
					var map = this.getGMap()
					map.setCenter(position)
					smoothZoom(map, 16, map.getZoom(), ready)
				}
			},
            options:{
                disableDefaultUI: true
            }
		})

		navigator.geolocation.getCurrentPosition(function (position) {
			whenPosition({
				lat: position.coords.latitude,
				lng: position.coords.longitude
			}, {
				id: 'myPlace',
				coords: {
					latitude: position.coords.latitude,
					longitude: position.coords.longitude
				},
				options: {
					draggable: true,
					animation: google.maps.Animation.DROP
				},
				events: {
					dragend: function (marker, eventName, args) {
						var lat = marker.getPosition().lat()
						var lng = marker.getPosition().lng()

						findMeetpoints(lat, lng, function (meetpoints) {
							setMeetpoints(meetpoints)
						})
					}
				}
			})
		})
	}

	this.createMeetpointsMarkers = function (meetpoints, callback) {

		var markers = []

		meetpoints.forEach(function (meetpoint, index, meetpoints) {
			console.log('paso 2')
			markers.push({
				id: meetpoint.name,
				coords: {
					latitude: meetpoint.coordinates.lat,
					longitude: meetpoint.coordinates.lng
				}
			})

			if (meetpoints.length == index+1){
				callback(markers)
			}
		})
	}

	// the smooth zoom function
	function smoothZoom(map, max, cnt, ready) {
	    if (cnt >= max) {
	            ready();
	        }
	    else {
	        z = google.maps.event.addListener(map, 'zoom_changed', function(event){
	            google.maps.event.removeListener(z);
	            smoothZoom(map, max, cnt + 1, ready);
	        });
	        setTimeout(function(){map.setZoom(cnt)}, 100); // 80ms is what I found to work well on my system -- it might not work well on all systems
	    }
	}

	function findMeetpoints(lat, lng, setMeetpoints) {
		
		$http.get(config.apiUrl+'/meetpoints?filter=map&lat='+lat+'&lng='+lng)
		.then(function (res) {
			if (res.data.success) {
				setMeetpoints(res.data.map.meetpoints)
			}
			else
				console.log("Error")			
		})

	}

}])

/*
$scope.bounds = {
		northeast: {
			latitude: 19.0411539,
			longitude: -98.2079079
		},
		southwest: {
			latitude: 19.2729971,
			longitude: -98.4267316
		}
	}
*/