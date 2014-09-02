'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('LandingPageController', [function() {

  }])
  .controller('WaitlistController', ['$scope', 'partyService', 'textMessageService', 'authService', function($scope, partyService, textMessageService, authService) {

  	// Bind users parties to $scope.parties.
  	authService.getCurrentUser().then(function(user) {
  		if(user) {
  			$scope.parties = partyService.getPartiesByUserId(user.id);
  		};
  	});

  	// Object to store data from the waitlist form.
  	$scope.newParty = {name: '', phone: '', size: '', done: false, notified: 'No'};

  	// Function to save a new party to the waitlist.
  	$scope.saveParty = function() {
  		partyService.saveParty($scope.newParty, $scope.currentUser.id);
  		// Reset the newParty variable
	  	$scope.newParty = {name: '', phone: '', size: '', done: false, notified: 'No'};
  	};

  	// Funtino to send text message to a party.
  	$scope.sendTextMessage = function(party) {
  		textMessageService.sendTextMessage(party, $scope.currentUser.id);
  	};
  }])
	.controller('AuthController', ['$scope', 'authService', function($scope, authService) {

		// Objcet bond to inputs on the register and login pages.
		$scope.user = {email: '', password: ''};

		$scope.register = function() {
			authService.register($scope.user);
		};

		$scope.login = function() {
			authService.login($scope.user);
		};
		$scope.logout = function() {
			authService.logout();
		};

	}]);