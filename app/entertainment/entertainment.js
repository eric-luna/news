'use strict';

angular.module('myApp.entertainment', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/entertainment', {
    templateUrl: 'entertainment/entertainment.html',
    controller: 'EntertainmentCtrl',
  });
}])

.controller('EntertainmentCtrl', ['$http', function($http) {
	var self=this;
	self.source = 'buzzfeed';
	self.currentSource = 'Buzzfeed';
    self.select = '#!/entertainment';
    self.currentPage = function(href){
        window.location.href=href;
    } 

	self.sources = [
        {source: 'buzzfeed',name:'Buzzfeed'},
        {source: 'daily-mail',name:'Daily Mail'},
        {source: 'entertainment-weekly',name:'Entertainment Weekly'},
        {source: 'mtv-news',name:'MTV News'}, 
        {source: 'mashable',name:'Mashable'}, 
        {source: 'ign', name:'IGN' },
        {source: 'polygon', name:'Polygon'}
      ];

    self.initial = self.sources[0].source;

    self.check = 'Buzzfeed';
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
