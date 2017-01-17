'use strict';

angular.module('myApp.science', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/science', {
    templateUrl: 'science/science.html',
    controller: 'ScienceCtrl',
  });
}])

.controller('ScienceCtrl', ['$http', function($http) {
	var self=this;
	self.source = 'new-scientist';
	self.currentSource = 'New Scientist';

	self.sources = [
        {source: 'new-scientist',name:'New Scientist'},
        {source: 'national-geographic',name:'National Geographic'},
        {source: 'ars-technica',name:'Ars Technica'}, 
        {source: 'engadget',name:'Engadget'}, 
        {source: 'recode', name:'Recode' },
        {source: 'techcrunch', name:'TechCrunch'}, 
        {source: 'techradar',name:'Tech Radar' },
        {source: 'the-next-web',name:'The Next Web'},
        {source: 'the-verge', name:'The Verge'}
      ];

    self.initial = self.sources[0].source;

    self.check = 'New Scientist';
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
