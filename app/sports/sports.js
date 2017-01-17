'use strict';

angular.module('myApp.sports', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/sports', {
    templateUrl: 'sports/sports.html',
    controller: 'SportsCtrl',
  });
}])

.controller('SportsCtrl', ['$http', function($http) {
	var self=this;
	self.source = 'espn';
	self.currentSource = 'ESPN';
    self.select = '#!/sports';
    self.currentPage = function(href){
        alert(href);
        window.location.href=href;
    } 

	self.sources = [
        {source: 'espn',name:'ESPN'},
        {source: 'fox-sports',name:'Fox Sports'},
        {source: 'bbc-sport',name:'BBC Sport'}, 
        {source: 'nfl-news',name:'NFL News'}, 
        {source: 'sky-sports-news', name:'Sky Sports News' },
      ];

    self.initial = self.sources[0].source;

    self.check = 'ESPN';
	self.addClass = function(link){
		self.check=link;
	};

    self.changeSource = function(source,name){
    	$http.get('https://newsapi.org/v1/articles?source='+source+'&apiKey=22480be10ea14a548027c1172f4beee6').then(function(response) {
    		self.headlines = response.data.articles;
    		angular.forEach(self.sources, function(value, key) {
    			if(source === value.source){
    				self.currentSource = value.name;
    			}
			});
			self.addClass(name);
		});
    }

	$http.get('https://newsapi.org/v1/articles?source='+self.sources[0].source+'&apiKey=22480be10ea14a548027c1172f4beee6').then(function(response) {
    	self.headlines = response.data.articles;
	});

	
}]);
