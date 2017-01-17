'use strict';

angular.module('myApp.business', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/business', {
    templateUrl: 'business/business.html',
    controller: 'BusinessCtrl',
  });
}])

.controller('BusinessCtrl', ['$http', function($http) {
	var self=this;
	self.source = 'bloomberg';
	self.currentSource = 'Bloomberg';
    self.select = '#!/business';
    self.currentPage = function(href){
        alert(href);
        window.location.href=href;
    } 

	self.sources = [
        {source: 'bloomberg',name:'Bloomberg'},
        {source: 'business-insider',name:'Business Insider'},
        {source: 'cnbc',name:'CNBC'}, 
        {source: 'financial-times',name:'Financial Times'}, 
        {source: 'fortune', name:'Fortune' },
        {source: 'the-economist', name:'The Economist' },
        {source: 'the-wall-street-journal', name:'Wall Street Journal' },
      ];

    self.initial = self.sources[0].source;

    self.check = 'Bloomberg';
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
