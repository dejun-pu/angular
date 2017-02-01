(function () {
    'use strict';
   
    angular
        .module('app')
        .controller('HomeController', HomeController);
        var list=[];
		var json={
		    "recipient":"Arun",
            "sender":"Nanda",
            "title":"This is a sample message to Arun.",
            "description":"This is a sample description to the message which has the above title",
			"date":""
		}
		
    HomeController.$inject = ['UserService', '$rootScope','$scope'];
    function HomeController(UserService, $rootScope,$scope) {
        var vm = this;
        vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;
        initController();

        function initController() {
            loadCurrentUser();
            loadAllUsers();
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
					
                    vm.user = user;
                });
        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }

        function deleteUser(id) {
            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }
        $scope.update=function(){	
		UserService.Delete($scope.username);
		UserService.Create(vm.user);
		}
		$scope.getName=function(obj){
		$scope.username=obj.username;
		alert($scope.username);
		}
		$scope.del=function(u){
		   UserService.Delete(u.user.username);
		  location.reload();
		   alert("successful deletion!!");
		}
		$scope.say=function(u){
			alert("Successfully sent message!!");
		  json.recipient=vm.user.username;	 
		  json.sender=u.user.username;
		  json.title=$scope.title;
		  json.description=$scope.description;
		  json.date=new Date();
		  list.push(json);
		 
	       if(localStorage.getItem("chat")===null){
		  localStorage.setItem("chat",JSON.stringify(list));
		  }
		  else{
		  var l=JSON.parse(localStorage.getItem("chat"));
		  l.push(json);
		  localStorage.setItem("chat",JSON.stringify(l));
		}
		}
	}

})();