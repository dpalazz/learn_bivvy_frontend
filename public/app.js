const app = angular.module('LearnBivvyApp', []);

app.controller('MainController', ['$http', function($http){
  this.url = 'http://localhost:3000'

  $http({
    method: 'GET',
    url: this.url + '/services'
  }).then(response => {
    console.log('response', response);
  }).catch(reject => {console.log('reject', reject)
  });

}]);
