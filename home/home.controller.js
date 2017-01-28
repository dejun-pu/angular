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
            "description":"This is a sample description to the message which has the above title"
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

		$scope.say=function(u){
		  json.recipient=vm.user.username;	 
		  json.sender=u.user.username;
		  json.title=$scope.title;
		  json.description=$scope.description;
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