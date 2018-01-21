const app = angular.module('LearnBivvyApp', ['ngRoute']);

// =====================================
// Controllers
// ======================================
app.controller('PageOneController', ['$http', function($http){
  this.test = 'sewer';
  this.url = 'http://localhost:3000'

  $http({
    method: 'GET',
    url: this.url + '/lessons'
  }).then(response => {
    console.log(response.data);
    this.lessons = response.data
  }).catch(reject => {
    console.log('Catch: ', reject);
  });

}]);

app.controller('PageTwoController', function(){
  this.test = 'test';
});

app.controller('PageThreeController', function(){
  this.test = 'test';
});

app.controller('PageFourController', function(){
  this.test = 'test';
});

app.controller('PageFiveController', function(){
  this.test = 'test';
});

app.controller('PageSixController', function(){
  this.test = 'test';
});

app.controller('PageSevenController', function(){
  this.test = 'test';
});

app.controller('PageEightController', function(){
  this.test = 'test';
});

app.controller('PageNineController', function(){
  this.test = 'test';
});

app.controller('PageTenController', function(){
  this.test = 'test';
});

// =====================================
// Config
// =====================================
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
  $locationProvider.html5Mode({enabled: true});

  $routeProvider.when('/pageone', {
    templateUrl: 'pageone.html',
    controller: 'PageOneController',
    controllerAs: 'ctrl'
  });

  $routeProvider.when('/pagetwo', {
    templateUrl: 'pagetwo.html',
    controller: 'PageTwoController',
    controllerAs: 'ctrl'
  });

  $routeProvider.when('/pagethree', {
    templateUrl: 'pagethree.html',
    controller: 'PageThreeController',
    controllerAs: 'ctrl'
  });

  $routeProvider.when('/pagefour', {
    templateUrl: 'pagefour.html',
    controller: 'PageFourController',
    controllerAs: 'ctrl'
  });

  $routeProvider.when('/pagefive', {
    templateUrl: 'pagefive.html',
    controller: 'PageFiveController',
    controllerAs: 'ctrl'
  });

  $routeProvider.when('/pagesix', {
    templateUrl: 'pagesix.html',
    controller: 'PageSixController',
    controllerAs: 'ctrl'
  });

  $routeProvider.when('/pageseven', {
    templateUrl: 'pageseven.html',
    controller: 'PageSevenController',
    controllerAs: 'ctrl'
  });

  $routeProvider.when('/pageeight', {
    templateUrl: 'pageeight.html',
    controller: 'PageEightController',
    controllerAs: 'ctrl'
  });

  $routeProvider.when('/pagenine', {
    templateUrl: 'pagenine.html',
    controller: 'PageNineController',
    controllerAs: 'ctrl'
  });

  $routeProvider.when('/pageten', {
    templateUrl: 'pageten.html',
    controller: 'PageTenController',
    controllerAs: 'ctrl'
  });
}]);
