angular.module('packmvp.meetpointService', [])

.service('meetpointService', [
function () {
	
	this.setMap = function (init, whenPosition){

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
				/*events: {
				dragend: function (marker, eventName, args) {
				$log.log('marker dragend');
				var lat = marker.getPosition().lat();
				var lon = marker.getPosition().lng();
				$log.log(lat);
				$log.log(lon);

				$scope.marker.options = {
				draggable: true,
				labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
				labelAnchor: "100 0",
				labelClass: "marker-labels"
				};
				}
				}
				*/
			})
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