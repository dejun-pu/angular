(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService','$rootScope'];
    function LoginController($location, AuthenticationService, FlashService,$rootScope) {
        var vm = this;
        vm.login = login;
        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(vm.username, vm.password);
					$rootScope.uname=vm.username;
					$rootScope.pword=vm.password;
                    $location.path('/');
                } else {
					alert("failed login");
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        };
    }
})();
