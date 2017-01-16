'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.general',
  'myApp.view2',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/general'});
}]).controller('MainCtrl', [function(){
	var self = this;
	self.check = 'home';
	self.addClass = function(link){
		self.check=link;
	};
}])
