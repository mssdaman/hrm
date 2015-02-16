angular.module('NerdCtrl', []).controller('NerdController', function($scope,$routeParams,$http) {
	var id=$routeParams.employeeid;	
	$scope.pending_section='hr-documentation-rbd-network';
	$scope.employee_name='';
	$scope.employee_id=id;
	  $http.get('/api/employee/'+id).success(function(data){
    	$scope.employees=data;
    	$scope.employee_name=data.employee_name;
    	$scope.hr=JSON.parse(data.hr);
    	$scope.doc=JSON.parse(data.hr_document);
    	$scope.rbd=JSON.parse(data.rbd);
    	$scope.net=JSON.parse(data.network);
    	
    	});
	  	$http.get('/api/list').success(function(data){
    	$scope.emp=data;
    	
    });
	
	$scope.save= function() {
			var hrstatus=0;
			angular.forEach($scope.hr, function(hr) {
			      if(hr==0){
						hrstatus=1;
						}

				  });
	  if(hrstatus==1)
	  {
	 		 $scope.pending_section='Hr';$scope.status=0;
	  }
	  else
	  {
	  		$scope.pending_section='';
	  }
	  var docstatus=0;
			angular.forEach($scope.doc, function(doc) {
		      if(doc==0){docstatus=1;}
	  		});
	  if(docstatus==1)
	  {
	  $scope.pending_section=$scope.pending_section+'-Doc';$scope.status=0;
	  }
	  else
	  {
	  	$scope.pending_section=$scope.pending_section;
	  }		
	 var rbdstatus=0;
			angular.forEach($scope.rbd, function(rbd) {
		      if(rbd==0){rbdstatus=1;}
	  		});
	  if(rbdstatus==1)
	  {
	  $scope.pending_section=$scope.pending_section+'-Rbd';$scope.status=0;
	  }
	  else
	  {
	  	$scope.pending_section=$scope.pending_section;
	  }		
	 var netstatus=0;
			angular.forEach($scope.net, function(net) {
		      if(net==0){netstatus=1;}
	  		});
	  if(netstatus==1)
	  {
	  $scope.pending_section=$scope.pending_section+'-Net';$scope.status=0;
	  }
	  else
	  {
	  	$scope.pending_section=$scope.pending_section;
	  }		
	 
		  
if($scope.status==0)$scope.status='Pending';
else $scope.status='Completed';
//alert($scope.hr.reponsibleperson);
			//Go to server to update the values
			$http({
			        method: 'POST',
			        url: '/api/update/',
			        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			        transformRequest: function(obj) {
			            var str = [];
			            for(var p in obj)
			            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			            return str.join("&");
			        },
			        data: {employee_id:$routeParams.employeeid,status:$scope.status,pending_section:$scope.pending_section,employee_name:$scope.employee_name,hr:JSON.stringify($scope.hr),documentation:JSON.stringify($scope.doc),rbd:JSON.stringify($scope.rbd),network:JSON.stringify($scope.net)}
			    }).success(function (data) {

			   //  console.log(data);
			     alert("data saved successfully");


			    });


			};
	

			
});

