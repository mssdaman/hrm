angular.module('MainCtrl', []).controller('MainController', function($scope,$http,$location) {
	$scope.employees={};
	$scope.employee=0;
	$scope.emp={};
	$scope.tagline = 'To the moon and back!';	
    $http.get('/api/').success(function(data){
    	$scope.employees=data;
		});
	$http.get('/api/list').success(function(data){
    	$scope.emp=data;
    	
    });

	$scope.toggle=function(){
		//	console.log ($scope.employee);
		if($scope.employee.employee_id>0){
			//alert($scope.employee);
			$http({
			        method: 'POST',
			        url: '/api/initiatejoining/',
			        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			        transformRequest: function(obj) {
			            var str = [];
			            for(var p in obj)
			            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			            return str.join("&");
			        },
			        data: {employee_id:$scope.employee.employee_id,employee_name:$scope.employee.employee_name}
			    }).success(function(data){			    	
					console.log(data);
			
					//console.log(data.id);
			    	if($scope.employee){
			    		$location.url('documentation/'+$scope.employee.employee_id);
			    	}
			    	else{
			    		alert('there is some issue in your code!!!!');
			    	}
					
				});
			}
			else{
				alert('Please select the employee!!!');

			}

	
	};

});