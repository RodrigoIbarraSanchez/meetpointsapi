angular.module('packmvp.meetpointService', [])

.service('meetpointService', ['$http', 'config',
function (                     $http,   config) {
	
	var meetpointIcon = new google.maps.MarkerImage(
		"http://maps.google.com/mapfiles/kml/shapes/homegardenbusiness.png",
		null, /* size is determined at runtime */
		null, /* origin is 0,0 */
		null, /* anchor is bottom center of the scaled image */
		new google.maps.Size(35, 35)
	)

	var meetpointIconOrigin = new google.maps.MarkerImage(
		"http://maps.google.com/mapfiles/kml/shapes/ranger_station.png",
		null, /* size is determined at runtime */
		null, /* origin is 0,0 */
		null, /* anchor is bottom center of the scaled image */
		new google.maps.Size(35, 35)
	)

	this.setMap = function (init, whenPosition, setMeetpoints, setClosest){

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
				},
				setClosest: function (meetpointId, meetpoints, returnMarkers) {
					var map = this.getGMap()

					meetpoints.forEach(function (meetpoint, index, meetpoints) {
						if (meetpoint.id == meetpointId) {
							meetpoint.options.icon = meetpointIconOrigin
						}
					})

				}
			},
            options:{
                disableDefaultUI: true
            }
		})

		$http.get(config.apiUrl+'/meetpoints')
		.then(function (res) {
			if (res.data.success) {
				setMeetpoints(res.data.meetpoints)
			}
			else
				console.log("Error")			
		})

		navigator.geolocation.getCurrentPosition(function (position) {

			$http.get(config.apiUrl+'/meetpoints?filter=map&lat='+position.coords.latitude+'&lng='+position.coords.longitude)
			.then(function (res) {
				if (res.data.success) {
					setClosest(res.data.map.closest._id, {lat: position.coords.latitude, lng: position.coords.longitude})
				}
				else
					console.log("Error")			
			})


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
					/*
					dragend: function (marker, eventName, args) {
						var lat = marker.getPosition().lat()
						var lng = marker.getPosition().lng()

						findMeetpoints(lat, lng, function (meetpoints) {
							setMeetpoints(meetpoints)
						})
					}
					*/
				}
			})
		})
	}

	this.createMeetpointsMarkers = function (meetpoints, callback) {

		var markers = [] 

		meetpoints.forEach(function (meetpoint, index, meetpoints) {
			markers.push({
				id: meetpoint._id,
				coords: {
					latitude: meetpoint.coordinates.lat,
					longitude: meetpoint.coordinates.lng
				},
				options:{
					title: meetpoint._id,
					icon: meetpointIcon
				},
				events: {
					click: function (marker, eventName, args) {
						console.log('click en: '+ marker.getTitle())
					}
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