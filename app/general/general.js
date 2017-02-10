'use strict';

angular.module('myApp.general', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/general', {
    templateUrl: 'general/general.html',
    controller: 'GeneralCtrl',
  });
}])

.controller('GeneralCtrl', ['$http', function($http) {
	var self=this;
	self.source = 'google-news';
	self.currentSource = 'Google News';
    self.select = '#!/general';
    self.currentPage = function(href){
        window.location.href=href;
    } 

	self.sources = [
        {source: 'google-news',name:'Google News'},
        {source: 'associated-press',name:'Associated Press'},
        {source: 'bbc-news',name:'BBC News'}, 
        {source: 'cnn',name:'CNN'}, 
        {source: 'independent', name:'Independent' },
        {source: 'newsweek', name:'Newsweek'}, 
        {source: 'new-york-magazine',name:'New York Magazine' },
        {source: 'reuters',name:'Reuters'},
        {source: 'the-guardian-uk', name:'The Guardian'},
        {source: 'reddit-r-all',name:'Reddit r/all'},
        {source: 'the-huffington-post',name:'The Huffington Post'},
        {source: 'the-new-york-times',name:'The New York Times'},
        {source: 'the-washington-post',name:'The Washington Post'},
        {source: 'time',name:'Time'},
        {source: 'usa-today',name:'USA Today'}
      ];

    self.initial = self.sources[0].source;

    self.check = 'Google News';
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
